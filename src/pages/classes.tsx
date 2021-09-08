import type { GetStaticProps, NextPage } from 'next';

import { Header } from '@components/Header';
import { ClassSchedule } from '@components/ClassSchedule';

import styles from '@styles/pages/ClassesPage.module.scss';

interface IClassSchedule {
  startTime: string;
  classSubjectName: string;
}

type ClassesPageProps = {
  classesSchedules: IClassSchedule[],
};

const ClassesPage: NextPage<ClassesPageProps> = ({ classesSchedules }: ClassesPageProps) => {
  return (
    <div className={styles.container}>
      <Header
        title="Aulas de hoje"
        description="Listagem das aulas do dia e seu horário de início"
      />

      <main>
        { classesSchedules.map((classSchedule, i) => (
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
  const classesSchedules: IClassSchedule[] = [
    { startTime: '7:40', classSubjectName: 'Sem aula' },
    { startTime: '9:30', classSubjectName: 'Inglês' },
    { startTime: '11:10', classSubjectName: 'Arquitetura e Organização de Computadores' },
  ];
  
  return {
    props: {
      classesSchedules
    }
  }
}

export default ClassesPage;