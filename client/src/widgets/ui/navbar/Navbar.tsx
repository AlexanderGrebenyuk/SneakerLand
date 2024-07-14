import React from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../../app/store/store';
import { NavLink } from 'react-router-dom';
import { logoutThunk } from '../../../entities/users/authSlice';
import './Navbar.css';

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
      <div className="header">
        <h1>SneakerLand</h1>
      </div>
      <ul>
        <li>
          <NavLink to="/">Главная</NavLink>
        </li>
        <li>
          <NavLink to="/sneakers">Кроссовки</NavLink>
        </li>
        <li>
          <NavLink to="/favorites">Избранное</NavLink>
        </li>
        <li>
          <NavLink to="/cart">Корзина</NavLink>
        </li>
        {user ? (
          <li>
            <NavLink to="/" onClick={onHandleLogout}>
              Выход
            </NavLink>
          </li>
        ) : (
          <>
            <li>
              <NavLink to="/signIn">Войти</NavLink>
            </li>
            <li>
              <NavLink to="/signUp">Зарегистрироваться</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
export default Navbar;
