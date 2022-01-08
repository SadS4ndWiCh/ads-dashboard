import { HTMLProps } from "react";

import { Header } from './Header';

import styles from '@styles/components/Layout.module.scss';

interface LayoutProps extends HTMLProps<HTMLDivElement> {
  title: string;
  description?: string;
  backTo?: string;
};

export function Layout({ title, description, backTo, children, className }: LayoutProps) {
  return (
    <div className={styles.layoutContainer}>
      <Header
        title={title}
        description={description}
        backTo={backTo}
      />

      <main className={className ? className : ''}>
        { children }
      </main>
    </div>
  )
}