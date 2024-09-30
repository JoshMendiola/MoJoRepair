import Home from './pages/home.js';
import Services from './pages/services.js';
import Login from './pages/login.js';
import { navigationService } from './navigation.js';

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

// This function is now part of the navigationService
export function navigateTo(url) {
  navigationService.navigate(url);
}
