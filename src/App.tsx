import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { SignIn, NotFound, Home, GetApp } from 'routes';
import { routes } from 'utils/constants';

function App() {

  return (
    <Routes>
      <Route path={routes.signIn}
        element={
          <React.Suspense>
            <SignIn/>
          </React.Suspense>
        }
      />
      <Route path={routes.home}
        element={
          <React.Suspense>
            <Home/>
          </React.Suspense>
        }
      />
      <Route path={routes.getApp}
        element={
          <React.Suspense>
            <GetApp/>
          </React.Suspense>
        }
      />
      <Route path={routes.notFound}
        element={
          <React.Suspense>
            <NotFound/>
          </React.Suspense>
        }
      />
    </Routes>
  );
}

export default App;
