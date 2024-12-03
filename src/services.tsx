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
    image: new URL('/images/plumbing.jpg', import.meta.url).href
  },
  {
    title: 'Electrical Work',
    description: 'Safe and efficient electrical repairs and installations.',
    price: '$110/hour',
    image: new URL('/images/electrical.jpg', import.meta.url).href
  },
  {
    title: 'Carpentry',
    description: 'Custom woodwork and repairs for your home.',
    price: '$85/hour',
    image: new URL('/images/carpentry.jpg', import.meta.url).href
  },
  {
    title: 'Painting',
    description: 'Transform your space with our professional painting services.',
    price: '$80/hour',
    image: new URL('/images/painting.jpg', import.meta.url).href
  },
  {
    title: 'HVAC',
    description: 'Heating, ventilation, and air conditioning solutions.',
    price: '$120/hour',
    image: new URL('/images/hvac.jpg', import.meta.url).href
  },
  {
    title: 'Automobile Maintenance',
    description: 'Keep your vehicle running smoothly with our expert care.',
    price: '$150/hour',
    image: new URL('/images/auto.jpg', import.meta.url).href
  }
];