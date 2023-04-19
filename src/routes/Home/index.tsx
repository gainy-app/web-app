import styles from './home.module.scss';
import { Kyc, Layout, Loader } from 'components';
import { Navigate } from 'react-router-dom';
import { routes } from 'utils/constants';
import { useFormContext } from 'contexts/FormContext';

export default function Home () {
  const {
    loader,
    formStatus,
    isTreadingEnabled
  } = useFormContext();

  if(loader) return <Loader/>;
  const isKycFormDone = formStatus?.trading_profile_status[0]?.kyc_done;
  const withLinkFromStorage = localStorage.getItem('withLink') === 'true' ? true : false;
  const withTrading = isTreadingEnabled?.app_profiles?.find((profile: any) => !!profile.flags);

  if(!(withTrading?.flags?.is_trading_enabled || withLinkFromStorage)) return <Navigate to={routes.getApp}/>;
  if(isKycFormDone) {
    return <Navigate to={routes.success}/>;
  }
  return (
    <Layout footerClassName={styles.footer} kyc>
      <Kyc/>
    </Layout>
  );
}
