import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_URL_DEV } from '@env';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL_DEV,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
