import axios from './index';


const urls = {
    get_post_users: '/api/users',
    delete_user: '/api/users/:user_id',
    edit_user: '/api/users/:user_id',
};

export function getAllUsers(requestParams = {}) {
    return new Promise((resolve, reject) => axios
        .get(urls.get_post_users, { params: requestParams })
        .then(resolve)
        .catch(reject));
}

export function deleteUser(userId) {
    return new Promise((resolve, reject) => axios
        .delete(urls.delete_user.replace(':user_id', userId))
        .then(resolve)
        .catch(reject));
}

export function editUser(userId, data = {}) {
    return new Promise((resolve, reject) => axios
        .patch(urls.edit_user.replace(':user_id', userId), data)
        .then(resolve)
        .catch(reject));
}

export function createUser(data = {}) {
    return new Promise((resolve, reject) => axios
        .post(urls.get_post_users, data)
        .then(resolve)
        .catch(reject));
}

export default {};
