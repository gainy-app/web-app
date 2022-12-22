import { ReactNode } from 'react';
import styles from './formwrapper.module.scss';

interface Props {
  title?: string
  subtitle?: any
  children: ReactNode
}
export const FormWrapper = ({ title, subtitle, children }: Props) => {
  return (
    <>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{subtitle}</p>
      {children}
    </>
  );
};