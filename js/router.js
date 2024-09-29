const routes = {
  '/': { title: 'Home', render: () => import('./pages/home.js') },
  '/services': { title: 'Services', render: () => import('./pages/services.js') },
  '/login': { title: 'Login', render: () => import('./pages/login.js') },
};

export default function router() {
  let view = routes[location.pathname];

  if (view) {
    document.title = view.title;
    view.render().then(module => {
      const page = module.default;
      document.getElementById('app').innerHTML = page();
    });
  } else {
    // Handle 404
    history.pushState('', '', '/');
    router();
  }
}
