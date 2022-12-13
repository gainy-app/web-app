import styles from './home.module.scss';
import { config } from './config';
import React, {  useState } from 'react';
import { Invest, Kyc, Layout } from 'components';


export const Home = () =>  {
  const { invest } = config;

  const [start, setStart] = useState<boolean>(false);
  const investSumFromStorage = localStorage.getItem('invest');

  return (
    <Layout footerClassName={styles.footer}>
      {
        start || investSumFromStorage ?  <Kyc/> : <Invest invest={invest} setStart={setStart}/>
      }
    </Layout>
  );
};
