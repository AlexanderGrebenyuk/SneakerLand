import React from 'react';
import { useAppSelector } from '../../app/store/store';
import SneakerItem from '../../entities/sneakers/ui/SneakerItem';
import './styles/FavoritesPage.css';

const FavoritesPage = (): JSX.Element => {
  const likes = useAppSelector((state) => state.likes.likes);
  const {user} = useAppSelector((state) => state.user)

  return (
    <div className="FavoritesPage">
      {likes && likes.map((like) => like.userId === user?.id ? <SneakerItem sneak={like.Sneaker} key={like.id} /> : (<></>))}
    </div>
  );
};

export default FavoritesPage;
