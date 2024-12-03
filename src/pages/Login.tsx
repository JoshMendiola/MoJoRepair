import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import '../css/Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const success = await login(username, password);
      if (!success) {
        setError('Invalid username or password');
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 650);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 650);
      console.error('Login error:', err);
    }
  };

  return (
    <section id="login">
      <div className={`form-container ${isShaking ? 'shake' : ''}`}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn-login">
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;