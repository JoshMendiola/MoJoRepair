export default function SecureDashboard() {
  // Setup event listeners after render
  setTimeout(() => {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        authService.handleLogout();
      });
    }
  }, 0);

  return `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1>Security Demo Dashboard</h1>
        <button id="logout-btn" class="btn-logout">Logout</button>
      </div>
      
      <div class="demo-grid">
        <div class="demo-card">
          <h2>SQL Injection Demo</h2>
          <p>Explore SQL injection vulnerabilities in a controlled environment</p>
          <a href="/sql-demo" data-link class="demo-link">Launch Demo</a>
        </div>
        
        <div class="demo-card">
          <h2>XSS Demo</h2>
          <p>Test Cross-Site Scripting attacks safely</p>
          <a href="/xss-demo" data-link class="demo-link">Launch Demo</a>
        </div>
      </div>
    </div>
  `;
}