// @ts-nocheck

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/store';
import UserOrderItem from '../../entities/userOrderItem/ui/UserOrderItem';
import { getBasket } from '../../entities/basket/userBasketSlice';

const UserOrdersPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const basket = useAppSelector((state) => state.basket.basket);
  const { statuses } = useAppSelector((state) => state.statuses);
  console.log(basket);
  useEffect(() => {
    void dispatch(getBasket());
  }, []);
  let orders;
  // console.log('USERORDERPAGE', basket);
  if (basket) {
    orders = basket.Orders.filter((order) => order.statusId !== 1);
  }
  return (
    <div className="UserOrdersPage">
      <>
        {/* {order.OrderLines.map((ordLine) => (
            <UserOrderItem key={ordLine.id} ordLine={ordLine} />
          ))} */}
        {orders &&
          orders.map((order) => (
            <>
              <div>
                <h1>{order.id}</h1>

                <p>{order.totalPrice}</p>
              </div>
            </>
          ))}
        {/* <p>ИТОГО: {order.totalPrice} ₽</p>
        <p>Статус заказа: {orderStatus && orderStatus.map((ord) => ord.name).join(', ')}</p> */}
      </>
    </div>
  );
};
export default UserOrdersPage;
