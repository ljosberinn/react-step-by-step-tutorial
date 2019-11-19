import React, { useContext, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Route,
} from 'react-router-dom';
import PUBLIC_ROUTES from './routes/public';
import PRIVATE_ROUTES from './routes/private';
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
              <NavLink
                to={
                  isLoggedIn
                    ? PRIVATE_ROUTES.Dashboard.path
                    : PUBLIC_ROUTES.Home.path
                }
              >
                {isLoggedIn ? 'Dashboard' : 'Home'}
              </NavLink>
            </li>

            {isLoggedIn ? (
              <>
                <li>
                  <NavLink to={PRIVATE_ROUTES.User.path}>User</NavLink>
                </li>
                <li>
                  <NavLink to={PRIVATE_ROUTES.Profile.path}>Profile</NavLink>
                </li>
                <li>
                  <button onClick={handleLogout} type="button">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <NavLink to={PUBLIC_ROUTES.Login.path}>Login</NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <main>
        <Switch>
          <Suspense fallback={null}>
            {Object.values(PUBLIC_ROUTES).map(function({ path, component }) {
              return (
                <Route path={path} component={component} exact key={path} />
              );
            })}

            {Object.values(PRIVATE_ROUTES).map(function({ path, component }) {
              return (
                <PrivateRoute
                  path={path}
                  component={component}
                  exact
                  key={path}
                />
              );
            })}
            <Route component={RedirectToHome} />
          </Suspense>
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}
