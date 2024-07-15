import { AxiosResponse } from 'axios';
import { Sneaker, SneakerForForm, SneakerId, SneakerWithoutId } from '../types/sneakerType';
import axiosInstance from '../../../services/axiosInstance';

class SneakerApi {
  static getAllSneakers = async (): Promise<Sneaker[]> => {
    const response: AxiosResponse<{ message: string; sneakers: Sneaker[] }> =
      await axiosInstance.get('/sneakers');
    return response.data.sneakers;
  };
  static removeSneaker = async (id: SneakerId): Promise<SneakerId | string> => {
    const response: AxiosResponse<{ message: string }> = await axiosInstance.delete(
      `/sneakers/${id}`,
    );
    if (response.data.message === 'success') {
      return id;
    }
    return 'Что-то пошло не так';
  };

  static updateSneaker = async (obj: {
    id: SneakerId;
    body: SneakerForForm; // БЫЛО SneakerWithoutId
  }): Promise<Sneaker> => {
    const response: AxiosResponse<{ message: string; sneaker: SneakerForForm }> = await axiosInstance.put(
      `/sneakers/${obj.id}`,
      obj.body,
    );

    return response.data.sneaker;
  };
}

export default SneakerApi;
