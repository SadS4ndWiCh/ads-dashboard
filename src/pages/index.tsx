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
          href="/"
          label="Aulas de hoje"
          icon="📒"
        />
        <IconLink
          href="/"
          label="Horários"
          icon="⏰"
        />
        <IconLink
          href="/"
          label="Atividades"
          icon="📚"
        />
        <IconLink
          href="/"
          label="Provas"
          icon="🧾"
        />

        <hr />

        <IconLink
          href="/"
          label="Avisos"
          icon="🔔"
        />
        
        <IconLink
          href="/"
          label="Lembretes"
          icon="❗"
        />

      </main>
    </div>
  )
}

export default Home
