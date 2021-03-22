import { FC } from 'react';

import st from './Navbar.module.css';
import NavbarItem from './NavbarItem/NavbarItem';

const Navbar: FC = () => {
    return (
        <nav className={st.nav}>
            <div className={st.nav__block}>
                <div className={st.header}>
                    Головні сторінки
                </div>
                <hr/>
                <div className={st.menu}>
                    <NavbarItem pageLink="" pageName="Стартова сторінка" pageLinkIsExact={true} />
                    <NavbarItem pageLink="products" pageName="Товари" />
                    <NavbarItem pageLink="cart" pageName="Корзина" />
                    <NavbarItem pageLink="discount" pageName="Знижки" />
                </div>
            </div>
            <div className={st.nav__block}>
                <div className={st.header}>
                    Категорії товарів
                </div>
                <hr/>
                <div className={st.menu}>
                    <NavbarItem pageLink="kitchen-prod" pageName="Для кухні" />
                    <NavbarItem pageLink="home-prod" pageName="Для дому" />
                    <NavbarItem pageLink="climate-prod" pageName="Кліматична техніка" />
                    <NavbarItem pageLink="accessories-prod" pageName="Аксесуари для гаджетів" />
                    <NavbarItem pageLink="hygiene-prod" pageName="Особиста гігієна" />
                </div>
            </div>
            <div className={st.nav__block}>
                <div className={st.header}>
                    Інформація
                </div>
                <hr/>
                <div className={st.menu}>
                    <NavbarItem pageLink="delivery" pageName="Доставка та оплата" />
                    <NavbarItem pageLink="guarantee" pageName="Гарантія" />
                    <NavbarItem pageLink="covid" pageName="Відповідь COVID-19" />
                </div>
            </div>
        </nav>
    )
}

export default Navbar;