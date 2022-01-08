import { useEffect, useRef, useState } from 'react';

import type { GetStaticProps, NextPage } from 'next';

import * as AdsApi from '@lib/ads';

import { Header } from '@components/Header';
import { Exam } from '@components/Exam';
import { Select } from '@components/Select';

import styles from '@styles/pages/ExamsPage.module.scss';

interface IExamTag {
  id: string;
  name: string;
  color: string;
}

interface IExam {
  tags: IExamTag[],
  name: string,
  date: string,
  isDone: boolean,
}

type ExamsPageProps = {
  exams: IExam[],
};

const ExamsPage: NextPage<ExamsPageProps> = ({ exams }) => {
  const allExams = useRef<IExam[]>(exams);
  const [examsToShow, setExamsToShow] = useState<IExam[]>(exams);
  const [tags, setTags] = useState({
    examTag: '',
    classTag: '',
  });

  const tagRegex = /p[1,2,3]/i;

  function filterByTags(tagsName: string[]) {
    return allExams.current.filter(
      exam => {
        const examTags = exam.tags.map(tag => tag.name);
        return tagsName.every(tagName => examTags.includes(tagName));
      }
    )
  }

  useEffect(() => {
    if (tags.examTag === '' && tags.classTag === '') {
      setExamsToShow(allExams.current);
    }
    else {
      const filtered = filterByTags(Object.values(tags).filter(tag => tag !== ''));
      setExamsToShow(filtered);
    }
    
  }, [tags]);

  return (
    <div className={styles.container}>
      <Header
        title="Provas"
        description="Listagem das provas e da data de realização"
        backTo="/"
      />

      <div className={styles.filters}>
        <Select
          options={[
            { value: 'p1', label: 'P1' },
            { value: 'p2', label: 'P2' },
            { value: 'p3', label: 'P3' },
          ]}
          placeholder="Selecionar prova"
          onChange={(e) => setTags(old => ({ ...old, examTag: e.target.value }))}
        />
        <Select
          options={[
            { value: "lab-hardware", label: 'Laboratório de Hardware' },
            { value: "alg-log", label: 'Algoritmo e Lógica de Programação' },
            { value: "adm-ger", label: 'Administração Geral' },
            { value: "arq-org-comp", label: 'Arquitetura e Organização de Computadores' },
            { value: "prog-mic", label: 'Programação em Microinformática' },
            { value: "ing", label: 'Inglês' },
            { value: "mat-disc", label: 'Matemática Discreta' },
          ]}
          placeholder="Selecionar matéria"
          onChange={(e) => setTags(old => ({ ...old, classTag: e.target.value }))}
        />
      </div>

      <main>
        { 
          examsToShow.length ?
            examsToShow.map((exam, i) => (
              <Exam
                key={`exam-${i}`}
                examTags={exam.tags.filter(tag => tag.name.match(tagRegex))}
                examName={exam.name}
                examDate={exam.date}
                isDone={exam.isDone}
              />
            )) :
            <p>Sem provas</p>
        }
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const exams = await AdsApi.getExams();
  
  return {
    props: {
      exams
    },
    revalidate: 60 * 60 * 24 // A cada 1 dia
  }
}

export default ExamsPage;