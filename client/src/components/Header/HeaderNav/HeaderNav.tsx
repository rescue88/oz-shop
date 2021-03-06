import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import HeaderNavItem from './HeaderNavItem/HeaderNavItem';
import HeaderNavCartIcon from './Icons/HeaderNavCartIcon';
import HeaderNavProfileIcon from './Icons/HeaderNavProfileIcon';
import HeaderNavSignInIcon from './Icons/HeaderNavSignInIcon';
import HeaderNavSignOutIcon from './Icons/HeaderNavSignOutIcon';
import HeaderNavAdminIcon from './Icons/HeaderNavAdminIcon';
import { StateType } from '../../../types/stateTypes';
import { signOut } from '../../../redux/reducers/authReducer';
import { clearUserData } from '../../../redux/reducers/userReducer';
import { setSnackbar } from '../../../redux/reducers/snackbarReducer';
import { clearRating } from '../../../redux/reducers/ratingReducer';

const HeaderNav: FC = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector((state: StateType) => state.auth.isAuth);
    const permissions = useSelector((state: StateType) => state.user.permissions);

    const logoutHandler = () => {
        dispatch(signOut());
        dispatch(clearUserData());
        dispatch(clearRating());
        dispatch(setSnackbar(true, 'info', 'Сподіваємось, що ви повернетесь.'));
    }

    return (
        <nav className="header__bar">
            <ul>
                {
                    isAuth && permissions === 'admin' && (
                        <li className="header__bar_link">
                            <NavLink exact to="/admin">
                                <HeaderNavItem Icon={HeaderNavAdminIcon} name="Адмін-панель" />
                            </NavLink>
                        </li>
                    )
                }
                <li className="header__bar_link">
                    <NavLink exact to="/app/cart">
                        <HeaderNavItem Icon={HeaderNavCartIcon} name="Корзина" />
                    </NavLink>
                </li>
                {
                    isAuth && (
                        <>
                            <li className="header__bar_link">
                                <NavLink exact to="/app/profile">
                                    <HeaderNavItem Icon={HeaderNavProfileIcon} name="Профіль" />
                                </NavLink>
                            </li>
                            <li className="header__bar_link">
                                <button type="button" onClick={logoutHandler}>
                                    <HeaderNavItem Icon={HeaderNavSignOutIcon} name='Вийти' />
                                </button>
                            </li>
                        </>
                    )
                }
                {
                    !isAuth && (
                        <li className="header__bar_link">
                            <NavLink exact to='/app/login'>
                                <HeaderNavItem Icon={HeaderNavSignInIcon} name='Увійти' />
                            </NavLink>
                        </li>
                    )
                }
            </ul>
        </nav>
    );
}

export default HeaderNav;