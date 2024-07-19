import type { AxiosResponse } from 'axios';
import axios from 'axios';
import type { User } from '../types/userTypes';

const tokenRequest = axios.create({
  baseURL: '/api/tokens',
});

class Tokens {
  static refreshTokens = async (): Promise<{
    message: 'success';
    accessToken: string;
    user: User;
  }> => {
    try {
      const response: AxiosResponse<{ message: 'success'; accessToken: string; user: User }> =
        await tokenRequest.get('/refresh');
      return response.data;
    } catch (error) {
      throw new Error('error');
    }
  };
}

export default Tokens;