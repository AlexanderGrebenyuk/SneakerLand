import React from 'react';
import { useAppSelector } from '../../app/store/store';
import BasketItem from '../../entities/basket/ui/BasketItem';
// import { getBasketThunk } from '../../entities/basket/basketSlice';

const BasketPage = (): JSX.Element => {
  // const { user } = useAppSelector((state) => state.user);
  const { order } = useAppSelector((state) => state.basket);
  // const dispatch = useAppDispatch();

  console.log('order', order);

  return (
    <div className=" BasketPage">
      {order && order.map((ord) => <BasketItem key={ord.id} ord={ord} />)}
    </div>
  );
};
export default BasketPage;
