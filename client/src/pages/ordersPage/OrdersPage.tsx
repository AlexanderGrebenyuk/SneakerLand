import React from 'react';
import './styles/OrdersPage.css';
import { useAppSelector } from '../../app/store/store';

type OrdersPageProps = {};
const OrdersPage = ({}: OrdersPageProps): JSX.Element => {

  const orders = useAppSelector((state) => state.adminBasket.orders);



console.log(orders, 1211111111111111);







  return (
  
<div className="OrdersPage">


</div>
  )
}
export default OrdersPage;
