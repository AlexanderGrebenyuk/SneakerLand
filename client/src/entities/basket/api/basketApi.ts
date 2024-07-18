import { AxiosResponse } from 'axios';
import axiosInstance from '../../../services/axiosInstance';
import { SneakerId } from '../../sneakers/types/sneakerType';
import { Basket } from '../types/basketTypes';

class BasketApi {
  static createBasket = async (body: SneakerId): Promise<Basket> => {
    const response: AxiosResponse<{ message: 'success'; order: Basket }> = await axiosInstance.post(
      '/basket',
      { sneakerId: body },
    ); // Сделал Влад Кудря
    return response.data.order;
  };

  static getBasket = async (): Promise<Basket> => {
    const response: AxiosResponse<{ message: string; order: Basket }> =
      await axiosInstance.get('/basket');
      console.log(response.data);
      
    return response.data.order;
  };
}

export default BasketApi;
