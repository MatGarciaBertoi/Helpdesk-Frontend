import React, { createContext, useState, useContext, useEffect, useCallback } from 'react'; // 1. Importe o useCallback
import axios from 'axios';
import { Buffer } from 'buffer';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAuth = localStorage.getItem('authData');
    if (storedAuth) {
      setAuthData(JSON.parse(storedAuth));
    }
    setLoading(false);
  }, []);

  // 2. Envelopamos a função 'logout' com useCallback
  const logout = useCallback(() => {
    setAuthData(null);
    localStorage.removeItem('authData');
  }, []); // O array vazio [] significa que esta função nunca precisa ser recriada

  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      (config) => {
        const storedAuth = localStorage.getItem('authData');
        if (storedAuth) {
          const parsedAuth = JSON.parse(storedAuth);
          config.headers['Authorization'] = `Basic ${parsedAuth.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    
    // Adicionamos um interceptor de RESPOSTA para deslogar em caso de erro 401
    const responseInterceptor = axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                logout(); // Usa a função de logout se o token for inválido
            }
            return Promise.reject(error);
        }
    );

    return () => {
      axios.interceptors.request.eject(interceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [authData, logout]); // Agora 'logout' é estável e não causa loop

  // 3. Envelopamos a função 'login' com useCallback também (boa prática)
  const login = useCallback(async (email, password) => {
    try {
      const token = Buffer.from(`${email}:${password}`, 'utf8').toString('base64');
      
      await axios.get('/tickets', {
        headers: {
          'Authorization': `Basic ${token}`
        }
      });
      
      const newAuthData = { token, userEmail: email };
      localStorage.setItem('authData', JSON.stringify(newAuthData));
      setAuthData(newAuthData);
      
      return true;

    } catch (error) {
      console.error("Falha na autenticação", error);
      return false;
    }
  }, []); // Array vazio, pois a função não depende de props ou state

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