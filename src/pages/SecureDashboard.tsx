import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/SecureDashboard.css';

interface DemoCard {
  title: string;
  description: string;
  route: string;
  image: string;
  buttonText: string;
}

const demoCards: DemoCard[] = [
  {
    title: 'SQL Injection Demo',
    description: 'Explore SQL injection vulnerabilities in a controlled environment',
    route: '/sql-demo',
    image: require('../assets/images/SQLimage.jpg'),
    buttonText: 'Launch Demo'
  },
  {
    title: 'XSS Demo',
    description: 'Test Cross-Site Scripting attacks safely',
    route: '/xss-demo',
    image: require('../assets/images/XSSimage.jpg'),
    buttonText: 'Launch Demo'
  },
  {
    title: 'File Upload Demo',
    description: 'Test file upload vulnerabilities and bypasses in a secure environment',
    route: '/fu-demo',
    image: require('../assets/images/FileUpload.webp'),
    buttonText: 'Launch Demo'
  }
];

const SecureDashboard: React.FC = () => {
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);
  const [displayText, setDisplayText] = useState<string>('Launch Demo');
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

  const startCipherEffect = (index: number) => {
    setHoveredButton(index);
    let iteration = 0;
    const originalText = demoCards[index].buttonText;
    // const totalIterations = 10; // Number of scrambles before settling

    const interval = setInterval(() => {
      setDisplayText(
        originalText
          .split("")
          .map((char, idx) => {
            if (idx < iteration) return originalText[idx];
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      if (iteration >= originalText.length) {
        clearInterval(interval);
        setDisplayText(originalText);
      }

      iteration += 1/3; // Slow down the reveal
    }, 30);
  };

  const stopCipherEffect = () => {
    setHoveredButton(null);
    setDisplayText('Launch Demo');
  };

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
              <Link
                to={card.route}
                className="demo-link"
                onMouseEnter={() => startCipherEffect(index)}
                onMouseLeave={stopCipherEffect}
              >
                {hoveredButton === index ? displayText : card.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecureDashboard;
