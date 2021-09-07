import Link from 'next/link';
import Image from 'next/image';

import styles from '@styles/components/IconLink.module.scss';

type IconLinkProps = {
  href: string,
  label: string,
  icon: string,
};

export function IconLink({ href, label, icon }: IconLinkProps) {
  const iconUrl = new URL(`https://emojicdn.elk.sh/${icon}?style=microsoft`).toString();

  return (
    <Link href={href}>
      <a className={styles.iconLinkContainer}>
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