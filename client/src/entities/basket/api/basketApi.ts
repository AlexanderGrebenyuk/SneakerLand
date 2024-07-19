import { AxiosResponse } from 'axios';
import axiosInstance from '../../../services/axiosInstance';
import { SneakerId } from '../../sneakers/types/sneakerType';
import { Basket, OrderLineId, OrderLinesForStatus } from '../types/basketTypes';

class BasketApi {
  //При входе юзера
  static createBasket = async (body: SneakerId): Promise<Basket> => {
    const response: AxiosResponse<{ message: 'success'; order: Basket }> = await axiosInstance.post(
      '/basket',
      { sneakerId: body },
    ); // Сделал Влад Кудря

    return response.data.order;
  };
  //Заказ юзера
  static getBasketUser = async (): Promise<Basket> => {
    //Добавила []
    const response: AxiosResponse<{ message: string; order: Basket }> = //Добавила []
      await axiosInstance.get('/basket');
    console.log(response.data, 'basketApi getAll');

    console.log('USER', response.data.order);

    return response.data.order;
  };
  // Получение всех заказов для админа.
  static getAllBasketsAdmin = async (): Promise<OrderLinesForStatus[]> => {
    const response: AxiosResponse<{ message: string; orders: OrderLinesForStatus[] }> =
      await axiosInstance.get('/basket');
    console.log(123456789, response.data.orders);

    return response.data.orders;
  };

  //Обновление заказов Админом
  static updateOrderAdmin = async (id: OrderLineId): Promise<OrderLinesForStatus[]> => {
    const response: AxiosResponse<{ message: string; orders: OrderLinesForStatus[] }> =
      await axiosInstance.put(`/basket/orders/${id}`);
    return response.data.orders;
  };
  // По клику оплатить юзером, обновляется статус заказа на 2
  static updateOrderUser = async (id: OrderLineId): Promise<string> => {
    const response: AxiosResponse<{ message: string }> = await axiosInstance.put(
      `/basket/orders/${id}`,
    );
    console.log(response.data.message);
    return response.data.message;
  };

  static allOrderApi = async (): Promise<Basket> => {
    const response: AxiosResponse<{ message: string; basket: Basket }> =
      await axiosInstance.get('/basket/allOrders');
    console.log(response.data);

    return response.data.basket;
  };
}

export default BasketApi;
