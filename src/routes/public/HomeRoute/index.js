import React, { useContext } from 'react';
import Helmet from 'react-helmet';
import { AuthContext } from '../../../context/AuthContext';
import PRIVATE_ROUTES from '../../../routes/private';
import { Redirect } from 'react-router-dom';

export default function HomeRoute() {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return <Redirect to={PRIVATE_ROUTES.Dashboard.path} />;
  }

  return (
    <>
      <Helmet>
        <title>Landing Page</title>
      </Helmet>
      <h1>Page</h1>
    </>
  );
}
