import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children }) {
  const { authData, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }
  
  if (!authData) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;