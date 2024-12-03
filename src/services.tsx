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
    image: '/images/plumbing.jpg'  // Remove 'public' from path
  },
  {
    title: 'Electrical Work',
    description: 'Safe and efficient electrical repairs and installations.',
    price: '$110/hour',
    image: '/images/electrical.jpg'
  },
  {
    title: 'Carpentry',
    description: 'Custom woodwork and repairs for your home.',
    price: '$85/hour',
    image: '/images/carpentry.jpg'
  },
  {
    title: 'Painting',
    description: 'Transform your space with our professional painting services.',
    price: '$80/hour',
    image: '/images/painting.jpg'
  },
  {
    title: 'HVAC',
    description: 'Heating, ventilation, and air conditioning solutions.',
    price: '$120/hour',
    image: '/images/hvac.jpg'
  },
  {
    title: 'Automobile Maintenance',
    description: 'Keep your vehicle running smoothly with our expert care.',
    price: '$150/hour',
    image: '/images/auto.jpg'
  }
];