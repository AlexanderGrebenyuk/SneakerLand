import { Sneaker, SneakerId } from '../../sneakers/types/sneakerType';
import { UserId } from '../../users/types/userTypes';

export type Like = {
  id: number;
  userId: UserId;
  sneakerId: SneakerId;
  Sneaker: Sneaker;
};
export type LikeId = Like['id'];
export type LikeWithoutId = Omit<Like, 'id'>;
export type LikeWithoutIdAndUserId = Omit<LikeWithoutId, 'userId'>;
