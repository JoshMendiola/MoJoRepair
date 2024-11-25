// pages/SecureDashboard.js
import React from 'react';
import { navigationService } from '../navigation';

export default function SecureDashboard() {
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      
      if (response.ok) {
        navigationService.navigate('/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Security Demo Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      
      <div className="demo-grid">
        <div className="demo-card">
          <h2>SQL Injection Demo</h2>
          <p>Explore SQL injection vulnerabilities in a controlled environment</p>
          <a href="/sql-demo" data-link>Launch SQL Demo</a>
        </div>
        
        <div className="demo-card">
          <h2>XSS Demo</h2>
          <p>Test Cross-Site Scripting attacks safely</p>
          <a href="/xss-demo" data-link>Launch XSS Demo</a>
        </div>
      </div>
    </div>
  );
}