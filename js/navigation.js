// js/navigation.js
export function initNavigation() {
  const header = document.getElementById('header');
  if (header) {
    header.innerHTML = `
      <nav>
        <div class="logo">MoJo Repairs</div>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/login">Login</a></li>
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
}
