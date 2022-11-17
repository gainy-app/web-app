import { Footer } from './footer';
import {Header} from './header';
import styles from './layout.module.scss';

interface Props {
    children: JSX.Element
    isAuth?: boolean
}

export const Layout = ({children, isAuth}: Props) => {
  return (
    <div className={styles.container}>
      {isAuth && <Header />}
      <main className={styles.content}>
        {children}
      </main>
      <Footer footerClassName={styles.footer}/>
    </div>
  );
};
