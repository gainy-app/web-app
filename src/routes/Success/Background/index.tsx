import styles from './background.module.scss';
import cosmonavt from 'assets/cosmonavt.png';
export const Background = () => {
  return (
    <div className={styles.sticky}>
      <div className={styles.wrapper}>
        <div className={styles.stars}>
          <div className={styles.rounds}>

          </div>
          <img src={cosmonavt} alt={'cosmosMan'} className={styles.austanavt}/>
        </div>
      </div>
    </div>
  );
};