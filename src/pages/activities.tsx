import { useState, useRef, useEffect } from 'react';

import type { GetStaticProps, NextPage } from 'next';

import { getActivities } from '@lib/ads';

import { Header } from '@components/Header';
import { Activity } from '@components/Activity';
import { Select } from '@components/Select';

import styles from '@styles/pages/ActivitiesPage.module.scss';

interface IAtivityTags {
  id: string;
  name: string;
  color: string;
}

interface IActivities {
  importanceLevel: 'normal' | 'regular' | 'important' | 'urgent';
  activityName: string;
  activityDescription: string;
  activityTags: IAtivityTags[];
  finishDate: string;
}

type ActivitiesPageProps = {
  activities: IActivities[];
};

const ActivitiesPage: NextPage<ActivitiesPageProps> = ({ activities }: ActivitiesPageProps) => {
  const allActivities = useRef<IActivities[]>(activities);
  const [activitiesToShow, setActivitiesToShow] = useState<IActivities[] | null>(null);

  const [tag, setTag] = useState('');

  function filterByTag(tagName: string) {
    return allActivities.current.filter(
      activity => {
        const activityTags = activity.activityTags.map(tag => tag.name);
        return activityTags.includes(tagName);
      }
    )
  }

  useEffect(() => {
    if (tag === '') {
      setActivitiesToShow(allActivities.current)
    }
    else {
      const filtered = filterByTag(tag);
      setActivitiesToShow(filtered);
    }
  }, [tag]);

  return (
    <div className={styles.container}>
      <Header
        title="Atividades"
        description="Listagem das atividades atuais para serem feitas"
        backTo="/"
      />

      <div
        className={styles.filters}
      >
        <Select
          options={[
            { value: "lab-hardware", label: 'Laboratório de Hardware' },
            { value: "alg-log", label: 'Algoritmo e Lógica de Programação' },
            { value: "adm-ger", label: 'Administração Geral' },
            { value: "arq-org", label: 'Arquitetura e Organização de Computadores' },
            { value: "prog-mic", label: 'Programação em Microinformática' },
            { value: "ing", label: 'Inglês' },
            { value: "mat-disc", label: 'Matemática Discreta' },
          ]}
          placeholder="Selecionar matéria"
          onChange={(e) => setTag(e.target.value)}
        />
      </div>

      <main>
        { 
          activitiesToShow?.length ?
            activitiesToShow.map((activity, i) => (
              <Activity
                key={`activity-${i}`}
                importanceLevel={activity.importanceLevel}
                activityName={activity.activityName}
                activityDescription={activity.activityDescription}
                finishDate={activity.finishDate}
              />
              )) :
            <p>Sem atividades</p>
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