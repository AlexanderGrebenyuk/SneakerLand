import React, { useState } from 'react';
import { Sneaker } from '../types/sneakerType';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store/store';
import SizeItem from '../../sizes/ui/SizeItem';
import { createLikeThunk, removeLikeThunk } from '../../like/likeSlice';
import ModalWindow from '../../../shared/ui/modal/Modal';

type SneakerItemPageProps = {
  sneaker: Sneaker;
};

// const Sizes = [37,38,39,40,41,42,43,44,45];

const SneakerItemPage = ({ sneaker }: SneakerItemPageProps): JSX.Element => {
  const navigate = useNavigate();
  const likes = useAppSelector((state) => state.likes.likes);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [active, setActive] = useState<boolean>(false);

  const onToggle = (): void => {
    setActive((prev) => !prev);
  };

  const onHandleAddLike = (): void => {
    void dispatch(createLikeThunk({ sneakerId: sneaker.id, Sneaker: sneaker }));
  };

  const onHandleDeleteLike = (): void => {
    void dispatch(removeLikeThunk(sneaker.id));
  };

  const like = likes.find((el) => el.sneakerId === sneaker.id && el.userId === user?.id);

  return (
    <div className=" SneakerItemPage">
      <div className="SneakerPageImages">
        {sneaker.Images.map((image) => (
          <img key={image.id} src={image.link} alt={sneaker.model} />
        ))}
      </div>
      <div className="SneakerItemPageDescription">
        <h3>{sneaker.Brand.name}</h3>
        <h5>Описание</h5>
        <p>Цвет: {sneaker.Color.name}</p>
        <p>Описание товара: {sneaker.description}</p>
        <p>Цена: {sneaker.price} ₽</p>
      </div>
      <div className="SneakerItemPageForBasket">
        <p>{sneaker.model}</p>
        {user && !user.isAdmin && (
          <>
            <button type="button" onClick={() => setActive((prev) => !prev)}>
              Добавить в корзину
            </button>
            <ModalWindow active={active} onToggle={onToggle}>
              <SizeItem />
            </ModalWindow>
            {like === undefined ? (
              <button onClick={onHandleAddLike}>
                <img src="../../../../public/icons/icons8-червы-50.png" alt="like" />
              </button>
            ) : (
              <button onClick={onHandleDeleteLike}>
                <img src="../../../../public/icons/icons8-лайк-с-заливкой-48.png" alt="liked" />
              </button>
            )}
          </>
        )}
      </div>
      <button type="button" onClick={() => navigate(-1)}>
        Назад
      </button>
    </div>
  );
};
export default SneakerItemPage;
