import { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import st from './../Header.module.css';
import HeaderNavItem from './HeaderNavItem/HeaderNavItem';
import HeaderNavCartIcon from './Icons/HeaderNavCartIcon';
import HeaderNavNotificationIcon from './Icons/HeaderNavNotificationIcon';
import HeaderNavProfileIcon from './Icons/HeaderNavProfileIcon';
import HeaderNavSignInIcon from './Icons/HeaderNavSignInIcon';
import HeaderNavSignOutIcon from './Icons/HeaderNavSignOutIcon';

const HeaderNav: FC = () => {
    const [isAuth, setIsAuth] = useState<boolean>(false);

    return (
        <nav className={st.headerNav}>
            <ul>
                <li>
                    <NavLink className={st.link} to="/app/cart">
                        <HeaderNavItem Icon={HeaderNavCartIcon} name="Корзина" />
                    </NavLink>
                </li>
                {
                    isAuth && (
                        <>
                            <li>
                                <NavLink className={st.link} to="/app/profile">
                                    <HeaderNavItem Icon={HeaderNavProfileIcon} name="Профіль" />
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={st.link} to="/app/notification">
                                    <HeaderNavItem Icon={HeaderNavNotificationIcon} name="Сповіщення" />
                                </NavLink>
                            </li>
                        </>
                    )
                }
                <li>
                    <NavLink className={st.link} to={`/app/${isAuth? 'login': 'logout'}`}>
                        <HeaderNavItem Icon={isAuth? HeaderNavSignOutIcon : HeaderNavSignInIcon} name={isAuth ? 'Вийти': 'Увійти'} />
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default HeaderNav;