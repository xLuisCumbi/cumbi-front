

export function authToken() {

    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.authToken) {

        return  user.authToken;
        
    } else {

        return "";

    } 
}