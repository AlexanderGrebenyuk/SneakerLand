import React, { useState } from 'react';
import { Sneaker } from '../types/sneakerType';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store/store';
import SizeItem from '../../sizes/ui/SizeItem';
import { createLikeThunk, removeLikeThunk } from '../../like/likeSlice';
import ModalWindow from '../../../shared/ui/modal/Modal';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './styles/SneakerItemPage.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

type SneakerItemPageProps = {
  sneaker: Sneaker;
};

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
    <div className="SneakerItemPage">
      <div className="SneakerPageImages">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {sneaker.Images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={`http://localhost:3000/${image.link}`} alt={`sneaker-image-${index}`} className="d-block w-100" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="SneakerItemPageContent">
        <div className="SneakerItemPageDescription">
          <h3>{sneaker.Brand.name}</h3>
          <h5>{sneaker.model}</h5>
          <p>Цвет: {sneaker.Color.name}</p>
          <p>Описание товара: {sneaker.description}</p>
          <p style={{ fontSize: '20px', color: 'black', marginTop: '20px' }}>Цена: {sneaker.price} ₽</p>
        </div>
        <div className="SneakerItemPageForBasket">
          {user && !user.isAdmin && (
            <>
              <button className="add-to-cart-button" type="button" onClick={() => setActive((prev) => !prev)}>
                Добавить в корзину
              </button>
              <ModalWindow active={active} onToggle={onToggle}>
                <SizeItem sneaker={sneaker} onToggle={onToggle} />
              </ModalWindow>
              {like === undefined ? (
                <button className="like-button" onClick={onHandleAddLike}>
                  <img src="/icons/icons8-червы-50.png" alt="like" />
                </button>
              ) : (
                <button className="liked-button" onClick={onHandleDeleteLike}>
                  <img src="/icons/icons8-лайк-с-заливкой-48.png" alt="liked" />
                </button>
              )}
            </>
          )}
        </div>
        <button className="back-button" type="button" onClick={() => navigate(-1)}>
          Назад
        </button>
      </div>
    </div>
  );
};

export default SneakerItemPage;
