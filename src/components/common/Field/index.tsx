import styles from './field.module.scss';

interface Props {
  children: any
  fieldClass?: any
  active?: boolean
}
export const Field = ({ children, fieldClass, active }:Props) => {
  return (
    <div className={`${styles.fieldWrapper} ${fieldClass ? fieldClass : ''} ${active ? styles.active: ''}`}>
      {children}
    </div>
  );
};