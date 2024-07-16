import React, { useState } from 'react';
import { Sneaker } from '../types/sneakerType';
import './styles/SneakerItem.css';
import { useAppDispatch, useAppSelector } from '../../../app/store/store';
import { createLikeThunk, removeLikeThunk } from '../../like/likeSlice';
import { useNavigate } from 'react-router-dom';
import { removeSneakerThunk } from '../sneakerSlice';
import Carusel from '../../../shared/ui/carusel/Carusel';
// import ModalWindow from '../../../shared/ui/modal/Modal';
// import FormUpdateSneaker from './FormUpdateSneaker';

type SneakerItemProps = {
  sneak: Sneaker;
};

const SneakerItem = ({ sneak }: SneakerItemProps): JSX.Element => {
  const likes = useAppSelector((state) => state.likes.likes);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
console.log(active);


  const onHandleAddLike = (): void => {
    void dispatch(createLikeThunk({ sneakerId: sneak.id, Sneaker: sneak }));
  };

  const onHandleDeleteLike = (): void => {
    void dispatch(removeLikeThunk(sneak.id));
  };

  const onHandleDelete = (): void => {
    void dispatch(removeSneakerThunk(sneak.id));
  };


  // МОДАЛКА ДЛЯ ОБНОВЛЕНИЯ 
  // const onToggle = (): void => {
  //   setActive((prev) => !prev);
  // };

  const like = likes.find((el) => el.sneakerId === sneak.id && el.userId === user?.id);

  return (
    <div className="SneakerItem">
      <Carusel sneak={sneak} />
      <h3>{sneak.Brand.name}</h3>
      <p>{sneak.model}</p>
      <p>{sneak.price} ₽</p>

      {user?.isAdmin ? (
        <>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <button
              type="button"
              style={{ borderRadius: '20px' }}
              onClick={() => setActive((prev) => !prev)}
            >
              Обновить
            </button>
            {/* <ModalWindow active={active} onToggle={onToggle}>
              <FormUpdateSneaker sneak={sneak} />
            </ModalWindow> */}
            <button type="button" style={{ borderRadius: '20px' }} onClick={onHandleDelete}>
              Удалить
            </button>
          </div>
          {/* ДОДЕЛАТЬ СТРАНИЦУ ДУРА!!!! */}
        </>
      ) : (
        <button
          onClick={() => navigate(`/sneakers/${sneak.id}`)}
          style={{ justifyContent: 'center', margin: '10px', borderRadius: '20px' }}
        >
          Подробнее
        </button>
      )}

      {!user?.isAdmin &&
        (like === undefined ? (
          <button className="action-button" onClick={onHandleAddLike}>
            <img src="../../../../public/icons/icons8-червы-50.png" alt="like" style={{height: '40px'}}/>
          </button>
        ) : (
          <button className="action-button" onClick={onHandleDeleteLike}>
            <img src="../../../../public/icons/icons8-лайк-с-заливкой-48.png" alt="liked" style={{height: '40px'}}/>
          </button>
        ))}
    </div>
  );
};

export default SneakerItem;
