import React, { useState } from 'react';
import { Sneaker } from '../types/sneakerType';
import './styles/SneakerItem.css';
import { useAppDispatch, useAppSelector } from '../../../app/store/store';
import { useNavigate } from 'react-router-dom';
import { removeSneakerThunk } from '../sneakerSlice';
import ModalWindow from '../../../shared/ui/modal/Modal';
import FormUpdateSneaker from './FormUpdateSneaker';

type SneakerItemProps = {
  // sneaker: Sneaker;
  sneak: Sneaker;
};
const SneakerItem = ({ sneak }: SneakerItemProps): JSX.Element => {

  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  const onHandleDelete = (): void => {
    void dispatch(removeSneakerThunk(sneak.id));
  };

  const onToggle = (): void => {
    setActive((prev) => !prev);
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
      {user?.isAdmin ? (
        <>
          <button type="button" onClick={() => setActive((prev) => !prev)}>Обновить</button>
          <ModalWindow active={active} onToggle={onToggle}>
            <FormUpdateSneaker sneak={sneak}/>
          </ModalWindow>
          <button type="button" onClick={onHandleDelete}>
            Удалить
          </button>
        </>
      ): (<button onClick={() => navigate(`/sneakers/${sneak.id}`)}>Подробнее</button>)}
      
    </div>
  );
};
export default SneakerItem;
