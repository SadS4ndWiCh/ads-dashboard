import { useState, useRef, useEffect } from 'react';

import type { GetStaticProps, NextPage } from 'next';

import { getActivities } from '@lib/ads';

import { useDebounce } from '@hooks/useDebounce';

import { Header } from '@components/Header';
import { SearchInput } from '@components/SearchInput';
import { Activity } from '@components/Activity';

import styles from '@styles/pages/ActivitiesPage.module.scss';

interface IActivities {
  importanceLevel: 'normal' | 'regular' | 'important' | 'urgent';
  activityName: string;
  activityDescription: string;
  finishDate: string;
}

type ActivitiesPageProps = {
  activities: IActivities[];
};

const ActivitiesPage: NextPage<ActivitiesPageProps> = ({ activities }: ActivitiesPageProps) => {
  const allActivities = useRef<IActivities[]>(activities);
  const [activitiesToShow, setActivitiesToShow] = useState<IActivities[]>(activities);
  const [searchValue, setSearchValue] = useState('');

  const debouncedValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (!searchValue || searchValue.trim() === '') {
      setActivitiesToShow(allActivities.current)

      return;
    }

    if (debouncedValue) {
      const filteredActivities = allActivities.current.filter(
        activity => Object.values(activity).find(
          value => value.toLowerCase().includes(searchValue.toLowerCase())
        )
      )
      console.log(filteredActivities);
  
      setActivitiesToShow(filteredActivities);
    }

  }, [debouncedValue]);
  
  return (
    <div className={styles.container}>
      <Header
        title="Atividades"
        description="Listagem das atividades atuais para serem feitas"
        backTo="/"
      />

      <SearchInput
        placeholder="Pesquisar atividades"
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <main>
        { activitiesToShow && activitiesToShow.map((activity, i) => (
          <Activity
            key={`activity-${i}`}
            importanceLevel={activity.importanceLevel}
            activityName={activity.activityName}
            activityDescription={activity.activityDescription}
            finishDate={activity.finishDate}
          />
          ))
        }
      </main>
    </div>
  )
};

export const getStaticProps: GetStaticProps = async () => {
  const activities = await getActivities();
  
  return {
    props: {
      activities: activities
    },
    revalidate: 60 * 60 // A cada 1 hora
  }
}

export default ActivitiesPage;