import { useEffect, useRef, useState } from 'react';

import type { GetStaticProps, NextPage } from 'next';

import { useDebounce } from '@hooks/useDebounce';

import { Header } from '@components/Header';
import { SearchInput } from '@components/SearchInput';
import { Exam } from '@components/Exam';

import styles from '@styles/pages/ExamsPage.module.scss';

interface IExam {
  examType: 'p1' | 'p2' | 'p3',
  examName: string,
  examDate: string,
}

type ExamsPageProps = {
  exams: IExam[],
};

const ExamsPage: NextPage<ExamsPageProps> = ({ exams }) => {
  const allExams = useRef<IExam[]>(exams);
  const [examsToShow, setExamsToShow] = useState<IExam[]>(exams);
  const [searchValue, setSearchValue]= useState('');

  const debouncedValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (!searchValue || searchValue.trim() === '') {
      setExamsToShow(allExams.current)

      return;
    }

    if (debouncedValue) {
      const filteredExams = allExams.current.filter(
        exam => Object.values(exam).find(
          value => value.toLowerCase().includes(searchValue.toLowerCase())
        )
      )
      console.log(filteredExams);
  
      setExamsToShow(filteredExams);
    }

  }, [debouncedValue]);

  return (
    <div className={styles.container}>
      <Header
        title="Provas"
        description="Listagem das provas e da data de realização"
      />

      <SearchInput
        placeholder="Pesquisar provas"
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <main>
        { examsToShow.map((exam, i) => (
          <Exam
            key={`exam-${i}`}
            examType={exam.examType}
            examName={exam.examName}
            examDate={exam.examDate}
          />
        )) }
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const exams: IExam[] = [
    {
      examType: 'p1',
      examName: 'Algorítimos e Lógica de Programação',
      examDate: '22/09'
    },
    {
      examType: 'p1',
      examName: 'Matemática Discreta',
      examDate: '23/09'
    },
  ]
  
  return {
    props: {
      exams
    }
  }
}

export default ExamsPage;