import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '../services/api';

export const AuthContext = createContext();

const normalizeToken = (token) => {
  if (!token) return null;
  let t = String(token).trim();
  // remove wrapping quotes
  t = t.replace(/^"|"$/g, '');
  // remove optional Bearer prefix
  t = t.replace(/^Bearer\s+/i, '');
  return t || null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isProduction = window.location.protocol === 'https:';
  const cookieOptions = {
    expires: 7,
    path: '/',
    sameSite: 'lax',
    secure: isProduction,
  };
  const sessionCookieOptions = {
    path: '/',
    sameSite: 'lax',
    secure: isProduction,
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const storedToken = Cookies.get('auth_token');
      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      const clean = normalizeToken(storedToken);
      if (!clean) {
        Cookies.remove('auth_token');
        setIsLoading(false);
        return;
      }

      // lokal state ve axios default header set et
      setToken(clean);
      api.defaults.headers.common['Authorization'] = `Bearer ${clean}`;

      // profile endpoint'i çağır — cache booster ile
      const profileResp = await api.get('/profile', {
        headers: {
          Authorization: `Bearer ${clean}`,
          'Cache-Control': 'no-cache',
        },
        params: { cache_buster: Date.now() },
      });

      // profile endpoint'ten dönen obje şu direktife uygun:
      // { user_id, username, email, full_name, ... }
      setUser(profileResp.data);
    } catch (error) {
      console.error('Auth initialization failed:', error.response?.status, error.response?.data || error.message);
      Cookies.remove('auth_token');
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (newToken, userData, remember = false) => {
    const cleanToken = normalizeToken(newToken);
    if (!cleanToken) return;

    setToken(cleanToken);
    setUser(userData || null);

    // axios default header
    api.defaults.headers.common['Authorization'] = `Bearer ${cleanToken}`;

    if (remember) {
      Cookies.set('auth_token', cleanToken, cookieOptions);
    } else {
      Cookies.set('auth_token', cleanToken, sessionCookieOptions);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
    Cookies.remove('auth_token');
    window.location.href = '#/login';
  };

  const getAuthHeader = () => (token ? `Bearer ${token}` : '');

  // ÖNEMLİ: isLoading true iken children render etmiyoruz — böylece race condition engellenir.
  // İsterseniz burada spinner gösterebilirsiniz.
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        getAuthHeader,
        isLoading,
      }}
    >
      {isLoading ? null : children}
    </AuthContext.Provider>
  );
};
