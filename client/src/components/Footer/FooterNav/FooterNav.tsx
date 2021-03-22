import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import st from './../Footer.module.css';

const FooterNav: FC = () => {
    return (
        <nav className={st.footer__menu}>
            <ul>
                <li className={st.menu__item}><NavLink to="/app/use">Умови використання сайту</NavLink></li>
                <li className={st.menu__item}><NavLink to="/app/sponsor">Спонсори</NavLink></li>
                <li className={st.menu__item}><NavLink to="/app/about">Про нас</NavLink></li>
                <li className={st.menu__item}><NavLink to="/app/contacts">Контакти</NavLink></li>
            </ul>
        </nav>
    );
}

export default FooterNav;