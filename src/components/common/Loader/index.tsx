import styles from './loader.module.scss';

interface Props {
    className?: string
}

export const Loader = ({className}: Props) => {
  return (
    <div className={`${styles.center} ${className}`}>
      <div className={styles.loader}/>
    </div>
  );
};
