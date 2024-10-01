export const navigationService = {
  navigate: (url) => {
    history.pushState(null, null, url);
    dispatchEvent(new PopStateEvent('popstate'));
  },

  initNavigation: () => {
    const header = document.getElementById('header');
    if (header) {
      header.innerHTML = `
        <nav>
          <div class="logo">MoJo Repairs</div>
          <ul>
            <li><a href="/" data-link>Home</a></li>
            <li><a href="/services" data-link>Services</a></li>
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
};
