//@ts-nocheck
import React, { useState } from 'react';
import { updateOrderAdminThunk } from '../adminBasketSlice';
import { useAppDispatch } from '../../../app/store/store';
import './styles/BasketContainer.css';

const AdminOrdenItem = ({ sneakers, status }) => {
  const [orderStatus, setOrderStatus] = useState('');
  const dispatch = useAppDispatch();

  const onHendeleSelect = (status) => {
    let id;
    switch (status) {
      case 'В пути':
        id = 2;
        break;
      case 'Доставлено':
        id = 3;
        break;
      default:
        return;
    }
    void dispatch(updateOrderAdminThunk(id));
  };

  return (
    <div className="BasketContainer">
      {sneakers.map((el) => (
        <div key={el.id}>
          <p>{el.Sneaker.price} p.</p>
          <p>{el.Sneaker.model}</p>
        </div>
      ))}
      <select
        defaultValue={status && status.name}
        onChange={(e) => onHendeleSelect(e.target.value)}
      >
        <option value="Передаётся в доставку">Передаётся в доставку</option>
        <option value="В пути">В пути</option>
        <option value="Доставлено">Доставлено</option>
      </select>
    </div>
  );
};

export default AdminOrdenItem;
