import jwtDecode from 'jwt-decode';

const User = {
    setPageTitle(title, absolute = false) {
        if (absolute) {
            document.title = title;
        } else {
            document.title = `Quiz • ${title}`;
        }
    },
    doLogout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('companies');
        localStorage.removeItem('current_company');

        window.location = '/login';
    },
    setUser(token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(jwtDecode(token)));
    },
    getUser() {
        try {
            const storage = jwtDecode(localStorage.getItem('token'));
            return storage;
        } catch (e) {
            return false;
        }
    },
    getToken() {
        try {
            const token = localStorage.getItem('token');
            return token;
        } catch (e) {
            return false;
        }
    },
    getUserByToken(token) {
        try {
            const user = jwtDecode(token);
            return user;
        } catch (e) {
            return {};
        }
    },
};

export default User;
