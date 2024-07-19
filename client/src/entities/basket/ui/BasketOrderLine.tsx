import React from 'react';
import { OrderLine } from '../types/basketTypes';
import './styles/OrderLine.css';

type BasketOrderLineProps = {
  ordLine: OrderLine;
};

const BasketOrderLine = ({ ordLine }: BasketOrderLineProps): JSX.Element => {
  console.log(123);
  console.log('ORDERLINE', ordLine);

  return (
    <div className="BasketContainer">
      <div className="BasketLeft">
        <div className="OrderLine">
          {ordLine && (
            <>
              <div className="OrderLineImages">
                <img src={`http://localhost:3000/${ordLine.Sneaker.Images[0].link}`} alt="image" />
              </div>
              <div className="OrderLineDetails">
                <p>Кол-во: {ordLine.count}</p>
                <p>Цена: {ordLine.priceLine}</p>
                <p>Размер: {ordLine.Sneaker.Size.size}</p>
                <p>Пол: {ordLine.Sneaker.Sex.title}</p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="BasketRight">
        <h2>Сумма заказа</h2>
        <div className="OrderSummary">
          <p>Количество товара: {ordLine.count}</p>
          <p>Общая сумма: {ordLine.count * ordLine.priceLine} руб.</p>
        </div>
        <div className="TotalSummary">
          <h3>Итого</h3>
          <p>{ordLine.count * ordLine.priceLine} руб.</p>
        </div>
      </div>
    </div>
  );
};

export default BasketOrderLine;
