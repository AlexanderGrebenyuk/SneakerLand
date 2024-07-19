import React from 'react';
import { OrderLine } from '../../basket/types/basketTypes';


type UserOrderItemProps = {
  ordLine: OrderLine;
};
const UserOrderItem = ({ ordLine }: UserOrderItemProps): JSX.Element => {

    // console.log(ordLine.Sneaker.Images[0]);
    
  return (
    <div className="UserOrderItem">
      {ordLine && (
        <>
          <div className="OrderLineImages">
            <img style={{height: '150px'}} src={`http://localhost:3000/${ordLine.Sneaker.Images[0].link}`} alt="image" />
          </div>
          <p>Кол-во: {ordLine.count}</p>
          <div></div>
        </>
      )}
    </div>
  );
};
export default UserOrderItem;
