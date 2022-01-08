import type { GetStaticProps, NextPage } from 'next';

import * as AdsApi from '@lib/ads';

import { Layout } from '@components/Layout';
import { ClassSchedule } from '@components/ClassSchedule';

import styles from '@styles/pages/HorariesPage.module.scss';

interface IClassSchedule {
  startTime: string;
  classSubjectName: string;
}

interface IHorary {
  id: number;
  label: string;
  weekday: number;
  classesSchedules: IClassSchedule[];
}

type HorariesPageProps = {
  horaries: IHorary[];
};

const HorariesPage: NextPage<HorariesPageProps> = ({ horaries }) => {
  const currentWeekday = AdsApi.day().tz('America/Sao_Paulo').day();

  return (
    <Layout
      title='Horários'
      description='Listagem do cronograma completo da semana'
      className={styles.container}
    >
      { horaries.map((horary, i) => (
        <section
          key={`horary-${i}`}
          className={styles.weekday}
        >
          <h3>{ horary.label } { horary.weekday === currentWeekday && (
            <span className={styles.isToday}>• Hoje</span>
          ) }</h3>

          <ul>
            { horary.classesSchedules.map((classSchedule, i) => (
              <li
                key={`class-${i}`}
                className={styles.weekdaySchedule}
              >
                <ClassSchedule
                  startTime={classSchedule.startTime}
                  classSubjectName={classSchedule.classSubjectName}
                />
              </li>
            )) }
          </ul>
        </section>
      )) }
    </Layout>
  )
};

export const getStaticProps: GetStaticProps = async () => {
  const horaries = AdsApi.getHoraries('all');

  return {
    props: {
      horaries,
    }
  }
}

export default HorariesPage;