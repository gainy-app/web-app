import { Footer } from './footer';
import { Header } from './header';
import styles from './layout.module.scss';
import { usePage } from 'hooks';
import React from 'react';

interface Props {
    children?: JSX.Element | JSX.Element[]
    footerClassName?: string
}

export const Layout = React.memo(({ children, footerClassName }: Props) => {
  const { withHeader, withFooter } = usePage();

  return (
    <>
      {withHeader && <Header />}
      <main className={styles.content}>
        {children}
      </main>
      <Footer footerClassName={withFooter ? styles.footer : footerClassName}/>
    </>
  );
});
