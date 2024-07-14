import { AxiosResponse } from 'axios';
import { Sneaker, SneakerId, SneakerWithoutId } from '../types/sneakerType';
import axiosInstance from '../../../services/axiosInstance';

class SneakerApi {
  static getAllSneakers = async (): Promise<Sneaker[]> => {
    const response: AxiosResponse<{ message: string; sneakers: Sneaker[] }> =
      await axiosInstance.get('/sneakers');
    return response.data.sneakers;
  };
  static removeSneaker = async (id: SneakerId): Promise<SneakerId | string> => {
    const response: AxiosResponse<{ message: 'success' }> = await axiosInstance.delete(
      `/sneakers/${id}`,
    );
    if (response.data.message === 'success') {
      return id;
    }
    return 'Что-то пошло не так';
  };

  static createSneaker = async (body: SneakerWithoutId): Promise<Sneaker> => {
    const response: AxiosResponse<{ message: string; sneaker: Sneaker }> = await axiosInstance.post(
      '/sneakers',
      body,
    );
    return response.data.sneaker
  };
}

export default SneakerApi;
