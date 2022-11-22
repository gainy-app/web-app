import styles from './loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.center}>
      <div className={styles.loader}/>
    </div>
  );
};
