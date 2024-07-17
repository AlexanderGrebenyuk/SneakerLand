import React from 'react';
import { useAppSelector } from '../../app/store/store';
import SneakerItem from '../../entities/sneakers/ui/SneakerItem';
import './styles/FavoritesPage.css'
//import { Like } from '../../entities/like/types/likeTypes'; // Убедитесь, что путь правильный

const FavoritesPage = (): JSX.Element => {
  const { user } = useAppSelector((state) => state.user);
  const likes = useAppSelector((state) => state.likes.likes);


  return (
    <div className="FavoritesPage">
      {likes && likes.map((like) => <SneakerItem sneak={like.Sneaker} key={like.id} />)}
    </div>
  );
};

export default FavoritesPage;
