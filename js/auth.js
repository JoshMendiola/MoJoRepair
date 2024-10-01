export async function handleLogin(event) {
  console.log('handleLogin function called');
  event.preventDefault();
  const form = event.target;
  const username = form.username.value;
  const password = form.password.value;

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
