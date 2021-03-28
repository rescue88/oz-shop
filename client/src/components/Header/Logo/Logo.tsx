import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import st from './../Header.module.css';
import logo from './../../../assets/icons/logo.svg';

const Logo: FC = () => {
    return (
        <NavLink className={st.header__logoBlock} to="/app">
            <div className={st.img}>
                <img src={logo} alt=""/>
            </div>
            <div className={st.name}>
                OZ Shop
            </div>
        </NavLink>
    )
}

export default Logo;