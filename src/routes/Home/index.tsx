import styles from './home.module.scss';
import { config } from './config';
import React, {  useState } from 'react';
import { Invest, Kyc, Layout } from 'components';
// import { useQuery } from '@apollo/client';
// import {  TRADING_GET_PROFILE_STATUS } from '../../services/gql/queries';
// import { useFormContext } from '../../contexts/FormContext';
// import { Navigate } from 'react-router-dom';
// import { routes } from '../../utils/constants';


export default function Home () {
  const { invest } = config;
  // const { appId } = useFormContext();
  // const { data } = useQuery(TRADING_GET_PROFILE_STATUS, {
  //   variables: {
  //     profile_id: appId
  //   }
  // });

  const [start, setStart] = useState<boolean>(false);
  const investSumFromStorage = localStorage.getItem('invest');

  // if(data?.trading_profile_status.find((i: any) => i?.kyc_status !== null).kyc_status !== null) {
  //   return <Navigate to={routes.success}></Navigate>;
  // }

  return (
    <Layout footerClassName={styles.footer}>
      {
        start || investSumFromStorage ?  <Kyc/> : <Invest invest={invest} setStart={setStart}/>
      }
    </Layout>
  );
}
