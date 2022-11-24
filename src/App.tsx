import React from 'react';
import {Route, Routes} from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import { PrivateRoute, Loader } from 'components';
import { Home, NotFound, SignIn, GetApp } from 'routes';
import { routes } from 'utils/constants';
import styles from './components/layout/layout.module.scss';
import {usePage} from 'hooks';

function App() {
  const {loading } = useAuth();
  const {withHeader} = usePage();

  if(loading) {
    return <Loader/>;
  }

  return (
    <div className={`${styles.container} ${withHeader ? '' : styles.blue}`}>
      <Routes>
        <Route path={routes.home} element={
          <PrivateRoute>
            <Home/>
          </PrivateRoute>
        }/>
        <Route path={routes.signIn}   element={<React.Suspense>
          <SignIn/>
        </React.Suspense>}>
        </Route>
        <Route path={routes.getApp} element={<React.Suspense>
          <GetApp/>
        </React.Suspense>}>
        </Route>
        <Route path={routes.notFound}
          element={
            <React.Suspense>
              <NotFound/>
            </React.Suspense>
          }/>
      </Routes>
    </div>
  );
}

export default App;
