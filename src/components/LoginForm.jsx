import React, { useState } from 'react';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input 
          id="email"
          type="email" 
          placeholder='seu@email.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="password">Senha:</label>
        <input 
          id="password"
          type="password"
          placeholder='Sua senha'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <button type="submit" className="login-button">
        Entrar
      </button>
    </form>
  );
}

export default LoginForm;