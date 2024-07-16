import React from 'react';
import { Sneaker, SneakerId } from '../types/sneakerType';
import './styles/SneakerItem.css';
import { RootState, useAppDispatch } from '../../../app/store/store';
import { createLikeThunk, removeLikeThunk } from '../../like/likeSlice';
import { useSelector } from 'react-redux';




type SneakerItemProps = {
  sneaker: Sneaker
};
const SneakerItem = ({ sneaker }: SneakerItemProps): JSX.Element => {
  const likes = useSelector((state: RootState) => state.likes.likes)
  const user = useSelector((state: RootState) => state.user.user)
  const dispatch = useAppDispatch()
     
  const onHandleAddLike =(): void => {
    void dispatch(createLikeThunk({sneakerId: sneaker.id}))
  }
  const like =  likes.find((el)=> el.sneakerId === sneaker.id && el.userId === user?.id )
  
  const onHandleDelete =  (): void => {
    void dispatch(removeLikeThunk(sneaker.id))
 
  };

  return (
    <div className="SneakerItem">
      <div className="SneakerImages">
        {sneaker.Images.map((image) => (
          <img key={image.id} src={image.link} alt={sneaker.model} />
        ))}
      </div>
      <h3>{sneaker.Brand.name}</h3>
      <p>{sneaker.model}</p>
      <p>{sneaker.price}</p>

      
        {like === undefined ? (
          <button onClick={onHandleAddLike}>
        <img src='../../../../public/icons/icons8-червы-50.png' alt =''/>
        </button>
        ):
        (
          <button onClick={onHandleDelete}>
          <img src='../../../../public/icons/icons8-лайк-с-заливкой-48.png' alt = 'like'/>
          </button>
        )
        }
      
    </div>
  );
};
export default SneakerItem;
