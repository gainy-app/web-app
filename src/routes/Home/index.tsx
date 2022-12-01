import styles from './home.module.scss';
import { config } from './config';
import React, {  useState } from 'react';
import { Invest, Kyc, Layout } from 'components';


export default function Home () {
  const { invest } = config;

  const [start, setStart] = useState<boolean>(false);


  return (
    <Layout footerClassName={styles.footer}>
      {
        start ?  <Kyc/> : <Invest invest={invest} setStart={setStart}/>
      }
    </Layout>
  );
}
