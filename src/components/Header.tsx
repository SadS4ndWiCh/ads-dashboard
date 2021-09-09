import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import ArrowLeftSVG from '@public/icons/arrow-left.svg';

import styles from '@styles/components/Header.module.scss';

type HeaderProps = {
  title: string,
  description?: string,
  backTo?: string,
};

export function Header({ title, description, backTo }: HeaderProps) {
  return (
    <header className={styles.headerContainer}>
      <Head>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />

        <meta name="title" content={title} />
        <meta name="description" content={description} />

        <title>{title}</title>
      </Head>

      <div>
        <h1>{ title }</h1>
        { description && <p>{ description }</p> }
      </div>

      { backTo && (
        <Link href={backTo}>
          <a>
            <Image
              src={ArrowLeftSVG}
              alt="Voltar para página anterior"
            />
          </a>
        </Link>
      ) }
    </header>
  )
}