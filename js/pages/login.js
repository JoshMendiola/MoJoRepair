console.log('login.js is being loaded');
import { handleLogin } from '../auth.js';
import { navigationService } from '../navigation.js';

export default function Login() {
  console.log('Login component is being rendered');

  setTimeout(() => {
    console.log('Attempting to setup login form');
    const form = document.getElementById('login-form');
    if (form) {
      form.removeEventListener('submit', handleLoginWrapper); // Remove any existing listener
      form.addEventListener('submit', handleLoginWrapper);
    }
  }, 0);

  function handleLoginWrapper(e) {
    e.preventDefault();
    handleLogin(e).then(success => {
      if (success) {
        console.log('Login successful, navigating to dashboard');
        navigationService.navigate('/dashboard');
      }
    }).catch(error => {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    });
  }

  return `
    <section id="login">
      <div class="form-container">
        <h2>Login</h2>
        <form id="login-form">
          <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
          </div>
          <button type="submit" class="btn">Login</button>
        </form>
      </div>
    </section>
  `;
}