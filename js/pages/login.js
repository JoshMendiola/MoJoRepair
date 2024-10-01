console.log('login.js is being loaded');
import { setupLoginForm, handleLogin } from '../auth';
import { navigationService } from '../navigation.js';

export default function Login() {
  console.log('Login component is being rendered');

  setTimeout(() => {
    console.log('Attempting to setup login form');
    setupLoginForm(); // Use the setupLoginForm function from auth.js
    const form = document.getElementById('login-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
          const success = await handleLogin(e);
          if (success) {
            navigationService.navigate('/');
          }
        } catch (error) {
          console.error('Login error:', error);
          alert('Login failed. Please try again.');
        }
      });
    }
  }, 0);


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
