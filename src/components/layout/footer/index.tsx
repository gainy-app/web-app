import classNames from 'classnames';
import styles from './footer.module.scss';

interface Props {
    footerClassName: string
}

export const Footer = ({footerClassName}: Props) => {
  return (
    <footer className={classNames(styles.footer, {
      [footerClassName]: footerClassName,
    })  }>
      <span> © 2021 Gainy, Inc.</span>
    </footer>
  );
};
