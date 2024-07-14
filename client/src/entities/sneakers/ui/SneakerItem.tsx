import React from 'react';
import { Sneaker } from '../types/sneakerType';
import './styles/SneakerItem.css';
import { useAppDispatch, useAppSelector } from '../../../app/store/store';
import { useNavigate } from 'react-router-dom';
import { removeSneakerThunk } from '../sneakerSlice';

type SneakerItemProps = {
  // sneaker: Sneaker;
  sneak: Sneaker;
};
const SneakerItem = ({ sneak }: SneakerItemProps): JSX.Element => {
  console.log(sneak);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onHandleDelete = (): void => {
    void dispatch(removeSneakerThunk(sneak.id));
  };

  return (
    <div className="SneakerItem">
      <div className="SneakerImages">
        {sneak.Images.map((image) => (
          <img key={image.id} src={image.link} alt={sneak.model} />
        ))}
      </div>
      <h3>{sneak.Brand.name}</h3>
      <p>{sneak.model}</p>
      <p>{sneak.price} ₽</p>
      {user?.isAdmin && (
        <>
          <button type="button">Изменить</button>
          <button type="button" onClick={onHandleDelete}>
            Удалить
          </button>
        </>
      )}

      {/* Доделать страницу товара */}
      <button onClick={() => navigate(`/sneakers/${sneak.id}`)}>Подробнее</button>
    </div>
  );
};
export default SneakerItem;
