import styles from '@styles/components/Activity.module.scss';

type ActivityProps = {
  activityName: string,
  activityDescription: string,
  finishDate: string,
  isFinished: boolean,
};

export function Activity(
  {
    activityName,
    activityDescription,
    finishDate,
    isFinished
  }: ActivityProps
) {

  const customStyle = {
    'filter': `brightness(${ isFinished ? .8 : 1 })`
  } as React.CSSProperties

  return (
    <div
      className={styles.activityContainer}
      style={customStyle}
    >
      <strong>{ activityName }</strong>
      <p>{ activityDescription }</p>

      <small>{ isFinished ? 'Prazo encerrado' : `Entregar até ${finishDate}` }</small>
    </div>
  )
}