import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Este componente vai "envelopar" as páginas que queremos proteger
function ProtectedRoute({ children }) {
  const { authData, loading } = useAuth();

  // Se ainda estivermos verificando o localStorage, não mostre nada
  if (loading) {
    return <div>Carregando...</div>;
  }
  
  // Se terminou de carregar e NÃO HÁ dados de autenticação,
  // redireciona o usuário para a página de login
  if (!authData) {
    return <Navigate to="/login" />;
  }

  // Se está tudo certo, mostra a página que ele tentou acessar (o "children")
  return children;
}

export default ProtectedRoute;