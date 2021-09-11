import type { NextPage } from 'next';

import { Header } from '@components/Header';
import { IconLink } from '@components/IconLink';

import styles from '@styles/pages/Home.module.scss';

const Home: NextPage = () => {
  return (
    <div className={styles.homeContainer}>
      <Header
        title="ADS"
        description="Centralizar informações da faculdade em um só lugar para ficar mais organizado e pela facilidade de acessar"
      />

      <main>
        <IconLink
          href="/classes"
          label="Aulas de hoje"
          icon="📒"
        />
        <IconLink
          href="/horaries"
          label="Horários"
          icon="⏰"
        />
        <IconLink
          href="/activities"
          label="Atividades"
          icon="📚"
        />
        <IconLink
          href="/exams"
          label="Provas"
          icon="🧾"
        />

        <hr />

        <IconLink
          href="/notices"
          label="Avisos"
          icon="🔔"
          />
        
        <IconLink
          href="/reminders"
          label="Lembretes"
          icon="❗"
          className="disabled"
        />

      </main>
    </div>
  )
}

export default Home
