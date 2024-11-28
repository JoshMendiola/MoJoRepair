import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/SQLDemo.css';

const XSSDemoHome = () => {
  return (
    <div className="demo-home">
      <h1>MoJo Chat</h1>
      <p>Welcome to our messaging and chatting service!</p>
      <nav>
        <Link to="/xss-demo/message-board">Message Board</Link>
      </nav>
    </div>
  );
};

export default XSSDemoHome;
