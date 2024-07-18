import React from 'react';
import { useAppSelector } from '../../app/store/store';
import UserOrderItem from '../../entities/userOrderItem/ui/UserOrderItem';

const UserOrdersPage = (): JSX.Element => {
  const { order } = useAppSelector((state) => state.basket);
  const { statuses } = useAppSelector((state) => state.statuses);

  const orderStatus = statuses.filter((ordStat) => ordStat.id === order?.statusId);
  console.log('USERORDERPAGE', order);

  return (
    <div className=" UserOrdersPage">
      {order && (
        <>
          {order.OrderLines.map((ordLine) => (
            <UserOrderItem key={ordLine.id} ordLine={ordLine} />
          ))}

          <p>ИТОГО: {order.totalPrice} ₽</p>
          <p>Статус заказа: {orderStatus && orderStatus.map((ord) => ord.name).join(', ')}</p>
        </>
      )}
    </div>
  );
};
export default UserOrdersPage;
