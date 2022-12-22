import { Footer } from './footer';
import { Header } from './header';
import styles from './layout.module.scss';
import { usePage } from 'hooks';
import React from 'react';
import { FooterKyc } from './foterKyc';

interface Props {
  children?: JSX.Element | JSX.Element[] | boolean
  footerClassName?: string
}

export const Layout = React.memo(({ children }: Props) => {
  const { withHeader, withFooter } = usePage();
  return (
    <>
      {withHeader && <Header />}
      <main className={styles.content}>
        {children}
      </main>
      {withFooter ? <FooterKyc/> :  <Footer footerClassName={styles.footer}/>}
    </>
  );
});