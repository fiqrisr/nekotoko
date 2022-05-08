import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const httpClient: AxiosInstance = axios.create();

httpClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      if (config.headers === undefined) {
        config.headers = {};
      }

      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { httpClient };
