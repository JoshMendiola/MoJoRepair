import router, { navigateTo } from './router.js';
import { initNavigation } from './navigation.js';
import * as authService from './auth.js';
import * as services from './services.js';

console.log('app.js is being loaded');

async function handleRouteChange() {
  console.log('handleRouteChange called');
  await router();
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event in app.js');
  initNavigation();
  handleRouteChange();
});

window.addEventListener('popstate', handleRouteChange);

document.addEventListener('click', e => {
  if (e.target.matches('[data-link]')) {
    e.preventDefault();
    navigateTo(e.target.href);
  }
});

// Make services available globally if needed
window.authService = authService;
window.services = services;
