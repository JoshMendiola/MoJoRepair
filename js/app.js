import router from './router.js';
import { navigationService } from './navigation.js';
import * as authService from './auth.js';
import * as services from './services.js';

console.log('app.js is being loaded');

async function handleRouteChange() {
  console.log('handleRouteChange called');
  await router();
}

function initApp() {
  console.log('Initializing app');
  navigationService.initNavigation();
  handleRouteChange();

  window.addEventListener('popstate', handleRouteChange);

  document.addEventListener('click', e => {
    const link = e.target.closest('a');
    if (link && link.getAttribute('data-link') !== null) {
      e.preventDefault();
      navigationService.navigate(link.href);
    }
  });
}

document.addEventListener('DOMContentLoaded', initApp);

// Make services available globally
window.authService = authService;
window.services = services;
window.navigationService = navigationService;
