import type { GetStaticProps, NextPage } from 'next';

import { api } from '@lib/axios';

import { Header } from '@components/Header';
import { ClassSchedule } from '@components/ClassSchedule';

import styles from '@styles/pages/ClassesPage.module.scss';

interface IClassSchedule {
  startTime: string;
  classSubjectName: string;
}

type ClassesPageProps = {
  data: {
    label: string,
    classesSchedules: IClassSchedule[],
  }
};

const ClassesPage: NextPage<ClassesPageProps> = ({ data }: ClassesPageProps) => {
  return (
    <div className={styles.container}>
      <Header
        title="Aulas de hoje"
        description="Listagem das aulas do dia e seu horário de início"
      />

      <main>
        <h3>{ data.label }</h3>
        { data.classesSchedules.map((classSchedule, i) => (
          <ClassSchedule
            key={`class-${i}`}
            startTime={classSchedule.startTime}
            classSubjectName={classSchedule.classSubjectName}
          />
        )) }
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('/horaries?type=today');

  return {
    props: {
      data,
    }
  }
}

export default ClassesPage;