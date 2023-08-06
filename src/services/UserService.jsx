import ApiService from './ApiService';

function Login(email, password) {
  return new Promise((resolve) => {
    ApiService.post('/login', { email, password }).then(
      (response) => {
        if (response.status === 'success') {
          localStorage.setItem('user', JSON.stringify(response.user));
        }
        resolve(response);
      },
      (err) => {
        resolve({
          status: 'failed',
          message: 'request error: kinldy try again',
        });
      }
    );
  });
}

function logout() {
  localStorage.removeItem('user');
}

function isLogin() {
  let user = JSON.parse(localStorage.getItem('user'));
  console.log(user);

  if (user && user.authToken) {
    return true;
  } else {
    return false;
  }
}

const UserService = {
  Login,
  logout,
  isLogin,
};

export default UserService;
