console.log('app.js is being loaded');

import router from './router.js';
import { initNavigation } from './navigation.js';

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
    history.pushState(null, null, e.target.href);
    handleRouteChange();
  }
});
