//@ts-nocheck
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/store';
import BasketOrderLine from '../../entities/basket/ui/BasketOrderLine';
import { clearBasket } from '../../entities/basket/adminBasketSlice';
import { updateOrderUserThunk } from '../../entities/basket/userBasketSlice';
import './styles/BasketPage.css';

const BasketPage = (): JSX.Element => {
  const { user } = useAppSelector((state) => state.user);
  const { statuses } = useAppSelector((state) => state.statuses);
  const order = useAppSelector((state) => state.basket.order);
  const dispatch = useAppDispatch();
  console.log(order, 777);




  const orderStatus = statuses.filter((ordStat) => ordStat.id === order?.statusId);

  console.log('ORDSTATUS', orderStatus);

  const onHandlePay = (): void => {
    //Санка на обновление статуса
    dispatch(updateOrderUserThunk(order?.id));
    dispatch(clearBasket());
  };
  // console.log('ORDER',order[0])





    // const orderStatus =
    // statuses.find((status) => status.id === order?.statusId)?.name || 'Неизвестный статус';


  return (
    <div className="BasketPage">
      <>
        {order &&
          order.statusId === 1 &&
          order.OrderLines.map((ordLine) => <BasketOrderLine key={ordLine.id} ordLine={ordLine} />)}

        {order === null || order === undefined && order.statusId !== 1 ? (
          <>
            <div style={{ fontSize: '40px', marginTop: '200px' }}>Корзина пока пустая 😞</div>
          </>
        ) : (
          <>
            <div style={{ marginLeft: '620px' }}>
              <p style={{ fontSize: '18px' }}>ИТОГО: {order && order.totalPrice} ₽</p>

              {/* Тут нужно вытащить статус заказа (наименование) из БД */}
              <p style={{ fontSize: '18px' }}>Статус заказа: {orderStatus}</p>
              {/* Удаление из БД? */}
              <button onClick={onHandlePay}>Оплатить</button>
            </div>
          </>

        )}
      </>
    </div>
  );
};
export default BasketPage;
