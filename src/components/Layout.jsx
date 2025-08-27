import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Layout({ children }) {
  const { authData, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redireciona para o login após sair
  };

  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="header-content">
          <span className="header-title">Help Desk</span>
          {authData && (
            <div className="header-user-info">
              <span>{authData.userEmail}</span>
              <button onClick={handleLogout} className="logout-button">Sair</button>
            </div>
          )}
        </div>
      </header>
      <main className="app-content">
        {children}
      </main>
    </div>
  );
}

export default Layout;