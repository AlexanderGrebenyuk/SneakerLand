//@ts-nocheck
import './styles/OrdersPage.css';
import { useAppDispatch, useAppSelector } from '../../app/store/store';
import AdminOrdenItem from '../../entities/basket/ui/AdminOrderItem';
import { useEffect } from 'react';
import { getBasketsAdminThunk } from '../../entities/basket/adminBasketSlice';

type OrdersPageProps = {};
const OrdersPage = ({}: OrdersPageProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.adminBasket.orders);

  useEffect(() => {
    void dispatch(getBasketsAdminThunk());
  }, []);

  console.log(464646464, orders);

  return (
    <div className="OrdersPage">
      {orders?.map((arr) => (
        <AdminOrdenItem sneakers={arr.OrderLines} status={arr.Status} key={arr.id} />
      ))}
    </div>
  );
};
export default OrdersPage;

{
  /* <select >{orders?.map((el)=> <option value={`${el.Status.name}`}>{`${el.Status.name}`}</option>)} */
}
