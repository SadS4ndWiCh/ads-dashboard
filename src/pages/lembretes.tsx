import type { NextPage, GetStaticProps } from 'next';

import * as AdsApi from '@lib/ads';

import { Layout } from '@components/Layout';
import { Reminder } from '@components/Reminder';

import styles from '@styles/pages/RemindersPage.module.scss';

interface IReminder {
  title: string;
  description: string;
}

type RemindersPageProps = {
  reminders: IReminder[],
};

const RemindersPage: NextPage<RemindersPageProps> = ({ reminders }) => {
  return (
    <Layout
      title='Lembretes'
      description='Listagem de lembretes sobre coisas como eventos/programas internos da Fatec, que envolva nossa área'
      className={styles.container}
    >
      { reminders.length ? reminders.map((reminder, i) => (
        <Reminder
          key={`reminder-${i}`}
          reminderTitle={reminder.title}
          reminderDescription={reminder.description}
        />
      )) :
        <p>Sem lembretes</p>
      }
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const reminders = await AdsApi.getReminders();

  return {
    props: {
      reminders,
    },
    revalidate: 60 * 60 * 12 // a cada 12h
  }
};

export default RemindersPage;