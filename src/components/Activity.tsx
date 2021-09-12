import styles from '@styles/components/Activity.module.scss';

type ActivityProps = {
  importanceLevel: 'normal' | 'regular' | 'important' | 'urgent',
  activityName: string,
  activityDescription: string,
  finishDate: string,
  isFinished: boolean,
};

export function Activity(
  {
    importanceLevel,
    activityName,
    activityDescription,
    finishDate,
    isFinished
  }: ActivityProps
) {
  const colorByImportance = {
    'normal': '#A5FF6F',
    'regular': '#FFE975',
    'important': '#FF8E4F',
    'urgent': '#FF7A7A',
  }

  const customStyle = {
    '--importanceColor': colorByImportance[importanceLevel],
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