import styles from '@styles/components/ClassSchedule.module.scss';

type ClassScheduleProps = {
  startTime: string,
  classSubjectName: string,
};

export function ClassSchedule({ startTime, classSubjectName }: ClassScheduleProps) {
  return (
    <div className={styles.classScheduleContainer}>
      <div className={styles.classScheduleStart}>
        <span>{ startTime }</span>
      </div>

      <p>{ classSubjectName }</p>
    </div>
  )
}