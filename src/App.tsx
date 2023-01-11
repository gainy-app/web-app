import React, { useEffect } from 'react';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import { PrivateRoute, Loader } from 'components';
import { Home, SignIn, GetApp, Success, Notify } from 'routes';
import { accessConst, routes } from 'utils/constants';
import styles from './components/layout/layout.module.scss';
import { usePage } from 'hooks';
import { FormProvider } from './contexts/FormContext';
import { trackEvent } from './utils/logEvent';

function App() {
  const { loading, currentUser } = useAuth();
  const { withHeader, isSuccess } = usePage();
  const [searchParams] = useSearchParams();
  const accessWithLink = searchParams.get('trading_access') === accessConst.trading_access;

  useEffect(() => {
    if(searchParams.get('trading_access') === accessConst.trading_access) {
      localStorage.setItem('withLink', accessWithLink.toString());
    }
    if(currentUser) {
      trackEvent('user_id', currentUser?.uid);
    }
  }, []);

  if(loading) {
    return <Loader/>;
  }

  return (
    <div className={`${styles.container} ${withHeader ? '' : styles.blue} ${isSuccess ? styles.reset : ''}`}>
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
        <Route path={routes.signIn}   element={<React.Suspense>
          <SignIn/>
        </React.Suspense>}>
        </Route>
        <Route path={routes.getApp} element={<React.Suspense>
          <GetApp/>
        </React.Suspense>}>
        </Route>
        <Route path={routes.success} element={<React.Suspense>
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
