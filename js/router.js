import SQLDemoHome from './pages/SQLDemo/home';
import ServicesLoader from './pages/SQLDemo/servicesLoader';
import VulnerableLogin from './pages/SQLDemo/vulnerable-login';
import EmployeeDashboard from './pages/SQLDemo/EmployeeDashboard.js';
import SecureDashboard from './pages/SecureDashboard';
import Login from './pages/login';
import { isAuthenticated } from './auth.js';
import { navigationService } from './navigation.js';

const routes = {
  '/login': Login,
  '/dashboard': SecureDashboard,
  '/sql-demo': SQLDemoHome,
  '/sql-demo/services': ServicesLoader,
  '/sql-demo/admin': VulnerableLogin,
  '/sql-demo/employee-dashboard': EmployeeDashboard,
};

const protectedRoutes = ['/dashboard', '/sql-demo', '/sql-demo/services', '/sql-demo/employee-dashboard'];

export default async function router() {
  const path = window.location.pathname;
  console.log('Current path:', path);
  
  // Check authentication for protected routes
  if (protectedRoutes.includes(path)) {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      console.log('Not authenticated, redirecting to login');
      navigationService.navigate('/login');
      return;
    }
  }

  // Special handling for root path
  if (path === '/') {
    const authenticated = await isAuthenticated();
    if (authenticated) {
      navigationService.navigate('/dashboard');
      return;
    }
  }
  
  const Component = routes[path];
  if (!Component) {
    console.error('No page found for path:', path);
    navigationService.navigate('/');
    return;
  }
  
  try {
    const content = await Component();
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