import { Footer } from './footer';
import { Header } from './header';
import styles from './layout.module.scss';
import { useLocation } from 'react-router-dom';
import { routes } from 'utils/constants';

interface Props {
    children?: JSX.Element
}

export const Layout = ({children}: Props) => {
  const {pathname} = useLocation();
  const withHeader = (!pathname.includes(routes.signIn) && !pathname.includes(routes.getApp));

  return (
    <div className={styles.container}>
      {withHeader && <Header />}
      <main className={styles.content}>
        {children}
      </main>
      <Footer footerClassName={styles.footer}/>
    </div>
  );
};
