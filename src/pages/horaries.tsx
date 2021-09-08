import type { GetStaticProps, NextPage } from 'next';

import { api } from '@lib/axios';

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
  const { data: horaries } = await api.get('/horaries?type=all');

  return {
    props: {
      horaries
    }
  }
}

export default HorariesPage;