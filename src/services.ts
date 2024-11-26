export interface Service {
  title: string;
  description: string;
  price: string;
  image: string;
}

export const services: Service[] = [
  {
    title: 'Plumbing Repairs',
    description: 'Expert solutions for all your plumbing needs.',
    price: '$95/hour',
    image: '../images/plumbing.jpg'
  },
  {
    title: 'Electrical Work',
    description: 'Safe and efficient electrical repairs and installations.',
    price: '$110/hour',
    image: '../images/electrical.jpg'
  },
  {
    title: 'Carpentry',
    description: 'Custom woodwork and repairs for your home.',
    price: '$85/hour',
    image: '../images/carpentry.jpg'
  },
  {
    title: 'Painting',
    description: 'Transform your space with our professional painting services.',
    price: '$80/hour',
    image: '../images/painting.jpg'
  },
  {
    title: 'HVAC',
    description: 'Heating, ventilation, and air conditioning solutions.',
    price: '$120/hour',
    image: '../images/hvac.jpg'
  },
  {
    title: 'Automobile Maintenance',
    description: 'Keep your vehicle running smoothly with our expert care.',
    price: '$150/hour',
    image: '../images/auto.jpg'
  }
];

export const loadServices = (): string => {
  return `
    <div class="services-container">
      ${services.map(createServiceCard).join('')}
    </div>
  `;
};

export const loadServicesPreview = (): string => {
  return `
    <section id="services-preview">
      <h2>Our Services</h2>
      <ul>
        ${services.slice(0, 5).map(service => `<li>${service.title}</li>`).join('')}
      </ul>
    </section>
  `;
};

export const loadAboutUs = (): string => {
  return `
    <section id="about-us">
      <div class="container">
        <img src="images/mojo-team.jpg" alt="MoJo Repairs Team" class="team-image">
        <div class="about-content">
          <h2>About Us</h2>
          <p>We're two skilled handymen ready to tackle any household repair job. From leaky faucets to broken furniture, we've got you covered. With years of experience and a passion for problem-solving, we ensure your home stays in top shape.</p>
        </div>
      </div>
    </section>
  `;
};

function createServiceCard(service: Service): string {
  return `
    <div class="service-card">
      <img src="${service.image}" alt="${service.title}">
      <div class="service-info">
        <h3>${service.title}</h3>
        <p>${service.description}</p>
        <p class="service-price">${service.price}</p>
      </div>
    </div>
  `;
}