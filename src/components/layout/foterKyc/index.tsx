import { getCurrentYear } from 'utils/helpers';
import styles from './footer.module.scss';

export const FooterKyc = ({ currentStepIndex }: {currentStepIndex: number}) => {
  const currentYear = getCurrentYear();
  const withMargin = currentStepIndex === 2 || currentStepIndex === 15 || currentStepIndex === 16;

  return (
    <footer className={`${styles.footer} ${withMargin ? styles.reset : ''}`}>
      <div className={styles.wrapper}>
        <span> © {currentYear} Gainy, Inc.</span>
        <a href="https://www.gainy.app/legal-hub" target='_blank' rel="noreferrer">Disclosures</a>
      </div>
    </footer>
  );
};
