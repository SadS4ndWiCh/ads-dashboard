import type { NextPage, GetStaticProps } from 'next';

import { getReminders } from '@lib/ads';

import { Header } from '@components/Header';
import { Reminder } from '@components/Reminder';

import styles from '@styles/pages/RemindersPage.module.scss';

interface IReminder {
  reminderTitle: string;
  reminderDescription: string;
}

type RemindersPageProps = {
  reminders: IReminder[],
};

const RemindersPage: NextPage<RemindersPageProps> = ({ reminders }) => {
  return (
    <div className={styles.container}>
      <Header
        title="Lembretes"
        description="Listagem de lembretes sobre coisas como eventos/programas internos da Fatec, que envolva nossa área"
        backTo="/"
      />

      <main>
        { reminders && !reminders.length && (
          <p>Sem lembretes</p>
        ) }
        { reminders && reminders.map((reminder, i) => (
          <Reminder
            key={`reminder-${i}`}
            reminderTitle={reminder.reminderTitle}
            reminderDescription={reminder.reminderDescription}
          />
        )) }
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const reminders = await getReminders();

  return {
    props: {
      reminders,
    },

  }
};

export default RemindersPage;