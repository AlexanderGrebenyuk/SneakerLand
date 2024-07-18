import React from 'react';
import { Basket } from '../types/basketTypes';
import BasketOrderLine from './BasketOrderLine';


type BasketItemProps={
    ord: Basket
}
const BasketItem= ({ord}: BasketItemProps): JSX.Element =>{



return (
<div className=' BasketItem'>
    {ord && ord.OrderLines.map((ordLine) => <BasketOrderLine key={ordLine.id} ordLine={ordLine}/>)
    }
    <p>ИТОГО: {ord.totalPrice} ₽</p>

    {/* Тут нужно вытащить статус заказа (наименование) из БД */}
    <p>Статус заказа: {ord.statusId}</p> 
    {/* Удаление из БД? */}
    <button>Оплатить</button>
 </div>
 );

}
export default BasketItem
