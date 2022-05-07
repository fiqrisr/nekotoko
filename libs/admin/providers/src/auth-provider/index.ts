import { AxiosInstance } from 'axios';
import { AuthProvider } from '@pankod/refine-core';
import { httpClient as axiosInstance } from '@nekotoko/admin/http';

export const authProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance
): AuthProvider => ({
  login: async ({ username, password }) => {
    const { data } = await httpClient.post(`${apiUrl}/auth/login`, {
      username,
      password,
    });

    if (data) {
      const { accessToken, user } = data.data;

      if (!user.roles.includes('admin'))
        return Promise.reject({
          name: 'Login failed!',
          message: 'User is not an admin',
        });

      if (!accessToken)
        return Promise.reject({
          name: 'Login failed!',
          message: 'Invalid access token',
        });

      httpClient.defaults.headers.common = {
        Authorization: `Bearer ${accessToken}`,
      };
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      return Promise.resolve();
    }

    return Promise.reject();
  },

  logout: async () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    return Promise.resolve();
  },

  checkAuth: async () => {
    return localStorage.getItem('accessToken')
      ? Promise.resolve()
      : Promise.reject();
  },

  checkError: (error) => {
    if (error.status === 401) return Promise.reject();
    return Promise.resolve();
  },

  getPermissions: () => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      return Promise.resolve(parsedUser.roles);
    }
    return Promise.reject();
  },
});
