import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const INITIAL_STATE = {
  username: null,
  isLoggedIn: false,
};

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : INITIAL_STATE,
  );

  function handleLogout() {
    setUser(INITIAL_STATE);
  }

  function handleLogin(username) {
    setUser({ username, isLoggedIn: true });
  }

  useEffect(
    function() {
      const dataToStore = JSON.stringify(user);

      localStorage.setItem('user', dataToStore);
    },
    [user],
  );

  return (
    <AuthContext.Provider value={{ ...user, handleLogout, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
}
