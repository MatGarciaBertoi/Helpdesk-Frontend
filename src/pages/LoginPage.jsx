import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/LoginForm';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (email, password) => {
    const success = await login(email, password); 
    if (success) {
      console.log('Login bem-sucedido, redirecionando...');
      navigate('/dashboard');
    } else {
      alert('Falha no login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-box">
        <h1>Bem-vindo ao Help Desk</h1>
        <p>Por favor, faça o login para continuar.</p>
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
}

export default LoginPage;