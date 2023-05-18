import classNames from 'classnames';
import { getCurrentYear } from 'utils/helpers';
import styles from './footer.module.scss';

interface Props {
    footerClassName?: string
}

export const Footer = ({ footerClassName }: Props) => {
  const currentYear = getCurrentYear();

  return (
    <footer className={classNames(styles.footer, {
      [footerClassName || '']: footerClassName,
    })  }>
      <span> © {currentYear} Gainy, Inc.</span>
    </footer>
  );
};
