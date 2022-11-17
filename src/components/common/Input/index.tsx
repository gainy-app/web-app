import styles from './input.module.scss';
import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react';

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    type?: string
    value: string
}

export const Input = ({ onChange, type, value, ...rest }: Props) => {
  return (
    <input value={value} onChange={onChange} className={styles.input} type={type} {...rest}/>
  );
};
