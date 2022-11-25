import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from 'contexts/AuthContext';
import React, { ReactElement } from 'react';

interface Props {
  children: ReactElement<ReactElement>
}

export const PrivateRoute = ({ children }: Props) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/sign-in" replace state={{ path: location.pathname }}/>;
  }

  return children;
};