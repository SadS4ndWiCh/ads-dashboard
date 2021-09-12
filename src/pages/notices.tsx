import type { NextPage } from 'next';
import { GetStaticProps } from 'next';

import { getNotices } from '@lib/ads';

import { Header } from '@components/Header';
import { Notice } from '@components/Notice';

import styles from '@styles/pages/NoticesPage.module.scss';

interface INotice {
  noticeTitle: string;
  noticeDescription: string;
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
        { notices && notices.map((notice, i) => (
          <div
            key={`notice-${i}`}
          >
            <Notice
              noticeTitle={notice.noticeTitle}
              noticeDescription={notice.noticeDescription}
            />
          </div>
        )) }
      </main>
    </div>
  )
};

export const getStaticProps: GetStaticProps = async () => {
  const notices = await getNotices();
  
  return {
    props: {
      notices,
    },

    revalidate: 60 * 60 * 12 // a cada 12h
  }
};

export default NoticesPage;