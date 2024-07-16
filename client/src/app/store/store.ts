import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import authSlice from '../../entities/users/authSlice';
import sneakerSlice from '../../entities/sneakers/sneakerSlice';
import likeSlice from '../../entities/like/likeSlice';
import filterSlice from '../../entities/filter/filterSlice';
import sizeSlice from '../../entities/sizes/sizeSlice';


const store = configureStore({
  reducer: {
    user: authSlice.reducer,
    sneakers: sneakerSlice.reducer,
    likes: likeSlice.reducer,
    filters: filterSlice.reducer,
    sizes: sizeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export type StoreType = typeof store;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
