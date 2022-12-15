import styles from './home.module.scss';
import { config } from './config';
import React, {  useState } from 'react';
import { Invest, Kyc, Layout, Loader } from 'components';
import { Navigate } from 'react-router-dom';
import { routes } from '../../utils/constants';
import { useFormContext } from '../../contexts/FormContext';
// import { useQuery } from '@apollo/client';
// import { TRADING_GET_PROFILE_STATUS } from '../../services/gql/queries';


export default function Home () {
  const { invest } = config;
  const {
    formStatus
  } = useFormContext();

  // const { data: formStatus, loading: formStatusLoading, error } = useQuery(TRADING_GET_PROFILE_STATUS, {
  //   variables: {
  //     profile_id: appId
  //   }
  // });
  if(formStatus.formStatusLoading) {
    return <Loader/>;
  }
  const status = formStatus?.formStatus?.trading_profile_status[0].kyc_status;
  console.log(status);
  // const formStatusStatus = formStatus?.formStatus?.trading_profile_status?.find((i: any) => i?.kyc_status);
  // eslint-disable-next-line no-debugger
  // debugger;
  // console.log(formStatusStatus);
  const [start, setStart] = useState<boolean>(false);
  const investSumFromStorage = localStorage.getItem('invest');
  // if(formStatusLoading) return <Loader/>;
  // const formStatusStatus = formStatusData?.trading_profile_status?.find((i: any) => i?.kyc_status !== null)?.kyc_status;

  if(status !== null) {
    return <Navigate to={routes.success}/>;
  }
  // console.log(error);
  // console.log(formStatusLoading);
  // console.log(formStatus);

  return (
    <Layout footerClassName={styles.footer}>
      {
        start || investSumFromStorage ?  <Kyc/> : <Invest invest={invest} setStart={setStart}/>
      }
    </Layout>
  );
}
