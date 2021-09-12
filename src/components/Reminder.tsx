import styles from '@styles/components/Reminder.module.scss';

type ReminderProps = {
  reminderTitle: string;
  reminderDescription: string;
};

export function Reminder({ reminderTitle, reminderDescription }: ReminderProps) {
  return (
    <div className={styles.reminderContainer}>
      <h3>{ reminderTitle }</h3>
      <p>{ reminderDescription }</p>
    </div>
  )
}