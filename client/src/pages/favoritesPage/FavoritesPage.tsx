
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import SneakerItem from '../../entities/sneakers/ui/SneakerItem';
import { Like } from '../../entities/like/types/likeTypes'; // Убедитесь, что путь правильный

const FavoritesPage = (): JSX.Element => {
  const { user } = useSelector((state: RootState) => state.user);
  const { likes } = useSelector((state: RootState) => state.likes);
  const { sneakers } = useSelector((state: RootState) => state.sneakers);

const  favorite=()=>{
      return likes.filter((el: Like) => el.userId === user?.id)
}
const  favoriteSneak = () =>{
      return favoriteLikes?.map((like: Like) => sneakers?.find((sneaker) => sneaker?.id === like?.sneakerId))
}



  const favoriteLikes = favorite()
  const favoriteSneakers  = favoriteSneak()


useEffect(()=>{
    favorite()
    favoriteSneak()
},[ ])


  return (
    <div className="FavoritesPage">
      {favoriteSneakers &&  (
        favoriteSneakers.map((sneaker) => 
          <SneakerItem  sneaker={sneaker}  key={sneaker?.id} />
        )
      ) }
    </div>
  );
};

export default FavoritesPage;
