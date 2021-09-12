import { CSSProperties } from 'react';

import styles from '@styles/components/Exam.module.scss';

interface IExamTag {
  id: string;
  name: string;
  color: string;
}

type ExamProps = {
  examTags: IExamTag[],
  examName: string,
  examDate: string,
  isDone: boolean,
};

export function Exam({ examTags, examName, examDate, isDone }: ExamProps) {
  const customStyle = {
    'filter': `brightness(${ isDone ? .8 : 1 })`
  } as CSSProperties;
  
  return (
    <div
      className={styles.examContainer}
      style={customStyle}
    >
      <div>
        <p>{examName}</p>
        <small>
          {
            isDone ? 
              'Prazo encerrado' : 
              ( <>Data da Prova: <strong>{examDate}</strong></> )
          }
        </small>
      </div>

      <div className={styles.examTags}>
        { examTags && examTags.map(tag => (
          <span
            key={tag.id}
          >
            { tag.name }
          </span>
        )) }
      </div>
    </div>
  )
}