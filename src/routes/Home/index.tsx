import styles from './home.module.scss';
import { config } from './config';
import React, { useState } from 'react';
import { Invest, Kyc, Layout, Loader } from 'components';
import { Navigate } from 'react-router-dom';
import { routes } from '../../utils/constants';
import { useFormContext } from '../../contexts/FormContext';

export default function Home () {
  const { invest } = config;
  const {
    loader,
    formStatus
  } = useFormContext();
  const [start, setStart] = useState<boolean>(false);
  const investSumFromStorage = localStorage.getItem('invest');

  if(loader) return <Loader/>;
  const status = formStatus?.trading_profile_status[0]?.kyc_status;

  if(status !== null) {
    return <Navigate to={routes.success}/>;
  }

  return (
    <Layout footerClassName={styles.footer}>
      {
        start || investSumFromStorage ?  <Kyc/> : <Invest invest={invest} setStart={setStart}/>
      }
    </Layout>
  );
}
