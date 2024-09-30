import { initNavigation } from './navigation.js';

async function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    alert('Login successful!');

    window.location.href = '/dashboard'

  } catch (error) {
    console.error('Login error:', error);
    alert('Login failed. Please try again.');
  }
}

function handleRegister(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    alert("Passwords don't match!");
    return;
  }

  // Here you would typically send a request to your backend API
  console.log('Register attempt:', { username, email, password });
  alert(`Register attempt for username: ${username} and email: ${email}. In a real app, this would connect to a backend.`);
}

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }
});
