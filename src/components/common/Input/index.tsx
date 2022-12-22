import styles from './input.module.scss';
import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    type?: string
    value?: string
    children?: JSX.Element
  centeredPlaceholder?: boolean
}

export const Input = ({ onChange, type, value,name,children, centeredPlaceholder, ...rest }: Props) => {
  return (
    <label htmlFor={name} className={`${styles.label} ${centeredPlaceholder ? '' : ''}`}>
      {children ? children : <input name={name} value={value} onChange={onChange} className={styles.input} type={type} {...rest}/>}
    </label>
  );
};
