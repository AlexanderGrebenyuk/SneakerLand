import React from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../../app/store/store';
import { NavLink, useNavigate } from 'react-router-dom';
import { logoutThunk } from '../../../entities/users/authSlice';
import './Navbar.css';
import logo3 from '../../../../public/logo3.png';
import { clearBasket } from '../../../entities/basket/adminBasketSlice';

type NavbarProps = {
  setActivePoisk: any;
};
const Navbar = ({ setActivePoisk }: NavbarProps): JSX.Element => {
  const { user } = useAppSelector((state: RootState) => state.user);
  console.log(user);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const onHandleLogout = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    void dispatch(logoutThunk());
    dispatch(clearBasket());
    navigate('/sneakers')
  };

  return (
    <nav className="Navbar">
      <div className="nav-section nav-left">
        <NavLink to="/sneakers">Главная</NavLink>
      </div>
      <div className="nav-section nav-center">
        <img src={logo3} alt="logo" />
      </div>
      <div className="nav-section nav-right">
        {user ? (
          <>
            {!user.isAdmin && (
              <>
                <button
                  className="buttonSearch"
                  onClick={() => setActivePoisk((prev: boolean) => !prev)}
                >
                  <img src="../../../../public/search.png" alt="lupa" style={{ height: '30px' }} />
                </button>
                <NavLink to="/favorites">Избранное</NavLink>
                <NavLink to="/basket">Корзина</NavLink>
                <NavLink to="/userOrders">История заказов</NavLink>
              </>
            )}
            {user.isAdmin && <NavLink to="/orders">Заказы</NavLink>}
            <NavLink to="/" onClick={onHandleLogout}>
              Выход
            </NavLink>
          </>
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