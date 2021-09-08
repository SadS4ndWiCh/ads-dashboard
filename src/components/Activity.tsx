import styles from '@styles/components/Activity.module.scss';

type ActivityProps = {
  importanceLevel: 'normal' | 'regular' | 'important' | 'urgent',
  activityName: string,
  activityDescription: string,
  finishDate: string,
};

export function Activity(
  { importanceLevel, activityName, activityDescription, finishDate }: ActivityProps
) {
  const colorByImportance = {
    'normal': '#A5FF6F',
    'regular': '#FFE975',
    'important': '#FF8E4F',
    'urgent': '#FF7A7A',
  }

  const customStyle = {
    '--importanceColor': colorByImportance[importanceLevel]
  } as React.CSSProperties

  return (
    <div
      className={styles.activityContainer}
      style={customStyle}
    >
      <strong>{ activityName }</strong>
      <p>{ activityDescription }</p>

      <small>Entregar até { finishDate }</small>
    </div>
  )
}