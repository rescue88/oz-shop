import { FC } from 'react';
import NavIcon from './../NavIcon';
import { NavLink } from 'react-router-dom';

import st from './../Navbar.module.css';

type NavbarItemType = {
    pageLink: string;
    pageName: string;
    pageLinkIsExact?: boolean | false;
}

const NavbarItem: FC<NavbarItemType> = ({pageName, pageLink, pageLinkIsExact}) => {
    return (
        <div className={st.nav__item}>
            <NavLink to={`/app/${pageLink}`} activeClassName={st.nav__itemActive} exact={pageLinkIsExact}>
                <div className={st.icon}><NavIcon /></div>
                <div className={st.page}>{pageName}</div>
            </NavLink>
        </div>
    );
}

export default NavbarItem;