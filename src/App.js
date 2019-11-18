import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Redirect,
  Route,
} from 'react-router-dom';
import { HomeRoute, LoginRoute } from './routes/public';
import { ProfileRoute, DashboardRoute } from './routes/private';

function RedirectToHome() {
  return <Redirect to='/' />;
}

export default function App() {
  const isLoggedIn = false;

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/profile'>Profile</NavLink>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route
          path='/'
          exact
          component={isLoggedIn ? DashboardRoute : HomeRoute}
        />
        <Route path='/login' exact component={LoginRoute} />
        <Route path='/profile' exact component={ProfileRoute} />
        <Route component={RedirectToHome} />
      </Switch>
    </Router>
  );
}
