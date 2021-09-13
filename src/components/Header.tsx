import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import ArrowLeftSVG from '@public/icons/arrow-left.svg';

import styles from '@styles/components/Header.module.scss';

type HeaderProps = {
  title: string,
  description?: string,
  backTo?: string,
};

export function Header({ title, description, backTo }: HeaderProps) {
  const router = useRouter();
  
  return (
    <header className={styles.headerContainer}>
      <Head>
        <meta name="title" content={title} />
        <meta name="description" content={description} />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://ads-dashboard-rho.vercel.app${router.pathname}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="https://ads-dashboard-rho.vercel.app/og-image.webp" />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://ads-dashboard-rho.vercel.app${router.pathname}`} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content="https://ads-dashboard-rho.vercel.app/og-image.webp" />

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