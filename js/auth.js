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
    console.log('Response headers:', [...response.headers.entries()]);

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    console.log('Response data:', data);
    
    // Check if cookie was set
    console.log('Cookies after login:', document.cookie);
    const isAuthenticated = document.cookie.includes('authToken=');
    console.log('Is authenticated?', isAuthenticated);

    return true;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function isAuthenticated() {
  try {
    const response = await fetch('/api/check-auth', {
      credentials: 'include'
    });
    const hasToken = response.ok;
    console.log('Checking authentication, has token:', hasToken);
    return hasToken;
  } catch (error) {
    console.error('Auth check error:', error);
    return false;
  }
}

export async function handleLogout() {
  try {
    const response = await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
    });
    
    if (response.ok) {
      window.location.href = '/login';
    } else {
      console.error('Logout failed');
    }
  } catch (error) {
    console.error('Logout error:', error);
  }
}