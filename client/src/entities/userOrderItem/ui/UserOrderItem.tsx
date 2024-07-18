import React from 'react';
import { OrderLine } from '../../basket/types/basketTypes';

type UserOrderItemProps = {
  ordLine: OrderLine;
};
const UserOrderItem = ({ ordLine }: UserOrderItemProps): JSX.Element => {

    // console.log(ordLine.Sneaker.Images[0]);
    
  return (
    <div className=" UserOrderItem">
      {ordLine && (
        <>
          <div className="OrderLineImages">
            <img src={`http://localhost:3000/${ordLine.Sneaker.Images[0]}`} alt="image" />
          </div>
          <p>Кол-во: {ordLine.count}</p>
          <div></div>
        </>
      )}
    </div>
  );
};
export default UserOrderItem;
