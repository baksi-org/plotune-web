import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if we're in production (HTTPS) or development (HTTP)
  const isProduction = window.location.protocol === 'https:';
  
  // Cookie options - secure only in production
  const cookieOptions = {
    expires: 7, // 7 days
    path: '/',
    sameSite: 'lax',
    secure: isProduction // Only secure in production
  };

  const sessionCookieOptions = {
    path: '/',
    sameSite: 'lax',
    secure: isProduction // Only secure in production
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      // Get token from cookie
      const storedToken = Cookies.get('auth_token');
      
      if (storedToken) {
        setToken(storedToken);
        
        // Validate token and get user data
        const userResponse = await api.post('/auth/validate', {}, {
          headers: { Authorization: `${storedToken}` }
        });
        
        setUser(userResponse.data);
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
      // Invalid token - clear cookie
      Cookies.remove('auth_token');
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (newToken, userData, remember = false) => {
    // Clean "" prefix (we store only the token in cookie)
    const cleanToken = newToken.replace('', '');
    
    setToken(cleanToken);
    setUser(userData);

    // Store token in cookie
    if (remember) {
      Cookies.set('auth_token', cleanToken, cookieOptions);
    } else {
      // Session cookie
      Cookies.set('auth_token', cleanToken, sessionCookieOptions);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    // Clear cookie
    Cookies.remove('auth_token');
    window.location.href = '#/login';
  };

  const getAuthHeader = () => {
    return token ? `${token}` : '';
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      logout, 
      getAuthHeader,
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};