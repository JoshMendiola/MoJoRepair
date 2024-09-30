import router from './router.js';
import { initNavigation } from './navigation.js';
import { setupFormListeners } from './auth.js';

async function handleRouteChange() {
  await router();
  setupFormListeners();
}

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  handleRouteChange();
});

window.addEventListener('popstate', handleRouteChange);

document.addEventListener('click', e => {
  if (e.target.matches('a')) {
    e.preventDefault();
    history.pushState('', '', e.target.href);
    handleRouteChange();
  }
});
