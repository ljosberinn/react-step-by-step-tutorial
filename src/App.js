import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Route,
} from 'react-router-dom';
import { HomeRoute, LoginRoute } from './routes/public';
import { ProfileRoute, DashboardRoute, UserRoute } from './routes/private';
import RedirectToHome from './routes/RedirectToHome';
import PrivateRoute from './routes/PrivateRoute';
import { AuthContext } from './context/AuthContext';
import { Footer } from './components';

export default function App() {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);

  return (
    <Router>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to='/'>{isLoggedIn ? 'Dashboard' : 'Home'}</NavLink>
            </li>

            {isLoggedIn ? (
              <>
                <li>
                  <NavLink to='/user'>User</NavLink>
                </li>
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
      </header>
      <main>
        <Switch>
          <Route
            path='/'
            exact
            component={isLoggedIn ? DashboardRoute : HomeRoute}
          />
          <Route path='/login' exact component={LoginRoute} />

          <PrivateRoute path='/user' exact component={UserRoute} />
          <PrivateRoute path='/profile' exact component={ProfileRoute} />

          <Route component={RedirectToHome} />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}
