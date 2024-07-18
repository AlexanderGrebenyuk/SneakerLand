import { AxiosResponse } from 'axios';
import axiosInstance from '../../../services/axiosInstance';
import { SneakerId } from '../../sneakers/types/sneakerType';
import { Basket } from '../types/basketTypes';

class BasketApi {
  static createBasket= async (body: SneakerId): Promise<Basket> => {
    const response: AxiosResponse<{ message: 'success'; basket: Basket }> =
      await axiosInstance.post('/basket', {sneakerId: body}); // Сделал Влад Кудря
    return response.data.basket;
  };

  static getBasket = async (): Promise<Basket[]> => {
    const response: AxiosResponse<{ message: string; basket: Basket[] }> =
      await axiosInstance.get('/basket');     
    return response.data.basket;
  };
}

export default BasketApi;
