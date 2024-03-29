import React, { useEffect } from 'react';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import { PrivateRoute, Loader } from 'components';
import { Home, SignIn, GetApp, Success, Notify } from 'routes';
import { accessConst, routes } from 'utils/constants';
import styles from './components/layout/layout.module.scss';
import { usePage } from 'hooks';
import { FormProvider } from './contexts/FormContext';
import { setAmplitudeUserDevice, setAmplitudeUserId, sendGoogleDataLayerEvent } from './utils/logEvent';
import { getDeviceId } from 'utils/helpers';
import { setAnalyticsUserId } from './firebase';

function App() {
  const { loading, currentUser, appId } = useAuth();
  const { withHeader, isSuccess, isNotHomePage } = usePage();
  const [searchParams] = useSearchParams();

  const accessWithLink = searchParams.get('trading_access') === accessConst.trading_access;

  useEffect(() => {
    setAmplitudeUserDevice(getDeviceId(searchParams.get('deviceId')));

    if (searchParams.get('trading_access') === accessConst.trading_access) {
      localStorage.setItem('withLink', accessWithLink.toString());
    }

    setAmplitudeUserId(appId?.toString()?.padStart(5,'0') || null);
  }, [accessWithLink, appId, searchParams]);

  useEffect(() => {
    if(currentUser) {
      sendGoogleDataLayerEvent('user_id', currentUser?.uid);
    }
  }, [currentUser?.uid]);

  useEffect(() => {
    if(appId) {
      setAnalyticsUserId(appId.toString());
    }
  }, [appId]);

  if(loading) {
    return <Loader/>;
  }

  // TODO get rid of this style definition
  return (
    <div className={`${styles.container} ${withHeader ? '' : styles.black} ${isSuccess ? styles.reset : ''} ${isNotHomePage ? styles.flex : ''}`}>
      <Routes>
        <Route path={routes.home} element={
          <React.Suspense>
            <PrivateRoute>
              <FormProvider>
                <Home/>
              </FormProvider>
            </PrivateRoute>
          </React.Suspense>
        }/>
        <Route path={routes.signIn} element={
          <React.Suspense>
            <SignIn/>
          </React.Suspense>}>
        </Route>
        <Route path={routes.getApp} element={
          <React.Suspense>
            <GetApp/>
          </React.Suspense>}>
        </Route>
        <Route path={routes.success} element={
          <React.Suspense>
            <PrivateRoute>
              <Success/>
            </PrivateRoute>
          </React.Suspense>}>
        </Route>
        <Route path={routes.notify}
          element={
            <React.Suspense>
              <Notify/>
            </React.Suspense>
          }/>
      </Routes>
    </div>
  );
}

export default App;
