import { FC } from 'react';

import NavbarItem from './NavbarItem/NavbarItem';
import NavIcon from './NavIcon/NavIcon';

const Navbar: FC = () => {
    return (
        <nav className="main-nav">
            <div className="main-nav__section">
                <div className="main-nav__section_header">
                    До покупок
                </div>
                <hr/>
                <div className="main-nav__section_menu">
                    <NavbarItem NavIcon={NavIcon} pageLink="" pageName="Головна" />
                    <NavbarItem NavIcon={NavIcon} pageLink="products" pageName="Товари" />    
                    <NavbarItem NavIcon={NavIcon} pageLink="discount" pageName="Знижки" />
                </div>
            </div>
            <div className="main-nav__section">
                <div className="main-nav__section_header">
                    Додаткова інформація
                </div>
                <hr/>
                <div className="main-nav__section_menu">
                    <NavbarItem NavIcon={NavIcon} pageLink="delivery" pageName="Доставка та оплата" />
                    <NavbarItem NavIcon={NavIcon} pageLink="guarantee" pageName="Гарантія" />
                    <NavbarItem NavIcon={NavIcon} pageLink="covid" pageName="Відповідь COVID-19" />
                </div>
            </div>
        </nav>
    )
}

export default Navbar;