import router from './router.js';
import { initNavigation } from './navigation.js';
import * as authService from './auth.js';
import * as services from './services.js';

// Your existing app.js code here
console.log('app.js is being loaded');

async function handleRouteChange() {
  console.log('handleRouteChange called');
  await router();
  initNavigation();
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event in app.js');
  handleRouteChange();
});

window.addEventListener('popstate', handleRouteChange);

document.addEventListener('click', e => {
  if (e.target.matches('[data-link]')) {
    e.preventDefault();
    history.pushState(null, null, e.target.href);
    handleRouteChange();
  }
});

// Make services available globally if needed
window.authService = authService;
window.services = services;
