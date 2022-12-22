import { Navigate, useLocation } from 'react-router-dom';
import React, { ReactElement } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { routes } from 'utils/constants';

interface Props {
  children: ReactElement
}

export const PrivateRoute = ({ children }: Props) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to={routes.signIn} replace state={{ path: location.pathname }}/>;
  }
  return  children;
};
