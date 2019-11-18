import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Route,
} from 'react-router-dom';
import { HomeRoute, LoginRoute } from './routes/public';
import { ProfileRoute, DashboardRoute } from './routes/private';
import RedirectToHome from './routes/RedirectToHome';
import { AuthContext } from './context/AuthContext';

export default function App() {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <NavLink to='/profile'>Profile</NavLink>
              </li>
              <li>
                <button onClick={handleLogout} type='button'>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <NavLink to='/login'>Login</NavLink>
            </li>
          )}
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
