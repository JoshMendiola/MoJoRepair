export async function handleLogin(event) {
  console.log('handleLogin function called');
  event.preventDefault();
  const form = event.target;
  const username = form.username.value;
  const password = form.password.value;

  try {
    console.log('Sending fetch request to /api/login');
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookies
      body: JSON.stringify({ username, password }),
    });

    console.log('Received response:', response);

    if (!response.ok) {
      throw new Error('Login failed');
    }

    // No need to store token in localStorage as it's now in cookies
    return true;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export function isAuthenticated() {
  return document.cookie.includes('authToken=');
}

export async function handleLogout() {
  try {
    const response = await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
    });
    
    if (response.ok) {
      window.location.href = '/login'; // Full page reload to clear any state
    } else {
      console.error('Logout failed');
    }
  } catch (error) {
    console.error('Logout error:', error);
  }
}