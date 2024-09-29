import { initNavigation } from './navigation.js';

function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Here you would typically send a request to your backend API
  // For now, we'll just log the values and show an alert
  console.log('Login attempt:', { username, password });
  alert(`Login attempt for username: ${username}. In a real app, this would connect to a backend.`);
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
