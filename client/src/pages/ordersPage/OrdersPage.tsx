
//@ts-nocheck
import './styles/OrdersPage.css';
import { useAppSelector } from '../../app/store/store';
import AdminOrdenItem from '../../entities/basket/ui/AdminOrderItem';





type OrdersPageProps = {};
const OrdersPage  = ({}: OrdersPageProps): JSX.Element => {

  const orders = useAppSelector((state) => state.adminBasket.orders);

console.log(464646464, orders);





  return (
  
<div className="OrdersPage">
{orders?.map((arr)=> <AdminOrdenItem  sneakers={arr.OrderLines} status={arr.Status}/>)}


</div>
)
}
export default OrdersPage;

{/* <select >{orders?.map((el)=> <option value={`${el.Status.name}`}>{`${el.Status.name}`}</option>)} */}