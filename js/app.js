console.log('app.js is being loaded');

import router from './router.js';
import { initNavigation } from './navigation.js';

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
  const link = e.target.closest('a');
  if (link && link.getAttribute('data-link') !== null) {
    e.preventDefault();
    const href = link.getAttribute('href');
    history.pushState(null, null, href);
    handleRouteChange();
  }
});
