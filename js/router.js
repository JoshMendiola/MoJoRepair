import Home from './pages/home.js';
import Services from './pages/services.js';
import Login from './pages/login.js';

const routes = {
  '/': Home,
  '/services': Services,
  '/admin': Login,
};

export default async function router() {
  const path = window.location.pathname;
  console.log('Current path:', path);  // Debugging line
  const page = routes[path] || routes['/'];
  if (!page) {
    console.error('No page found for path:', path);  // Debugging line
    return;
  }
  try {
    const content = await page();
    console.log('Page content:', content);  // Debugging line
    document.querySelector('#app').innerHTML = content;
    updateNavigation(path);
  } catch (error) {
    console.error('Error rendering page:', error);  // Debugging line
  }
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

export function navigateTo(url) {
  history.pushState(null, null, url);
  return router();
}

// Initialize router
window.addEventListener('popstate', router);
document.addEventListener('DOMContentLoaded', router);
