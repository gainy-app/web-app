import styles from './home.module.scss';
import { config } from './config';
import React, { useState } from 'react';
import { Invest, Kyc, Layout, Loader } from 'components';
import { Navigate, useSearchParams } from 'react-router-dom';
import { accessConst, routes } from 'utils/constants';
import { useFormContext } from 'contexts/FormContext';

export default function Home () {
  const { invest } = config;
  const {
    loader,
    formStatus,
    isTreadingEnabled
  } = useFormContext();
  const [start, setStart] = useState<boolean>(false);
  const investSumFromStorage = localStorage.getItem('invest');
  const [searchParams, _] = useSearchParams();

  const accessWithLink = searchParams.get('trading_access') === accessConst.trading_access;

  if(loader) return <Loader/>;
  const status = formStatus?.trading_profile_status[0]?.kyc_status;
  const withTrading = isTreadingEnabled?.app_profiles?.find((profile: any) => !!profile.flags);
  if(status !== null) {
    return <Navigate to={routes.success}/>;
  }

  if(!(accessWithLink || withTrading?.flags?.is_trading_enabled)) return <Navigate to={routes.getApp}/>;

  return (
    <Layout footerClassName={styles.footer}>
      {
        start || investSumFromStorage ?  <Kyc/> : <Invest invest={invest} setStart={setStart}/>
      }
    </Layout>
  );
}
