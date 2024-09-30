import { navigateTo } from './router.js';

export function initNavigation() {
  const header = document.getElementById('header');
  if (header) {
    header.innerHTML = `
      <nav>
        <div class="logo">MoJo Repairs</div>
        <ul>
          <li><a href="/" data-link>Home</a></li>
          <li><a href="/services" data-link>Services</a></li>
          <li><a href="/login" data-link>Login</a></li>
        </ul>
      </nav>
    `;
  }

  const footer = document.getElementById('footer');
  if (footer) {
    footer.innerHTML = `
      <p>&copy; ${new Date().getFullYear()} MoJo Repairs. All rights reserved.</p>
    `;
  }

  // Add click event listeners to navigation links
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(e.target.href);
    });
  });
}
