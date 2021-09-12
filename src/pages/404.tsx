import type { NextPage } from 'next';
import Image from 'next/image';

import NotFoundBgSVG from '@public/icons/not-found.svg';

import { Header } from '@components/Header';
import { IconLink } from '@components/IconLink';

import styles from '@styles/pages/NotFoundPage.module.scss';

const NotFoundPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header
        title="404"
        description="Página não encontrada"
      />

      <main>
        <Image
          src={NotFoundBgSVG}
          alt="Voltar ao menu"
        />

        <IconLink
          href="/"
          label="Ir ao menu"
          icon="🚪"
        />
      </main>
    </div>
  )
}

export default NotFoundPage;