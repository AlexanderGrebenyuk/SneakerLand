import React from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../../app/store/store';
import { NavLink } from 'react-router-dom';
import { logoutThunk } from '../../../entities/users/authSlice';
import './Navbar.css';
import logo3 from '../../../../public/logo3.png';

type NavbarProps = {};
const Navbar = ({}: NavbarProps): JSX.Element => {
  const { user } = useAppSelector((state: RootState) => state.user);
  const likes = useAppSelector((state) => state.likes.likes);
  const dispatch = useAppDispatch();
  console.log(likes); //счетчик лайков сделать

  const onHandleLogout = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    dispatch(logoutThunk());
  };

  return (
    <nav className="Navbar">
      <div className="nav-section nav-left">
        <NavLink to="/">Главная</NavLink>
        <NavLink to="/sneakers">Кроссовки</NavLink>
      </div>
      <div className="nav-section nav-center">
        <img src={logo3} alt="logo" />
      </div>
      <div className="nav-section nav-right">
        {user && !user?.isAdmin && (
          <>
            <NavLink to="/favorites">Избранное</NavLink>
            <NavLink to="/cart">Корзина</NavLink>
          </>
        )}

        {user && user.isAdmin && <NavLink to="/orders">Заказы</NavLink>}

        {user ? (
          <NavLink to="/" onClick={onHandleLogout}>
            Выход
          </NavLink>
        ) : (
          <>
            <NavLink to="/signIn">Войти</NavLink>
            <NavLink to="/signUp">Зарегистрироваться</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
