import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      // Optionally fetch user data here if needed
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'token') {
        if (e.newValue === null) {
          logout();
        } else {
          setToken(e.newValue);
          // Optionally re-fetch user data or trigger a re-render/fetch in consumers
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = (newToken, newUser, remember = false) => {
    setToken(newToken);
    setUser(newUser);
    if (remember) {
      localStorage.setItem('token', newToken);
      sessionStorage.removeItem('token'); // Clean up if switching
    } else {
      sessionStorage.setItem('token', newToken);
      localStorage.removeItem('token');
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};