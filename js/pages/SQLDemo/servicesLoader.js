import { loadServices } from '../../services.js';
import { navigationService } from '../../navigation.js';

export default function Services() {
  setTimeout(() => {
    const serviceLinks = document.querySelectorAll('.service-item a');
    serviceLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const serviceId = link.getAttribute('data-service-id');
        navigationService.navigate(`/service/${serviceId}`);
      });
    });
  }, 0);

  return `
    <section id="services">
      <h2>Our Services</h2>
      ${loadServices()}
    </section>
  `;
}
