export function authToken() {
  const userString = localStorage.getItem('user');
  if (userString !== null) {
    const user = JSON.parse(userString);
    if (user && user.authToken) {
      return user.authToken;
    }
  }
  return '';
}

export function updateLocalUser(updatedUserData) {
  // Recuperar el usuario actual y el authToken de localStorage
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const authToken = currentUser.authToken;

  // Combina los datos actualizados del usuario con el authToken existente
  const newUserData = {
    ...updatedUserData,
    authToken: authToken // Mantén el authToken existente
  };

  // Actualizar la información del usuario en localStorage
  localStorage.setItem('user', JSON.stringify(newUserData));
}
