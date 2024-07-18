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
  console.log(order, 777);

  const { statuses } = useAppSelector((state) => state.statuses);

  const orderStatus = statuses.filter((ordStat) => ordStat.id === order?.statusId);

  console.log('ORDSTATUS', orderStatus);

  const onHandlePay = (): void => {
    //Санка на обновление статуса
    dispatch(updateOrderUserThunk(order?.id));
    dispatch(clearBasket());
  };
  // console.log('ORDER',order[0])

  return (
    <div className=" BasketPage">
      <>
        {order &&
          order.statusId === 1 &&
          order.OrderLines.map((ordLine) => <BasketOrderLine key={ordLine.id} ordLine={ordLine} />)}

        {order.statusId === 1 ? (
          <>
            <p>ИТОГО: {order && order.totalPrice} ₽</p>
            <p>Статус заказа: {order && orderStatus.map((ord) => ord.name)}</p>
            {/* Удаление из БД? */}
            <button onClick={onHandlePay}>Оплатить</button>
          </>
        ) : (
          <h3>Ваша корзина пуста</h3>
        )}
      </>
    </div>
  );
};
export default BasketPage;
