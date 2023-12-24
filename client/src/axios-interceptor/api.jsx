import axios from 'axios';
import BASE_URL from '../connect';
import store from '../sagas/configureStore';
import { logout, refreshAccessTokenSuccess } from '../sagas/auth/authSlice';
import { setErrorGlobal } from '../sagas/global/globalSlice';
import { getObjectFromLocalStorage } from '../utils/localstorage';

const api = axios.create({
    baseURL: BASE_URL,
});

const infoAuth = getObjectFromLocalStorage('infoAuth')

api.interceptors.request.use(config => {
    config.withCredentials = true;
    config.headers['token'] = `Bearer ${getObjectFromLocalStorage('authToken')}`;
    config.headers['userType'] = 'customer';
    return config;
}, error => {
    console.log("file: api.jsx:18 ~ error:", error)
    return Promise.reject(error);
});

api.interceptors.response.use((response) => {
    const newAccessToken = response.headers['new-token'];
    if (newAccessToken) {
        api.defaults.headers['token'] = `Bearer ${newAccessToken}`;  // Cập nhật headers
        store.dispatch(refreshAccessTokenSuccess(newAccessToken));
    }
    return response;
}, (error) => {
    if (error.response && error.response.data.status === 'notAuth') {
        store.dispatch(logout({ id: infoAuth?._id }));
        store.dispatch(setErrorGlobal('Phiên bản đăng nhập đã hết hạn!'))
    }
    return Promise.reject(error);
});

export default api;