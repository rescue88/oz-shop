import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import NavIcon from './NavIcon';

type NavbarItemType = {
    pageLink: string;
    pageName: string;
}

const NavbarItem: FC<NavbarItemType> = ({pageName, pageLink}) => {
    return (
        <div className="userNav__item">
            <NavLink exact to={`/app/${pageLink}`} activeClassName="activeUserNavLink">
                <div className="userNav__item_icon"><NavIcon /></div>
                <div className="userNav__item_page">{pageName}</div>
            </NavLink>
        </div>
    );
}

export default NavbarItem;