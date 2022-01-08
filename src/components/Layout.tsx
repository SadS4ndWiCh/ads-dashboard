import { HTMLProps } from "react";

import { Header } from './Header';

import styles from '@styles/components/Layout.module.scss';

interface LayoutProps extends HTMLProps<HTMLDivElement> {
  title: string;
  description?: string;
};

export function Layout({ title, description, children, className }: LayoutProps) {
  return (
    <div className={styles.layoutContainer}>
      <Header
        title={title}
        description={description}
      />

      <main className={className ? className : ''}>
        { children }
      </main>
    </div>
  )
}