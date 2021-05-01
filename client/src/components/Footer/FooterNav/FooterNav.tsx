import { FC } from 'react';
import { NavLink } from 'react-router-dom';

const FooterNav: FC = () => {
    return (
        <nav className="footer__menu">
            <ul>
                <li className="footer__menu_item"><NavLink to="/app/use">Умови використання сайту</NavLink></li>
                <li className="footer__menu_item"><NavLink to="/app/sponsor">Спонсори</NavLink></li>
                <li className="footer__menu_item"><NavLink to="/app/about">Про нас</NavLink></li>
                <li className="footer__menu_item"><NavLink to="/app/contacts">Контакти</NavLink></li>
            </ul>
        </nav>
    );
}

export default FooterNav;