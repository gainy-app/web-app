import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';
import { useAuth } from 'contexts/AuthContext';
import { routes } from 'utils/constants';

export const PrivateRoute = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const token = localStorage.getItem('token');

  //@ts-ignore
  if (currentUser?.accessToken !== token) {
    return <Navigate to={routes.signIn} replace state={{ path: location.pathname }}/>;
  }
  return  <Navigate to={routes.getApp} replace state={{ path: location.pathname }}/> ;
};
