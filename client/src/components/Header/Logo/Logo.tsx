import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import logo from './../../../assets/icons/logo.svg';

const Logo: FC = () => {
    return (
        <NavLink className="header__logo centered-row" to="/app">
            <div className="header__logo_img">
                <img src={logo} alt=""/>
            </div>
            <div className="header__logo_name">
                OZ<br/><span>Магазин побутових<br/>товарів</span>
            </div>
        </NavLink>
    )
}

export default Logo;