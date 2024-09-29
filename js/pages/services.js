import { loadServices } from '../services.js';

export default function Services() {
  return `
    <section id="services">
      <h2>Our Services</h2>
      ${loadServices()}
    </section>
  `;
}
