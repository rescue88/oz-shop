import { FC } from 'react';

import NavAdminItem from './NavAdminItem/NavAdminItem';
import UserSettingsIcon from './NavAdminIcon/UserSettingsIcon';
import DiscountSettingsIcon from './NavAdminIcon/DiscountSettingsIcon';
import ProductSettingsIcon from './NavAdminIcon/ProductSettingsIcon';
import StatsIcon from './NavAdminIcon/StatsIcon';
import OrderSettingsIcon from './NavAdminIcon/OrderSettingsIcon';

const NavbarAdmin: FC = () => {
    return (
        <nav className="main-nav">
            <div className="main-nav__section">
                <div className="main-nav__section_header">
                    Редагування
                </div>
                <hr/>
                <div className="main-nav__section_menu">
                    <NavAdminItem NavIcon={UserSettingsIcon} pageLink="" pageName="Користувачі" />
                    <NavAdminItem NavIcon={DiscountSettingsIcon} pageLink="discounts" pageName="Знижки" />
                    <NavAdminItem NavIcon={ProductSettingsIcon} pageLink="products" pageName="Продукти" />
                    <NavAdminItem NavIcon={OrderSettingsIcon} pageLink="orders" pageName="Замовлення" />
                </div>
            </div>
            <div className="main-nav__section">
                <div className="main-nav__section_header">
                    Довідка
                </div>
                <hr/>
                <div className="main-nav__section_menu">
                    <NavAdminItem NavIcon={StatsIcon} pageLink="stats" pageName="Статистика" />
                </div>
            </div>
        </nav>
    );
}

export default NavbarAdmin;