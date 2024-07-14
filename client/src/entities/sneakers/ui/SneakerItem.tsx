import React from 'react';
import { Sneaker } from '../types/sneakerType';
import './styles/SneakerItem.css';
import { useAppDispatch, useAppSelector } from '../../../app/store/store';
import { useNavigate } from 'react-router-dom';
import { removeSneakerThunk } from '../sneakerSlice';
import Carusel from '../../../shared/ui/carusel/Carusel';

type SneakerItemProps = {
  // sneaker: Sneaker;
  sneak: Sneaker;
};
const SneakerItem = ({ sneak }: SneakerItemProps): JSX.Element => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onHandleDelete = (): void => {
    void dispatch(removeSneakerThunk(sneak.id));
  };

  return (
    <div className="SneakerItem">
      <Carusel sneak={sneak} />
      <h3>{sneak.Brand.name}</h3>
      <p>{sneak.model}</p>
      <p>{sneak.price} ₽</p>
      {user?.isAdmin && (
        <>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <button type="button" style={{ borderRadius: '20px' }}>
              Изменить
            </button>
            <button type="button" style={{ borderRadius: '20px' }} onClick={onHandleDelete}>
              Удалить
            </button>
          </div>
        </>
      )}

      {/* Доделать страницу товара */}
      <button
        onClick={() => navigate(`/sneakers/${sneak.id}`)}
        style={{ justifyContent: 'center', margin: '10px', borderRadius: '20px' }}
      >
        Подробнее
      </button>
    </div>
  );
};
export default SneakerItem;
