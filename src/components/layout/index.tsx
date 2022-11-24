import { Footer } from './footer';
import { Header } from './header';
import styles from './layout.module.scss';
import {usePage} from 'hooks';

interface Props {
    children?: JSX.Element
}

export const Layout = ({children}: Props) => {
  const {withHeader} = usePage();

  return (
    <>
      {withHeader && <Header />}
      <main className={styles.content}>
        {children}
      </main>
      <Footer footerClassName={styles.footer}/>
    </>
  );
};
