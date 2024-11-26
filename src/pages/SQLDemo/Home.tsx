import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/SQLDemo.css';

const SQLDemoHome = () => {
  return (
    <div className="demo-home">
      <h1>MoJo Repair Services</h1>
      <p>Welcome to our repair service platform!</p>
      <nav>
        <Link to="/sql-demo/services">Services</Link>
        <Link to="/sql-demo/admin">Admin Login</Link>
      </nav>
    </div>
  );
};

export default SQLDemoHome;
