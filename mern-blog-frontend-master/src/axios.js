import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/'
    // baseURL: 'http://compitplus.ru/api/'

});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');

    return config;
})

export default instance;