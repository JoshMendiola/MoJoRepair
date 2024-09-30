export async function handleLogin(event) {
  console.log('handleLogin function called');
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  console.log('Attempting to send login request...', { username, password });

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
    return true; // Indicate successful login
  } catch (error) {
    console.error('Login error:', error);
    throw error; // Rethrow the error to be caught in login.js
  }
}

export function setupLoginForm() {
  console.log('setupLoginForm function called');
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    console.log('Login form found, adding event listener');
    loginForm.removeEventListener('submit', handleLogin); // Remove any existing listener
    loginForm.addEventListener('submit', handleLogin);
  } else {
    console.log('Login form not found');
  }
}

export { handleLogin };
