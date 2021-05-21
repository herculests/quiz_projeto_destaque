import axios from './index';


const urls = {
    login: '/api/login',
};


export function login(credentials = {}) {
    return new Promise((resolve, reject) => axios
        .post(urls.login, credentials)
        .then(resolve)
        .catch(reject));
}

export default {};
