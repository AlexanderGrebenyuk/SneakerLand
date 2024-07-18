import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/store';
import BasketOrderLine from '../../entities/basket/ui/BasketOrderLine';
// import { getBasketThunk } from '../../entities/basket/basketSlice';

const BasketPage = (): JSX.Element => {
  const { user } = useAppSelector((state) => state.user);
  const order = useAppSelector((state) => state.basket.order);
  const dispatch = useAppDispatch();

  //   useEffect(() => {
  //     void dispatch(getBasketThunk());
  //   }, [dispatch]);

  console.log('order', order);

  return (
    <div className=" BasketPage">
      <div className=" BasketItem">
        <>
          {order &&
            order.statusId === 1 &&
            order.OrderLines.map((ordLine) => (
              <BasketOrderLine key={ordLine.id} ordLine={ordLine} />
            ))}
          <p>ИТОГО: {order && order.totalPrice} ₽</p>

          {/* Тут нужно вытащить статус заказа (наименование) из БД */}
          <p>Статус заказа: {order && order.statusId}</p>
          {/* Удаление из БД? */}
          <button>Оплатить</button>
        </>
      </div>
      ord
    </div>
  );
};
export default BasketPage;
