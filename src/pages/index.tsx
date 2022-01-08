import type { NextPage } from 'next';

import { Layout } from '@components/Layout';
import { IconLink } from '@components/IconLink';

import styles from '@styles/pages/Home.module.scss';

const Home: NextPage = () => {
  return (
    <Layout 
      title='ADS'
      description='Centralizar informações da faculdade em um só lugar para ficar mais organizado e pela facilidade de acessar'
      className={styles.homeContainer}
    >
      <IconLink
        href="/aulas"
        label="Aulas de hoje"
        icon="📒"
      />
      <IconLink
        href="/horarios"
        label="Horários"
        icon="⏰"
      />
      <IconLink
        href="/atividades"
        label="Atividades"
        icon="📚"
      />
      <IconLink
        href="/provas"
        label="Provas"
        icon="🧾"
      />

      <hr />

      <IconLink
        href="/avisos"
        label="Avisos"
        icon="🔔"
      />
      
      <IconLink
        href="/lembretes"
        label="Lembretes"
        icon="❗"
      />
    </Layout>
  )
}

export default Home
