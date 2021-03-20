import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import st from './Navbar.module.css';
import NavAdminItem from './NavAdminItem/NavAdminItem';
import UserSettingsIcon from './NavAdminIcon/UserSettingsIcon';
import DiscountSettingsIcon from './NavAdminIcon/DiscountSettingsIcon';
import ProductSettingsIcon from './NavAdminIcon/ProductSettingsIcon';
import StatsIcon from './NavAdminIcon/StatsIcon';

const NavbarAdmin: FC = () => {
    return (
        <nav className={st.nav}>
            <NavLink to="/admin/user" activeClassName={st.nav__itemActive}>
                <NavAdminItem NavIcon={UserSettingsIcon} pageName="Користувачі" />
            </NavLink>
            <NavLink to="/admin/discount" activeClassName={st.nav__itemActive}>
                <NavAdminItem NavIcon={DiscountSettingsIcon} pageName="Знижки" />
            </NavLink>
            <NavLink to="/admin/product" activeClassName={st.nav__itemActive}>
                <NavAdminItem NavIcon={ProductSettingsIcon} pageName="Продукти" />
            </NavLink>
            <NavLink to="/admin/statistic" activeClassName={st.nav__itemActive}>
                <NavAdminItem NavIcon={StatsIcon} pageName="Статистика" />
            </NavLink>
        </nav>
    );
}

export default NavbarAdmin;