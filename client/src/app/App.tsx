import React, { useEffect, useState } from 'react';
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
import Footer from '../widgets/Footer/Footer';
import { getBasketThunk } from '../entities/basket/basketSlice';
import './App.css'
import { getStatusThunk } from '../entities/status/statusSlice';




function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const [activePoisk , setActivePoisk]= useState<boolean>(false)

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
    void dispatch(getBasketThunk())
    void dispatch(getStatusThunk())
  }, [dispatch]);

  return (
    <div className="App">
    <Navbar setActivePoisk={setActivePoisk} />
    <div className="main-content">
      <AppRoutes activePoisk={activePoisk} />
    </div>
    <Footer />
  </div>
  );
}

export default App;
