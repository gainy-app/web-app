import styles from '../kyc/kyc.module.scss';
interface Props {
  children: JSX.Element | JSX.Element[]
}
export const PrivacyLayout = ({ children }: Props) => {
  return (
    <div className={styles.section}>
      {children}
    </div>
  );
};
