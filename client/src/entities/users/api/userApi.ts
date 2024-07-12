import type { AxiosResponse } from 'axios';
import type { User, UserForLoga, UserForRega } from '../types/userTypes';
import axiosInstance from '../../../services/axiosInstance';


type ResForAuth = {
  message: 'success';
  user: User;
  accessToken: string;
};

class AuthApi {
  static registration = async (body: UserForRega): Promise<ResForAuth> => {
    try {
      const result: AxiosResponse<ResForAuth> = await axiosInstance.post(
        '/auth/registration',
        body,
      );
      return result.data;
    } catch (error) {
      throw new Error
    }
  };

  static authorization = async (body: UserForLoga): Promise<ResForAuth> => {
    try {
      const result: AxiosResponse<ResForAuth> = await axiosInstance.post(
        '/auth/authorization',
        body,
      );
      return result.data;
    } catch (error) {
      throw new Error
    }
  };

  static refreshUser = async (): Promise<ResForAuth> => {
    try {
      const result: AxiosResponse<ResForAuth> = await axiosInstance.get('/tokens/refresh');
      return result.data;
    } catch (error) {
      throw new Error
    }
  };

  static logout = async (): Promise<{ message: 'success' }> => {
    try {
      const result: AxiosResponse<{ message: 'success' }> = await axiosInstance.get('/auth/logout');
      return result.data;
    } catch (error) {
      throw new Error
    }
  };
}

export default AuthApi;
