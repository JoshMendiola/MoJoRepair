import React from 'react';

export default function SQLDemoHome() {
  return (
    <div className="demo-home">
      <h1>MoJo Repair Services</h1>
      <p>Welcome to our repair service platform!</p>
      <nav>
        <a href="/sql-demo/services" data-link>Services</a>
        <a href="/sql-demo/admin" data-link>Admin Login</a>
      </nav>
    </div>
  );
}