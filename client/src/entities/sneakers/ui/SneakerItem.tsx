import React, { useState } from 'react';
import { Sneaker } from '../types/sneakerType';
import './styles/SneakerItem.css';
import { useAppDispatch, useAppSelector } from '../../../app/store/store';
import { useNavigate } from 'react-router-dom';
import { removeSneakerThunk } from '../sneakerSlice';
import Carusel from '../../../shared/ui/carusel/Carusel';
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
      <Carusel sneak={sneak} />
      <h3>{sneak.Brand.name}</h3>
      <p>{sneak.model}</p>
      <p>{sneak.price} ₽</p>
      {user?.isAdmin ? (
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
