//@ts-nocheck
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/store';
import BasketOrderLine from '../../entities/basket/ui/BasketOrderLine';
import { clearBasket } from '../../entities/basket/adminBasketSlice';
import { updateOrderUserThunk } from '../../entities/basket/userBasketSlice';

const BasketPage = (): JSX.Element => {
  const { user } = useAppSelector((state) => state.user);
  const order = useAppSelector((state) => state.basket.order);
  const dispatch = useAppDispatch();

  

  const onHandlePay = (): void => {
    //Санка на обновление статуса
    dispatch(updateOrderUserThunk(order?.id))
    dispatch(clearBasket());

  };
// console.log('ORDER',order[0].OrderLines);

  
  return (
    <div className=" BasketPage">
      <>
        {order &&
          order.statusId === 1 &&
          order.OrderLines.map((ordLine) => <BasketOrderLine key={ordLine.id} ordLine={ordLine} />)}
        <p>ИТОГО: {order && order.totalPrice} ₽</p>

        {/* Тут нужно вытащить статус заказа (наименование) из БД */}
        <p>Статус заказа: {order && order.statusId}</p>
        {/* Удаление из БД? */}
        <button onClick={onHandlePay}>Оплатить</button>
      </>
    </div>
  );
};
export default BasketPage;
