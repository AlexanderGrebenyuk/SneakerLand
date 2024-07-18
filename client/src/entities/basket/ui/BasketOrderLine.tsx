import React from 'react';
import { OrderLine } from '../types/basketTypes';


type BasketOrderLineProps={
    ordLine: OrderLine
}
const BasketOrderLine= ({ordLine}: BasketOrderLineProps): JSX.Element =>{
return (
<div className='OrderLine'>
    {ordLine &&
    <>
     <div className="OrderLineImages">
         <img src={`http://localhost:3000/${ordLine.Sneaker.Images[0]}`} alt="image" />
      </div>
      <p>Кол-во: {ordLine.count}</p>
      <p>Цена: {ordLine.priceLine}</p>
      <p>Размер: {ordLine.Sneaker.Size.size}</p>
      <p>Пол: {ordLine.Sneaker.Sex.title}</p>

      <div></div>
    </>
    

    }
 </div>
 );

}
export default BasketOrderLine
