import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';
import type { StoreType } from '../../../app/store/store';

import type { User, UserWithoutId, UserWithoutName } from '../types/userTypes';

let store: StoreType;

export const injectStore = (_store: StoreType): void => {
  store = _store;
};

const authRequest = axios.create({
  baseURL: '/api/auth',
  withCredentials: true,
});

authRequest.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${store?.getState().auth.accessToken}`;
  }
  return config;
});

authRequest.interceptors.response.use(
  (res) => res,
  async (err: AxiosError & { config: { sent?: boolean; url?: string } }) => {
    const prevRequest = err.config; // необходимо чтобы понять что это второй запрос
    // предотвращает зацикливание запроса если в cookie нет refresh либо истек срок его действия
    if (prevRequest.url?.endsWith('/tokens/refresh')) {
      return Promise.reject(err);
    }
    if (err.response?.status === 403 && !prevRequest.sent) {
      prevRequest.sent = true;
      const {
        data: { accessToken },
      } = await authRequest<{ message: 'success'; user: User; accessToken: string }>(
        '/tokens/refresh',
      );
      prevRequest.headers.Authorization = `Bearer ${accessToken}`;
      return authRequest(prevRequest);
    }
    return Promise.reject(err);
  },
);

class AuthApi {
  static registartion = async (
    body: UserWithoutId,
  ): Promise<{ message: 'success'; accessToken: string; user: User }> => {
    try {
      const response: AxiosResponse<{ message: 'success'; accessToken: string; user: User }> =
        await authRequest.post('/registration', body);
      return response.data;
    } catch (error) {
      throw new Error('error error');
    }
  };

  static authrozation = async (
    body: UserWithoutName,
  ): Promise<{ message: 'success'; accessToken: string; user: User }> => {
    try {
      const response: AxiosResponse<{ message: 'success'; accessToken: string; user: User }> =
        await authRequest.post('/authorization', body);
      return response.data;
    } catch (error) {
      throw new Error('pa pa pa');
    }
  };

  static logout = async (): Promise<{ message: 'success' }> => {
    try {
      const response: AxiosResponse<{ message: 'success' }> = await authRequest.get('/logout');
      return response.data;
    } catch (error) {
      throw new Error('lalala');
    }
  };
}

export default AuthApi;