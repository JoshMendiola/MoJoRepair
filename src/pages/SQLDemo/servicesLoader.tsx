import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { services } from '../../services';
import '../../../css/Services.css';

const ServicesLoader: React.FC = () => {
  const navigate = useNavigate();

  const handleServiceClick = (serviceId: string) => {
    navigate(`/service/${serviceId}`);
  };

  return (
    <section id="services">
      <h2>Our Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="service-card"
            onClick={() => handleServiceClick(service.title.toLowerCase().replace(' ', '-'))}
          >
            <img src={service.image} alt={service.title} />
            <div className="service-info">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <p className="service-price">{service.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesLoader;