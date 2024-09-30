import { initNavigation } from './navigation.js';

async function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  console.log('Attempting to send login request...');

  try {
    console.log('Sending fetch request to /api/login');
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    console.log('Received response:', response);

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    console.log('Login successful, received data:', data);

    localStorage.setItem('token', data.access_token);
    alert('Login successful!');
    window.location.href = '/dashboard';
  } catch (error) {
    console.error('Login error:', error);
    alert('Login failed. Please try again.');
  }
}

function setupFormListeners() {
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  setupFormListeners();
});

// Export setupFormListeners so it can be called after dynamic content loading
export { setupFormListeners };