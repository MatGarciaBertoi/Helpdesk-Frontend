import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';

const AuthContext = createContext();

let requestInterceptor = null;

export function AuthProvider({ children }) {
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    setAuthData(null);
    localStorage.removeItem('authData');
    if (requestInterceptor !== null) {
      axios.interceptors.request.eject(requestInterceptor);
      requestInterceptor = null;
    }
  }, []);

  useEffect(() => {
    const storedAuth = localStorage.getItem('authData');
    if (storedAuth) {
      setAuthData(JSON.parse(storedAuth));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authData) {
      requestInterceptor = axios.interceptors.request.use((config) => {
        config.headers['Authorization'] = `Basic ${authData.token}`;
        return config;
      });

      const responseInterceptor = axios.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error.response && error.response.status === 401) {
            logout();
          }
          return Promise.reject(error);
        }
      );

      return () => {
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.response.eject(responseInterceptor);
      };
    }
  }, [authData, logout]);

  const login = useCallback(async (email, password) => {
    const token = Buffer.from(`${email}:${password}`, 'utf8').toString('base64');
    try {
      const userResponse = await axios.get('/usuarios/me', {
        headers: { 'Authorization': `Basic ${token}` }
      });
      
      const newAuthData = { token, user: userResponse.data };
      localStorage.setItem('authData', JSON.stringify(newAuthData));
      setAuthData(newAuthData);
      
      return userResponse.data;
    } catch (error) {
      console.error("Falha na autenticação", error);
      return null;
    }
  }, []);

  const value = { authData, login, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line
export function useAuth() {
  return useContext(AuthContext);
}