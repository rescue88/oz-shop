import { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';

import HeaderNavItem from './HeaderNavItem/HeaderNavItem';
import HeaderNavCartIcon from './Icons/HeaderNavCartIcon';
import HeaderNavNotificationIcon from './Icons/HeaderNavNotificationIcon';
import HeaderNavProfileIcon from './Icons/HeaderNavProfileIcon';
import HeaderNavSignInIcon from './Icons/HeaderNavSignInIcon';
import HeaderNavSignOutIcon from './Icons/HeaderNavSignOutIcon';

const HeaderNav: FC = () => {
    const [isAuth, setIsAuth] = useState<boolean>(false);

    return (
        <nav className="header__bar">
            <ul>
                <li className="header__bar_link">
                    <NavLink to="/app/cart">
                        <HeaderNavItem Icon={HeaderNavCartIcon} name="Корзина" />
                    </NavLink>
                </li>
                {
                    isAuth && (
                        <>
                            <li className="header__bar_link">
                                <NavLink to="/app/profile">
                                    <HeaderNavItem Icon={HeaderNavProfileIcon} name="Профіль" />
                                </NavLink>
                            </li>
                            <li className="header__bar_link">
                                <NavLink to="/app/notification">
                                    <HeaderNavItem Icon={HeaderNavNotificationIcon} name="Сповіщення" />
                                </NavLink>
                            </li>
                        </>
                    )
                }
                <li className="header__bar_link">
                    <NavLink to={`/app/${isAuth? 'logout': 'login'}`}>
                        <HeaderNavItem Icon={isAuth? HeaderNavSignOutIcon : HeaderNavSignInIcon} name={isAuth ? 'Вийти': 'Увійти'} />
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default HeaderNav;