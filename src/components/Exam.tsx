import styles from '@styles/components/Exam.module.scss';

type ExamProps = {
  examType: 'p1' | 'p2' | 'p3',
  examName: string,
  examDate: string,
};

export function Exam({ examType, examName, examDate }: ExamProps) {
  return (
    <div className={styles.examContainer}>
      <span>{ examType }</span>

      <div className={styles.separator} />

      <div>
        <p>{examName}</p>
        <small>Data da Prova: <strong>{examDate}</strong></small>
      </div>
    </div>
  )
}