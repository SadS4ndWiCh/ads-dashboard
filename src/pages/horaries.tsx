import type { GetStaticProps, NextPage } from 'next';

import { Header } from '@components/Header';
import { ClassSchedule } from '@components/ClassSchedule';

import styles from '@styles/pages/HorariesPage.module.scss';

interface IClassSchedule {
  startTime: string;
  classSubjectName: string;
}

interface IHorary {
  id: number;
  label: string;
  classesSchedules: IClassSchedule[];
}

type HorariesPageProps = {
  horaries: IHorary[];
};

const HorariesPage: NextPage<HorariesPageProps> = ({ horaries }) => {
  return (
    <div className={styles.container}>
      <Header
        title="Horários"
        description="Listagem do cronograma completo da semana"
      />

      { horaries.map((horary, i) => (
        <div key={`horary-${i}`}>
          <h3>{ horary.label }</h3>
          { horary.classesSchedules.map((classSchedule, i) => (
            <ClassSchedule
              key={`class-${i}`}
              startTime={classSchedule.startTime}
              classSubjectName={classSchedule.classSubjectName}
            />
          )) }
        </div>
      )) }
    </div>
  )
};

export const getStaticProps: GetStaticProps = async () => {
  const horaries: IHorary[] = [
    {
      id: 0,
      label: 'Segunda',
      classesSchedules: [
        { startTime: '7:40', classSubjectName: 'Sem aula' },
        { startTime: '9:30', classSubjectName: 'Inglês' },
        { startTime: '11:10', classSubjectName: 'Arquitetura e Organização de Computadores' },
      ]
    },
    {
      id: 1,
      label: 'Terça',
      classesSchedules: [
        { startTime: '7:40', classSubjectName: 'Sem aula' },
        { startTime: '9:30', classSubjectName: 'Inglês' },
        { startTime: '11:10', classSubjectName: 'Arquitetura e Organização de Computadores' },
      ],
    },
    {
      id: 2,
      label: 'Quarta',
      classesSchedules: [
        { startTime: '7:40', classSubjectName: 'Sem aula' },
        { startTime: '9:30', classSubjectName: 'Inglês' },
        { startTime: '11:10', classSubjectName: 'Arquitetura e Organização de Computadores' },
      ],
    },
    {
      id: 3,
      label: 'Quinta',
      classesSchedules: [
        { startTime: '7:40', classSubjectName: 'Sem aula' },
        { startTime: '9:30', classSubjectName: 'Inglês' },
        { startTime: '11:10', classSubjectName: 'Arquitetura e Organização de Computadores' },
      ],
    },
    {
      id: 4,
      label: 'Sexta',
      classesSchedules: [
        { startTime: '7:40', classSubjectName: 'Sem aula' },
        { startTime: '9:30', classSubjectName: 'Inglês' },
        { startTime: '11:10', classSubjectName: 'Arquitetura e Organização de Computadores' },
      ],
    },
  ];

  return {
    props: {
      horaries
    }
  }
}

export default HorariesPage;