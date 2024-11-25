import SQLDemoHome from './pages/SQLDemo/home.js';
import Services from './pages//SQLDemo/services.js';
import Login from './pages/login.js';
import EmployeeDashboard from "./pages/SQLDemo/EmployeeDashboard.js";
import SecureDashboard from "./pages/SecureDashboard.js";
import VulnerableLogin from "./pages/SQLDemo/vulnerable-login.js";
import { requireAuth } from './routes/SecureRoutes.js';

const routes = {
  '/login': Login,
  '/dashboard': SecureDashboard,
  '/sql-demo': SQLDemoHome,
  '/sql-demo/admin': VulnerableLogin,
  '/sql-demo/employee-dashboard': EmployeeDashboard,
  '/sql-demo/services': Services,
};

const protectedRoutes = ['/dashboard', '/employee-dashboard', '/xss-demo'];

export default async function router() {
  const path = window.location.pathname;
  console.log('Current path:', path);
  
  // Check authentication for protected routes
  if (protectedRoutes.includes(path) && !requireAuth(path)) {
    return;
  }
  
  const page = routes[path] || routes['/'];
  if (!page) {
    console.error('No page found for path:', path);
    return;
  }
  
  try {
    const content = await page();
    console.log('Page content:', content);
    document.querySelector('#app').innerHTML = content;
    updateNavigation(path);
  } catch (error) {
    console.error('Error rendering page:', error);
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
