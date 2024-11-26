import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../../css/Header.css';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header id="header">
      <nav>
        <div className="logo">MoJo Repairs</div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services">Services</Link></li>
          {isAuthenticated && <li><button onClick={logout}>Logout</button></li>}
        </ul>
      </nav>
    </header>
  );
};

export default Header;