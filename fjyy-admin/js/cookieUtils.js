
const TokenKey = 'user_token';
const UserInfoKey = 'user_info';

// function getToken() {
//     return Cookies.get(TokenKey)
// }

// function setToken(token) {
//     return Cookies.set(TokenKey, token)
// }

// function removeToken() {
//     return Cookies.remove(TokenKey)
// }

window.cookieUtils = {

    getToken: function() {
        return Cookies.get(TokenKey)
    },

    setToken: function(token) {
        return Cookies.set(TokenKey, token)
    },

    removeToken: function() {
        return Cookies.remove(TokenKey)
    },
    
    getUserInfo: function() {
        var userJson = Cookies.get(UserInfoKey)
        if (userJson == undefined) {
            return undefined;
        }
        return JSON.parse(userJson)
    },

    setUserInfo: function(userInfo) {
        var userJson = JSON.stringify(userInfo);
        return Cookies.set(UserInfoKey, userJson)
    },

    removeUserInfo: function() {
        return Cookies.remove(UserInfoKey)
    },
}


