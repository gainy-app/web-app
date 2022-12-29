import { Footer } from './footer';
import { Header } from './header';
import styles from './layout.module.scss';
import { usePage } from 'hooks';
import React from 'react';
import { FooterKyc } from './foterKyc';
import { useFormContext } from '../../contexts/FormContext';

interface Props {
  children?: JSX.Element | JSX.Element[] | boolean
  footerClassName?: string
  kyc?: boolean
}

export const Layout = React.memo(({ children, kyc }: Props) => {
  const { withHeader, withFooter } = usePage();
  const { currentStepIndex } = useFormContext();
  return (
    <>
      {withHeader && <Header />}
      <main className={`${styles.content} ${kyc ? styles.kycReset : ''}`}>
        {children}
      </main>
      {withFooter ? <FooterKyc currentStepIndex={currentStepIndex}/> :  <Footer footerClassName={styles.footer}/>}
    </>
  );
});