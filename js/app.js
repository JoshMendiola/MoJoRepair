import router from './router.js';
import { initNavigation } from './navigation.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  router();
});

window.addEventListener('popstate', router);
document.addEventListener('click', e => {
  if (e.target.matches('a')) {
    e.preventDefault();
    history.pushState('', '', e.target.href);
    router();
  }
});
