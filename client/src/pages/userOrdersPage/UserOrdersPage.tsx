import React from 'react';
import { useAppSelector } from '../../app/store/store';



const UserOrdersPage= (): JSX.Element =>{

    const {basket} = useAppSelector((state) => state.basket)
    console.log(basket);
    

    
return (
<div className=' UserOrdersPage'>
 </div>
 );

}
export default UserOrdersPage
