import axios from 'axios';

const $api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const authInterceptor = config => {
    config.headers.access = localStorage.getItem('token');
    return config;
};

$api.interceptors.request.use(authInterceptor);

$api.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.statusCode === 403) {
        localStorage.removeItem('token');
        window.location = '/';
    }
    return Promise.reject(error);
})

export {
    $api,
}