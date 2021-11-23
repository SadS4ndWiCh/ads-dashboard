import { notion, databaseId } from '@services/notion';

import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/pt-br'

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.tz.setDefault('America/Sao_Paulo');

export const day = dayjs;

const allHoraries = [
  {
    weekday: 1,
    label: 'Segunda',
    classesSchedules: [
      { startTime: '7:40', classSubjectName: 'Sem aula' },
      { startTime: '9:30', classSubjectName: 'Inglês' },
      { startTime: '11:10', classSubjectName: 'Arquitetura e Organização de Computadores' },
    ]
  },
  {
    weekday: 2,
    label: 'Terça',
    classesSchedules: [
      { startTime: '7:40', classSubjectName: 'Programação em Microinformática' },
      { startTime: '9:30', classSubjectName: 'Algoritmos e Lógica de Programação' },
      { startTime: '11:10', classSubjectName: 'Algoritmos e Lógica de Programação' },
    ],
  },
  {
    weekday: 3,
    label: 'Quarta',
    classesSchedules: [
      { startTime: '7:40', classSubjectName: 'Programação em Microinformática' },
      { startTime: '9:30', classSubjectName: 'Matemática Discreta' },
      { startTime: '11:10', classSubjectName: 'Sem aula' },
    ],
  },
  {
    weekday: 4,
    label: 'Quinta',
    classesSchedules: [
      { startTime: '7:40', classSubjectName: 'Administração Geral' },
      { startTime: '9:30', classSubjectName: 'Arquitetura e Organização de Computadores' },
      { startTime: '11:10', classSubjectName: 'Sem aula' },
    ],
  },
  {
    weekday: 5,
    label: 'Sexta',
    classesSchedules: [
      { startTime: '7:40', classSubjectName: 'Administração Geral' },
      { startTime: '9:30', classSubjectName: 'Laboratório de Hardware' },
      { startTime: '11:10', classSubjectName: 'Matemática Discreta' },
    ],
  },
];

export function getHoraries(horaryType: 'all' | 'today') {
  const todayWeekday = dayjs().tz('America/Sao_Paulo').day();
  
  if (horaryType === 'all') return allHoraries

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
    const finishDate = dayjs(activity.properties.Date.date.end).tz('America/Sao_Paulo');
    const now = dayjs().tz('America/Sao_Paulo');
  
    const isFinished = finishDate < now;
  
    if (finishDate < now.subtract(1, 'week')) return [];

    const activityObj = {
      // @ts-ignore
      name: activity.properties.Name.title[0].plain_text,
      // @ts-ignore
      description: activity.properties.Description.rich_text[0].plain_text,
      // @ts-ignore
      tags: activity.properties.Tags.multi_select.filter(tag => tag.name !== 'activity'),
      finishDate: finishDate.format('DD/MM HH:mm'),
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
    const examDate = dayjs(exam.properties.Date.date.start).tz('America/Sao_Paulo');
    const now = dayjs().tz('America/Sao_Paulo');

    const isDone = examDate < now;

    if (examDate < now.subtract(2, 'months')) return [];

    const examObj = {
      // @ts-ignore
      name: exam.properties.Name.title[0].plain_text,
      date: examDate.format('DD/MM'),
      // @ts-ignore
      tags: exam.properties.Tags.multi_select.filter(tag => tag.name !== 'exam'),
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
  
  const notices = data.results.flatMap(notice => {
      // @ts-ignore
    const noticeEndDate = dayjs(notice.properties.Date.date.end).tz('America/Sao_Paulo');
    if (noticeEndDate < dayjs().tz('America/Sao_Paulo')) return []

    const noticeObj = {
      // @ts-ignore
      title: notice.properties.Name.title[0].plain_text,
      // @ts-ignore
      description: notice.properties.Description.rich_text[0].plain_text,
    }

    return [noticeObj];
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

  const reminders = data.results.flatMap(reminder => {
    // @ts-ignore
    const reminderEndDate = dayjs(reminder.properties.Date.date.end).tz('America/Sao_Paulo');
    if (reminderEndDate < dayjs().tz('America/Sao_Paulo')) return []
    
    const reminderObj = {
      // @ts-ignore
      title: reminder.properties.Name.title[0].plain_text,
      // @ts-ignore
      description: reminder.properties.Description.rich_text[0].plain_text,
    };

    return [reminderObj];
  });

  return reminders;
}