import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import RedirectToHome from './RedirectToHome';
import { Route } from 'react-router-dom';

export default function PrivateRoute(props) {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <RedirectToHome />;
  }

  return <Route {...props} />;
}
