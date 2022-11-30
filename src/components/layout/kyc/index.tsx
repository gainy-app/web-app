import styles from './kyc.module.scss';

interface Props {
  children: JSX.Element | JSX.Element[]
}
export const KycLayout = ({ children }: Props) => {
  return (
    <div className={styles.section}>
      {children}
    </div>
  );
};
