import { ReactElement } from 'react';
import styles from './field.module.scss';

interface Props {
  children: ReactElement[]
  id: string
}
export const Field = ({ children , id }:Props) => {
  return (
    <div className={styles.fieldWrapper}>
      {children}
    </div>
  );
};