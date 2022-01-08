import { useEffect, useRef, useState } from 'react';
import type { GetStaticProps, NextPage } from 'next';

import * as AdsApi from '@lib/ads';

import { Header } from '@components/Header';
import { Link } from '@components/Link';
import { ClassSchedule } from '@components/ClassSchedule';

import styles from '@styles/pages/ClassesPage.module.scss';

interface IClassSchedule {
  startTime: string;
  classSubjectName: string;
}

interface IHorary {
  id: number;
  label: string;
  classesSchedules: IClassSchedule[];
}

type ClassesPageProps = {
  horaries: IHorary[];
};

const ClassesPage: NextPage<ClassesPageProps> = ({ horaries }) => {
  const allHoraries = useRef<IHorary[]>(horaries);
  const [todayClasses, setTodayClasses] = useState<IHorary | null>(null);

  useEffect(() => {
    const weekday = AdsApi.day().day();
    if (weekday === 0 || weekday === 6) {
      setTodayClasses({
        id: 0,
        label: weekday === 0 ? 'Domingo' : 'Sábado',
        classesSchedules: [],
      })
      return
    }

    setTodayClasses(allHoraries.current[weekday - 1]);

  }, []);

  return (
    <div className={styles.container}>
      <Header
        title="Aulas de hoje"
        description="Listagem das aulas do dia e seu horário de início"
        backTo="/"
      />

      <main>
        <h3>{ todayClasses && todayClasses.label }</h3>
        { todayClasses && !todayClasses.classesSchedules.length && (
          <p>Não tem aula</p>
        ) }
        { todayClasses && todayClasses.classesSchedules.map((classSchedule, i) => (
          <ClassSchedule
            key={`class-${i}`}
            startTime={classSchedule.startTime}
            classSubjectName={classSchedule.classSubjectName}
          />
        )) }

        <Link
          href='/horarios'
          className={styles.seeAllHoraries}
        >Ver todos horários</Link>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const horaries = AdsApi.getHoraries('all');

  return {
    props: {
      horaries,
    }
  }
}

export default ClassesPage;