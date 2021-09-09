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
};

export function Exam({ examTags, examName, examDate }: ExamProps) {
  return (
    <div className={styles.examContainer}>
      <div>
        <p>{examName}</p>
        <small>Data da Prova: <strong>{examDate}</strong></small>
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