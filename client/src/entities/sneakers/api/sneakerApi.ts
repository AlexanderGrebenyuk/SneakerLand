import { AxiosResponse } from 'axios';

import { Sneaker, SneakerId, SneakerWithoutId } from '../types/sneakerType'; //пересмотреть sneakerform

import axiosInstance from '../../../services/axiosInstance';

class SneakerApi {
  // либо сдлеать динамическую функцию для квери параметров либо создать новую
  static getAllSneakers = async (): Promise<Sneaker[]> => {
    const response: AxiosResponse<{ message: string; sneakers: Sneaker[] }> =
    await axiosInstance.get('/sneakers');
    return response.data.sneakers;
  };
  // ?sexId=1&sizeId=5
  static removeSneaker = async (id: SneakerId): Promise<SneakerId | string> => {
    const response: AxiosResponse<{ message: string }> = await axiosInstance.delete(
      `/sneakers/${id}`,
    );
    if (response.data.message === 'success') {
      return id;
    }
    return 'Что-то пошло не так';
  };

  static createSneaker = async (body: SneakerWithoutId): Promise<Sneaker> => {
    console.log(body);
    const response: AxiosResponse<{ message: string; sneaker: Sneaker }> = await axiosInstance.post(
      '/sneakers',
      body,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data.sneaker;
  };

  // static updateSneaker = async (obj: { // ПЕРЕДЕЛАТЬ, ДУРА!!!!!
  //   id: SneakerId;
  //   body: SneakerForForm; // БЫЛО SneakerWithoutId
  // }): Promise<Sneaker> => {
  //   const response: AxiosResponse<{ message: string; sneaker: SneakerForForm }> = await axiosInstance.put(
  //     `/sneakers/${obj.id}`,
  //     obj.body,
  //   );
  //   return response.data.sneaker;
  // };
}

export default SneakerApi;
