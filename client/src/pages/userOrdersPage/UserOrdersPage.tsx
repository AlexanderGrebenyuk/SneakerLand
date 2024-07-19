// @ts-nocheck

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/store';
import UserOrderItem from '../../entities/userOrderItem/ui/UserOrderItem';
import { getBasket } from '../../entities/basket/userBasketSlice';
import './styles/UserOrdersPage.css';

const UserOrdersPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const basket = useAppSelector((state) => state.basket.basket);
  const { statuses } = useAppSelector((state) => state.statuses);

  useEffect(() => {
    void dispatch(getBasket());
  }, [dispatch]);

  let orders = [];
  if (basket) {
    orders = basket.Orders.filter((order) => order.statusId !== 1);
  }

  const getStatusName = (statusId) => {
    const status = statuses.find((status) => status.id === statusId);
    return status ? status.name : 'Unknown status';
  };

  return (
    <div className="user-orders-page">
      <h1 className="page-title">Заказы</h1>
      {orders.length === 0 ? (
        <p className="empty-message">Сейчас нет заказов.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-item">
            <h2 className="order-id">Заказ #{order.id}</h2>
            <p className="order-status">Статус: {getStatusName(order.statusId)}</p>
            <p className="order-total">Итого: {order.totalPrice} ₽</p>
            {order.OrderLines.map((ordLine) => (
              <UserOrderItem key={ordLine.id} ordLine={ordLine} />
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default UserOrdersPage;
