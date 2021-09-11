import styles from '@styles/components/Notice.module.scss';

type NoticeProps = {
  noticeTitle: string,
  noticeDescription: string,
};

export function Notice({ noticeTitle, noticeDescription }: NoticeProps) {
  return (
    <div className={styles.noticeContainer}>
      <h3>{ noticeTitle }</h3>
      <p>{ noticeDescription }</p>
    </div>
  )
}