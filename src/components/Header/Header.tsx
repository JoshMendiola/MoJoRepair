import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../css/Header.css';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === '/' || location.pathname === '/login') {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header id="header">
      <nav>
        <div className="logo">MoJo Repairs</div>
        <ul>
          <li><Link className="nav-link" to="/dashboard">Demo Menu</Link></li>
          <li><Link className="nav-link" to="/sql-demo">SQL Demo</Link></li>
          <li><Link className="nav-link" to="/xss-demo">XSS Demo</Link></li>
          <li><Link className="nav-link" to="/fu-demo">File Upload Demo</Link></li>
          {isAuthenticated && (
            <li>
              <Link className="nav-link" to="#" onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}>
                Logout
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
