import React from 'react';
import { Sneaker } from '../types/sneakerType';
import './styles/SneakerItem.css';
import { useAppSelector } from '../../../app/store/store';

type SneakerItemProps = {
  // sneaker: Sneaker;
  sneak: Sneaker;
};
const SneakerItem = ({ sneak }: SneakerItemProps): JSX.Element => {
  console.log(sneak);

  const { user } = useAppSelector((state) => state.user);

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
          <button>Изменить</button>
          <button>Удалить </button>
        </>
      )}
    </div>
  );
};
export default SneakerItem;
