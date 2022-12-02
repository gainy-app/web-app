import styles from './field.module.scss';

interface Props {
  children: any
}
export const Field = ({ children }:Props) => {
  return (
    <div className={styles.fieldWrapper}>
      {children}
    </div>
  );
};