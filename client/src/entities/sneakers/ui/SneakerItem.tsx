import React, { useState } from 'react';
import { Sneaker, SneakerId } from '../types/sneakerType';
import './styles/SneakerItem.css';
import { useAppDispatch, useAppSelector } from '../../../app/store/store';
import { createLikeThunk, removeLikeThunk } from '../../like/likeSlice';
import { useNavigate } from 'react-router-dom';
import { removeSneakerThunk } from '../sneakerSlice';
import Carusel from '../../../shared/ui/carusel/Carusel';
import ModalWindow from '../../../shared/ui/modal/Modal';
// import FormUpdateSneaker from './FormUpdateSneaker';



type SneakerItemProps = {
  sneak: Sneaker
};
const SneakerItem = ({ sneak }: SneakerItemProps): JSX.Element => {
  const likes = useAppSelector((state) => state.likes.likes)
  const {user} = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

     
  const onHandleAddLike =(): void => {
    void dispatch(createLikeThunk({sneakerId: sneaker.id}))
  }
  const like =  likes.find((el)=> el.sneakerId === sneaker.id && el.userId === user?.id )
  
  const onHandleDeleteLike =  (): void => {
    void dispatch(removeLikeThunk(sneaker.id))
    
      const onHandleDelete = (): void => {
    void dispatch(removeSneakerThunk(sneak.id));
  };

  const onToggle = (): void => {
    setActive((prev) => !prev);
 


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
      
        {like === undefined ? (
          <button onClick={onHandleAddLike}>
        <img src='../../../../public/icons/icons8-червы-50.png' alt =''/>
        </button>
        ):
        (
          <button onClick={onHandleDeleteLike}>
          <img src='../../../../public/icons/icons8-лайк-с-заливкой-48.png' alt = 'like'/>
          </button>
        )
        }
      
    </div>
  );
};
export default SneakerItem;
