export function authToken() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.authToken) {
    return user.authToken;
  }
  return '';
}
