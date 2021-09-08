import Link from 'next/link';
import Image from 'next/image';

import styles from '@styles/components/IconLink.module.scss';
import { HTMLAttributes } from 'react';

interface IconLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string,
  label: string,
  icon: string,
};

export function IconLink({ href, label, icon, className }: IconLinkProps) {
  const iconUrl = new URL(`https://emojicdn.elk.sh/${icon}?style=microsoft`).toString();

  return (
    <Link href={href}>
      <a className={`${styles.iconLinkContainer} ${className}`}>
        <div className={styles.iconImage}>
          <Image
            src={iconUrl}
            width={34}
            height={34}
            alt={label}
          />
        </div>

        <p>{ label }</p>
      </a>
    </Link>
  )
}