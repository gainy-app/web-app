import styles from './home.module.scss';
import { config } from './config';
import React, {  useState } from 'react';
import { Invest, Kyc, Layout, Loader } from 'components';
import { Navigate } from 'react-router-dom';
import { routes } from 'utils/constants';
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

  if(loader) return <Loader/>;
  const status = formStatus?.trading_profile_status[0]?.kyc_status;
  const withLinkFromStorage = localStorage.getItem('withLink') === 'true' ? true : false;
  const withTrading = isTreadingEnabled?.app_profiles?.find((profile: any) => !!profile.flags);

  if(!(withTrading?.flags?.is_trading_enabled || withLinkFromStorage)) return <Navigate to={routes.getApp}/>;
  if(status) {
    return <Navigate to={routes.success}/>;
  }
  return (
    <Layout footerClassName={styles.footer} kyc>
      {
        start || investSumFromStorage ?  <Kyc/> : <Invest invest={invest} setStart={setStart}/>
      }
    </Layout>
  );
}
