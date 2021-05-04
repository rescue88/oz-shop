import { FC } from 'react';

import NavbarItem from './NavbarItem/NavbarItem';

const Navbar: FC = () => {
    return (
        <nav className="userNav">
            <div className="userNav__section">
                <div className="userNav__section_header">
                    До покупок
                </div>
                <hr/>
                <div className="userNav__section_menu">
                    <NavbarItem pageLink="" pageName="Головна" />
                    <NavbarItem pageLink="products" pageName="Товари" />    
                    <NavbarItem pageLink="discount" pageName="Знижки" />
                </div>
            </div>
            <div className="userNav__section">
                <div className="userNav__section_header">
                    Додаткова інформація
                </div>
                <hr/>
                <div className="userNav__section_menu">
                    <NavbarItem pageLink="delivery" pageName="Доставка та оплата" />
                    <NavbarItem pageLink="guarantee" pageName="Гарантія" />
                    <NavbarItem pageLink="covid" pageName="Відповідь COVID-19" />
                </div>
            </div>
        </nav>
    )
}

export default Navbar;