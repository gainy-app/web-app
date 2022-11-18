import styles from './input.module.scss';
import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react';

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    type?: string
    value: string
}

export const Input = ({ onChange, type, value,name, ...rest }: Props) => {
  return (
    <label htmlFor={name} className={styles.label}>
      <input name={name} value={value} onChange={onChange} className={styles.input} type={type} {...rest}/>
    </label>
  );
};
