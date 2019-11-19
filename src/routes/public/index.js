import { lazy } from 'react';

const Home = {
  path: '/',
  component: lazy(function() {
    return import(/* webpackChunkName: "home" */ './HomeRoute');
  }),
};

const Login = {
  path: '/login',
  component: lazy(function() {
    return import(/* webpackChunkName: "login" */ './LoginRoute');
  }),
};

export default { Home, Login };
