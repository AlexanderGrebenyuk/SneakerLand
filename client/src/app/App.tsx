import React, { useEffect } from 'react';
import AppRoutes from './providers/router/AppRoutes';
import Navbar from '../widgets/ui/navbar/Navbar';
import { useAppDispatch } from './store/store';
import { refreshTokens } from '../entities/users/authSlice';
import { getSneakersThunk } from '../entities/sneakers/sneakerSlice';
import { getLikeThunk } from '../entities/like/likeSlice';
import './styles/index.css';
import { getSizeThunk } from '../entities/sizes/sizeSlice';
import { getBrandThunk } from '../entities/brand/brandSlice';
import { getSexThunk } from '../entities/sex/sexSlice';
import { getColorThunk } from '../entities/color/colorSlice';
import { getSexThunk } from '../entities/sexes/sexSlice';


function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getSneakersThunk());
    void dispatch(refreshTokens());
    void dispatch(getLikeThunk());
    void dispatch(getSizeThunk());
    void dispatch(getBrandThunk());
    void dispatch(getSexThunk())
    void dispatch(getColorThunk())
    void dispatch(getSizeThunk())
    void dispatch(getSexThunk())
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <AppRoutes />
    </div>
  );
}

export default App;
