import styles from './field.module.scss';

interface Props {
  children: any
  fieldClass?: any
}
export const Field = ({ children, fieldClass }:Props) => {
  return (
    <div className={`${styles.fieldWrapper} ${fieldClass ? fieldClass : ''}`}>
      {children}
    </div>
  );
};