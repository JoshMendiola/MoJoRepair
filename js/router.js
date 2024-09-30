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
}
