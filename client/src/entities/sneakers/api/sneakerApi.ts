import { AxiosResponse } from 'axios';
import { Sneaker, SneakerId } from '../types/sneakerType';
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
}

export default SneakerApi;
