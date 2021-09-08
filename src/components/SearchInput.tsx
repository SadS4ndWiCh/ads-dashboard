import { ChangeEventHandler } from "react";

import styles from '@styles/components/SearchInput.module.scss';

type SearchInputProps = {
  placeholder: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
};

export function SearchInput({ placeholder, onChange }: SearchInputProps) {
  return (
    <input
      className={styles.searchInputContainer}
      type="text"
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}