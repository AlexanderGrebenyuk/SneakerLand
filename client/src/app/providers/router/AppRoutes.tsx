import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RegistrationPage from '../../../pages/authPages/RegistrationPage';
import AuthorizationPage from '../../../pages/authPages/AuthorizationPage';
import SneakersPage from '../../../pages/sneakerPages/SneakersPage';
import FavoritesPage from '../../../pages/favoritesPage/FavoritesPage';
import SneakerPage from '../../../pages/sneakerPages/SneakerPage';
import Page404 from '../../../pages/page404/page404';
import OrdersPage from '../../../pages/ordersPage/OrdersPage';


type AppRoutesProps = {};
const AppRoutes = ({}: AppRoutesProps): JSX.Element => {
  return (
    <Routes>
      <Route path="/signIn" element={<AuthorizationPage />} />
      <Route path="/signUp" element={<RegistrationPage />} />
      <Route path='/sneakers' element={<SneakersPage/>}/>
      <Route path='/sneakers/:sneakerId' element={<SneakerPage/>}/>
      <Route path='/favorites' element={<FavoritesPage/>}/>
      <Route path='/orders' element={<OrdersPage/>}/>
      <Route path='*' element={<Page404/>}/>
    </Routes>
  );
};
export default AppRoutes;
