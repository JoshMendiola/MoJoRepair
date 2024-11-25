export function checkAuth() {
  return document.cookie.includes('authToken=');
}

export function requireAuth(targetPath) {
  if (!checkAuth()) {
    navigationService.navigate('/login');
    return false;
  }
  return true;
}