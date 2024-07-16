import React from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../../app/store/store';
import { NavLink } from 'react-router-dom';
import { logoutThunk } from '../../../entities/users/authSlice';
import './Navbar.css';
import logo2 from '../../../../public/logo2.png';


type NavbarProps = {};
const Navbar = ({}: NavbarProps): JSX.Element => {
  const { user } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

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
      <img src={logo2} alt="logo"/>
    </div>
    <div className="nav-section nav-right">
      <NavLink to="/favorites">Избранное</NavLink>
      <NavLink to="/cart">Корзина</NavLink>
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
