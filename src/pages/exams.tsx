import { useEffect, useRef, useState } from 'react';

import type { GetStaticProps, NextPage } from 'next';

import { getExams } from '@lib/ads';

import { useDebounce } from '@hooks/useDebounce';

import { Header } from '@components/Header';
import { SearchInput } from '@components/SearchInput';
import { Exam } from '@components/Exam';

import styles from '@styles/pages/ExamsPage.module.scss';

interface IExamTag {
  id: string;
  name: string;
  color: string;
}

interface IExam {
  examTags: IExamTag[],
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

  function filter(arr: any[], condition: CallableFunction): any[] {
    return arr.filter(
      val => Object.values(val).find(
        v => {
          if (Array.isArray(v)) return filter(v, condition).length
          
          return condition(v)        
        }
      )
    )
  }

  useEffect(() => {
    if (!searchValue || searchValue.trim() === '') {
      setExamsToShow(allExams.current)

      return;
    }

    if (debouncedValue) {
      const filteredExams = filter(
        allExams.current,
        (v: any) => v.toLowerCase().includes(searchValue.toLowerCase())
      );
  
      setExamsToShow(filteredExams);
    }

  }, [debouncedValue]);

  return (
    <div className={styles.container}>
      <Header
        title="Provas"
        description="Listagem das provas e da data de realização"
        backTo="/"
      />

      <SearchInput
        placeholder="Pesquisar provas"
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <main>
        { examsToShow.map((exam, i) => (
          <Exam
            key={`exam-${i}`}
            examTags={exam.examTags}
            examName={exam.examName}
            examDate={exam.examDate}
          />
        )) }
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const exams = await getExams();
  
  return {
    props: {
      exams
    }
  }
}

export default ExamsPage;