import axios from 'axios';
import User from '../user';

import { API_BASE_URL as baseUrl } from '../../config/api';

const { getToken } = User;

const instance = axios.create({
    baseURL: baseUrl,
});

instance.interceptors.request.use(request => {
    const token = getToken() || '';

    request.headers['x-auth-token'] = request.headers['x-auth-token'] || token;
    request.headers['request-source'] = 'panel';
    return request;
});

export default instance;
