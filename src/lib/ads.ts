import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(timezone);
dayjs.tz.setDefault('America/Sao_Paulo');

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
