import { notion, databaseId } from '@services/notion';

import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(timezone);
dayjs.tz.setDefault('America/Sao_Paulo');

export const day = dayjs;

const allHoraries = [
  {
    label: 'Segunda',
    classesSchedules: [
      { startTime: '7:40', classSubjectName: 'Sem aula' },
      { startTime: '9:30', classSubjectName: 'Inglês' },
      { startTime: '11:10', classSubjectName: 'Arquitetura e Organização de Computadores' },
    ]
  },
  {
    label: 'Terça',
    classesSchedules: [
      { startTime: '7:40', classSubjectName: 'Programação em Microinformática' },
      { startTime: '9:30', classSubjectName: 'Algoritmos e Lógica de Programação' },
      { startTime: '11:10', classSubjectName: 'Algoritmos e Lógica de Programação' },
    ],
  },
  {
    label: 'Quarta',
    classesSchedules: [
      { startTime: '7:40', classSubjectName: 'Programação em Microinformática' },
      { startTime: '9:30', classSubjectName: 'Matemática Discreta' },
      { startTime: '11:10', classSubjectName: 'Sem aula' },
    ],
  },
  {
    label: 'Quinta',
    classesSchedules: [
      { startTime: '7:40', classSubjectName: 'Administração Geral' },
      { startTime: '9:30', classSubjectName: 'Arquitetura e Organização de Computadores' },
      { startTime: '11:10', classSubjectName: 'Sem aula' },
    ],
  },
  {
    label: 'Sexta',
    classesSchedules: [
      { startTime: '7:40', classSubjectName: 'Administração Geral' },
      { startTime: '9:30', classSubjectName: 'Laboratório de Hardware' },
      { startTime: '11:10', classSubjectName: 'Matemática Discreta' },
    ],
  },
];

export function getHoraries(horaryType: 'all' | 'today') {
  if (horaryType === 'all') return allHoraries;

  const todayWeekday = dayjs().day();

  if (todayWeekday === 0 || todayWeekday === 6) return [];

  return allHoraries[todayWeekday-1];
}

export async function getActivities() {
  const data = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Tags',
      multi_select: {
        contains: 'activity'
      }
    },
  });

  const activities = data.results.flatMap(activity => {
    // @ts-ignore
    const finishDate = dayjs(activity.properties['Finish Date'].date.start);
    const now = dayjs();
  
    const isFinished = finishDate < now;
  
    if (finishDate < now.subtract(1, 'week')) return [];

    const activityObj = {
      // @ts-ignore
      importanceLevel: activity.properties['Importance Level'].multi_select[0].name,
      // @ts-ignore
      activityName: activity.properties.Name.title[0].plain_text,
      // @ts-ignore
      activityDescription: activity.properties.Description.rich_text[0].plain_text,
      // @ts-ignore
      activityTags: activity.properties.Tags.multi_select.filter(tag => tag.name !== 'activity'),
      finishDate: finishDate.format('DD/MM'),
      isFinished,
    };

    return [activityObj];
  }).sort((a, b) => {
    return (a.isFinished === b.isFinished) ? 0 : a.isFinished ? 1 : -1;
  });

  return activities;
}

export async function getExams() {
  const data = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Tags',
      multi_select: {
        contains: 'exam'
      },
    },
  });

  const exams = data.results.flatMap(exam => {
    // @ts-ignore
    const examDate = dayjs(exam.properties.Date.date.start);
    const now = dayjs();

    const isDone = examDate < now;

    if (examDate < now.subtract(1, 'week')) return [];

    const examObj = {
      // @ts-ignore
      examName: exam.properties.Name.title[0].plain_text,
      examDate: examDate.format('DD/MM'),
      // @ts-ignore
      examTags: exam.properties.Tags.multi_select.filter(tag => tag.name !== 'exam'),
      isDone,
    };
    
    return [examObj];
  }).sort((a, b) => {
    return (a.isDone === b.isDone) ? 0 : a.isDone ? 1 : -1;
  });

  return exams;
}

export async function getNotices() {
  const data = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Tags',
      multi_select: {
        contains: 'notice'
      }
    }
  });
  
  const notices = data.results.map(notice => {
    const noticeObj = {
      // @ts-ignore
      noticeTitle: notice.properties.Name.title[0].plain_text,
      // @ts-ignore
      noticeDescription: notice.properties.Description.rich_text[0].plain_text,
    }

    return noticeObj;
  });

  return notices;
}

export async function getReminders() {
  const data = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Tags',
      multi_select: {
        contains: 'reminder'
      }
    }
  });

  const reminders = data.results.map(reminder => {
    const reminderObj = {
      // @ts-ignore
      reminderTitle: reminder.properties.Name.title[0].plain_text,
      // @ts-ignore
      reminderDescription: reminder.properties.Description.rich_text[0].plain_text,
    };

    return reminderObj;
  });

  return reminders;
}