import axios, { AxiosInstance } from 'axios';

const httpClient: AxiosInstance = axios.create();

const accessToken = localStorage.getItem('accessToken');

httpClient.defaults.headers.common = {
  Authorization: `Bearer ${accessToken}`,
};

export { httpClient };
