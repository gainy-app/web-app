import styles from './footer.module.scss';

export const FooterKyc = () => {
  return (
    <footer className={styles.footer}>
      <footer className={styles.wrapper}>
        <span> © 2021 Gainy, Inc.</span>
        <a href="https://www.gainy.app/legal-hub" target='_blank' rel="noreferrer">Disclosures</a>
      </footer>
    </footer>

  );
};
