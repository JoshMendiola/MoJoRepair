import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../css/Header.css';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  
  // Don't render header on home or login pages
  if (location.pathname === '/' || location.pathname === '/login') {
    return null;
  }

  return (
    <header id="header">
      <nav>
        <div className="logo">MoJo Repairs</div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><a href="http://147.182.176.235/dashboard">Menu</a></li>
          {isAuthenticated && (
            <li><button onClick={logout}>Logout</button></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;