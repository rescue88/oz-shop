import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { NavbarType } from '../../../../types/common';

const NavbarItem: FC<NavbarType> = ({NavIcon, pageName, pageLink}) => {
    return (
        <div className="main-nav__item">
            <NavLink exact to={`/app/${pageLink}`} activeClassName="activeNavLink">
                <div className="main-nav__item_icon"><NavIcon /></div>
                <div className="main-nav__item_page">{pageName}</div>
            </NavLink>
        </div>
    );
}

export default NavbarItem;