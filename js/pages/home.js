import { loadAboutUs, loadServicesPreview } from '../services.js';

export default function Home() {
  return `
    <section id="hero">
      <h1>Welcome to MoJo Repairs</h1>
      <p>Your go-to guys for all household repairs</p>
    </section>
    ${loadAboutUs()}
    ${loadServicesPreview()}
  `;
}
