import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../css/SecureDashboard.css';

const SecureDashboard: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Security Demo Dashboard</h1>
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </div>
      
      <div className="demo-grid">
        <div className="demo-card">
          <h2>SQL Injection Demo</h2>
          <p>Explore SQL injection vulnerabilities in a controlled environment</p>
          <Link to="/sql-demo" className="demo-link">Launch Demo</Link>
        </div>
        
        <div className="demo-card">
          <h2>XSS Demo</h2>
          <p>Test Cross-Site Scripting attacks safely</p>
          <Link to="/xss-demo" className="demo-link">Launch Demo</Link>
        </div>
      </div>
    </div>
  );
};

export default SecureDashboard;