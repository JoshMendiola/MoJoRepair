console.log('login.js is being loaded');
import { setupLoginForm } from './auth.js';

export default function Login() {
  console.log('Login component is being rendered');

  setTimeout(() => {
    console.log('Attempting to setup login form');
    setupLoginForm();
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
