// AxiosService.jsx
import axios from 'axios';

const AxiosService = axios.create({
    baseURL: "https://gold-rate-calculator-backend-ymar.onrender.com",
    headers: {
        "Content-Type": "application/json",
    }
});

AxiosService.interceptors.request.use((config) => {
    console.log(config);
    const token = sessionStorage.getItem('token');
    if (config.authenticate && token)
        config.headers.Authorization = `Bearer ${token}`;

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default AxiosService;
