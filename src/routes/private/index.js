import { lazy } from 'react';

const Profile = {
  path: '/profile',
  component: lazy(function() {
    return import(/* webpackChunkName: "profile" */ './ProfileRoute');
  }),
};

const Dashboard = {
  path: '/dashboard',
  component: lazy(function() {
    return import(/* webpackChunkName: "dashboard" */ './DashboardRoute');
  }),
};

const User = {
  path: '/user',
  component: lazy(function() {
    return import(/* webpackChunkName: "user" */ './UserRoute');
  }),
};

export default { User, Profile, Dashboard };
