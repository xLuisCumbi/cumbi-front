
export function authToken() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.authToken) {
        console.log('user', user);
        return  user.authToken;
    } else {
        return "";
    }
}