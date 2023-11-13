import ApiService from './ApiService';

function Login(email, password) {
  return new Promise((resolve) => {
    const additionalHeaders = {
      'Content-Type': 'application/json',
    };

    ApiService.postWithCredentials('/login', { email, password }, additionalHeaders).then(
      (response) => {
        if (response.status === 'success') {
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('userRole', response.user.role);
          console.log('response', response);
          const userString = localStorage.getItem('user');
          console.log('userString', userString);
        }
        resolve(response);
      },
      (err) => {
        console.error('Error in login request:', err);
        resolve({
          status: 'failed',
          message: 'Error: Por favor intente de nuevo o póngase en contacto con el administrador.',
        });
      },
    );
  });
}

const getCurrentUserRole = () =>
  // Retrieve the user's role from localStorage
  localStorage.getItem('userRole');
function logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('userRole'); // Remove the user's role when logging out
}

function isLogin() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.authToken) {
    return true;
  }
  return false;
}

function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    ApiService.get(`${userId}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

const UserService = {
  Login,
  logout,
  isLogin,
  getCurrentUserRole,
  fetchUserData,
};

export default UserService;
