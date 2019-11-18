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

  return (
    <AuthContext.Provider value={{ ...user, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}
