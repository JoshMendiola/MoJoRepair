import Home from './pages/home.js';
import Services from './pages/services.js';
import Login from './pages/login.js';

const routes = {
  '/': Home,
  '/services': Services,
  '/login': Login,
};

export default async function router() {
  const path = window.location.pathname;
  const page = routes[path] || routes['/'];
  document.querySelector('#app').innerHTML = await page();

  // Update the navigation state
  updateNavigation(path);
}

function updateNavigation(path) {
  const links = document.querySelectorAll('nav a');
  links.forEach(link => {
    if (link.getAttribute('href') === path) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Add this function to handle navigation
export function navigateTo(url) {
  history.pushState(null, null, url);
  router();
}
