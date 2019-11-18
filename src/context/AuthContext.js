import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const INITIAL_STATE = {
  username: null,
  isLoggedIn: false,
};

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(INITIAL_STATE);

  function handleLogout() {
    setUser(INITIAL_STATE);
  }

  function handleLogin(username) {
    setUser({ username, isLoggedIn: true });
  }

  return (
    <AuthContext.Provider value={{ ...user, handleLogout, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
}
