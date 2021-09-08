import Head from 'next/head';

import styles from '@styles/components/Header.module.scss';

type HeaderProps = {
  title: string,
  description?: string,
};

export function Header({ title, description }: HeaderProps) {
  return (
    <header className={styles.headerContainer}>
      <Head>
        <meta name="title" content={title} />
        <meta name="description" content={description} />

        <title>{title}</title>
      </Head>

      <h1>{ title }</h1>
      { description && <p>{ description }</p> }
    </header>
  )
}