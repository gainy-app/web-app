import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {SignIn} from 'routes';
import {routes} from 'utils/constants';

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
    </Routes>
  );
}

export default App;
