import { AxiosResponse } from 'axios';
import { Sneaker } from '../types/sneakerType';
import axiosInstance from '../../../services/axiosInstance';

class SneakerApi {
  static getAllSneakers = async (): Promise<Sneaker[]> => {
    const response: AxiosResponse<{ message: string; sneakers: Sneaker[] }> =
      await axiosInstance.get('/sneakers');
    return response.data.sneakers;
  };
}

export default SneakerApi;
