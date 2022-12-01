import { ReactElement } from 'react';
import styles from './field.module.scss';

interface Props {
  children: ReactElement[] | ReactElement
}
export const Field = ({ children }:Props) => {
  return (
    <div className={styles.fieldWrapper}>
      {children}
    </div>
  );
};