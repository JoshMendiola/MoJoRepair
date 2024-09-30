import { loadAboutUs, loadServicesPreview } from '../services.js';
import { navigationService } from '../navigation.js';

export default function Home() {
  setTimeout(() => {
    const servicesLink = document.querySelector('.services-preview a');
    if (servicesLink) {
      servicesLink.addEventListener('click', (e) => {
        e.preventDefault();
        navigationService.navigate('/services');
      });
    }
  }, 0);

  return `
    <section id="hero">
      <h1>Welcome to MoJo Repairs</h1>
      <p>Your go-to guys for all household repairs</p>
    </section>
    ${loadAboutUs()}
    <div class="services-preview">
      ${loadServicesPreview()}
      <a href="/services" class="btn">View All Services</a>
    </div>
  `;
}
