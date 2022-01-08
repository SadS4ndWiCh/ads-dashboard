import type { NextPage } from 'next';
import { GetStaticProps } from 'next';

import * as AdsApi from '@lib/ads';

import { Header } from '@components/Header';
import { Notice } from '@components/Notice';

import styles from '@styles/pages/NoticesPage.module.scss';

interface INotice {
  title: string;
  description: string;
}

type NoticesPageProps = {
  notices: INotice[];
};

const NoticesPage: NextPage<NoticesPageProps> = ({ notices }) => {
  return (
    <div className={styles.container}>
      <Header
        title="Avisos"
        description="Listagem de avisos importantes"
        backTo="/"
      />

      <main>
        { notices.length ? notices.map((notice, i) => (
          <div
            key={`notice-${i}`}
          >
            <Notice
              noticeTitle={notice.title}
              noticeDescription={notice.description}
            />
          </div>
        )) : 
          <p>Sem avisos</p>
        }
      </main>
    </div>
  )
};

export const getStaticProps: GetStaticProps = async () => {
  const notices = await AdsApi.getNotices();
  
  return {
    props: {
      notices,
    },

    revalidate: 60 * 60 * 12 // a cada 12h
  }
};

export default NoticesPage;