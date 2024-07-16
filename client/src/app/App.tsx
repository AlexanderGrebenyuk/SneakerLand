import React, { useEffect } from 'react';
import AppRoutes from './providers/router/AppRoutes';
import Navbar from '../widgets/ui/navbar/Navbar';
import { useAppDispatch } from './store/store';
import { refreshTokens } from '../entities/users/authSlice';
import { getSneakersThunk } from '../entities/sneakers/sneakerSlice';
import { getLikeThunk } from '../entities/like/likeSlice';
import './styles/index.css';
import { getSizeThunk } from '../entities/sizes/sizeSlice';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getSneakersThunk());
    void dispatch(refreshTokens());
    void dispatch(getLikeThunk());
    void dispatch(getSizeThunk())
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <AppRoutes />
    </div>
  );
}

export default App;
