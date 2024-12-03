import React from 'react';
import { Link } from 'react-router-dom';
import '../css/SecureDashboard.css';

interface DemoCard {
  title: string;
  description: string;
  route: string;
  image: string;
}

const demoCards: DemoCard[] = [
  {
    title: 'SQL Injection Demo',
    description: 'Explore SQL injection vulnerabilities in a controlled environment',
    route: '/sql-demo',
    image: require('../assets/images/SQLimage.jpg')
  },
  {
    title: 'XSS Demo',
    description: 'Test Cross-Site Scripting attacks safely',
    route: '/xss-demo',
    image: require('../assets/images/XSSimage.jpg')
  }
];

const SecureDashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Security Demo Dashboard</h1>
      </div>

      <div className="demo-grid">
        {demoCards.map((card, index) => (
          <div key={index} className="demo-card">
            <div className="demo-card-image">
              <img src={card.image} alt={`${card.title} Visualization`} />
            </div>
            <div className="demo-card-content">
              <h2>{card.title}</h2>
              <p>{card.description}</p>
              <Link to={card.route} className="demo-link">Launch Demo</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecureDashboard;