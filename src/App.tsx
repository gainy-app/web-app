import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import { PrivateRoute, Loader } from 'components';
import { Home, NotFound, SignIn, GetApp } from 'routes';
import { routes } from 'utils/constants';

function App() {
  const {loading } = useAuth();

  if(loading) {
    return <Loader/>;
  }

  return (
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
        <PrivateRoute>
          <GetApp/>
        </PrivateRoute>
      </React.Suspense>}>
      </Route>
      <Route path={routes.notFound}
        element={
          <React.Suspense>
            <NotFound/>
          </React.Suspense>
        }/>
    </Routes>
  );
}

export default App;
