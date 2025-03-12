import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/VulnerableLogin.css';

const VulnerableLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://147.182.176.235/api/sql-demo/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      });

      if (response.status === 403) {
        setError('Request Blocked by Snoopy');
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 650);
        return;
      }

      const data = await response.json();

      if (response.ok) {
        navigate('/sql-demo/employee-dashboard');
      } else {
        setError(data.message || 'Login failed');
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 650);
      }
    } catch (err) {
      setError('An error occurred');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 650);
      console.error('Login error:', err);
    }
  };

  return (
    <div className={`login-container ${isShaking ? 'shake' : ''}`}>
      <h2>SQL Injection Demo Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default VulnerableLogin;
