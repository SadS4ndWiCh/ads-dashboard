import { HTMLAttributes, ChangeEventHandler } from 'react';

import styles from '@styles/components/Select.module.scss';

interface IOption {
  value: string;
  label: string;
}

interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
  options?: IOption[];
  placeholder?: string;

  onChange?: ChangeEventHandler<HTMLSelectElement>
}

export function Select({ options, placeholder, ...rest }: SelectProps) {
  return (
    <select
      className={styles.selectContainer}
      { ...rest }
    >
      <option value="">{ placeholder ? placeholder : 'Selecionar...' }</option>
      { options?.map((option, i) => (
        <option
          key={`option-${i}`}
          value={option.value}
        >
          { option.label }
        </option>
      )) }
    </select>
  )
}