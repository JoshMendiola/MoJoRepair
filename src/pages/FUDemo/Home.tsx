import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/FUDemo.css';

const FUDemoHome = () => {
  return (
    <div className="demo-home">
      <h1>MoJo File Share</h1>
      <p>Welcome to our file sharing service!</p>
      <nav>
        <Link to="/fu-demo/upload">File Upload</Link>
      </nav>
    </div>
  );
};

export default FUDemoHome;
