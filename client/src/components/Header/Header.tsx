import React from 'react';
import { NavLink } from 'react-router-dom';
import { Select, MenuItem, InputLabel } from '@material-ui/core';

import st from './Header.module.css';
import logo from './../../assets/icons/logo.svg';

const Header: React.FC = () => {
    return (
        <header className={st.header}>
            <NavLink className={st.header__logoBlock} to="/app">
                <div className={st.img}>
                    <img src={logo} alt=""/>
                </div>
                <div className={st.name}>
                    OZ Shop
                </div>
            </NavLink>
            <div className={st.searchBlock}>
                <div className={st.searchBlock__category}>
                <InputLabel id="demo-controlled-open-select-label">Age</InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    // open={open}
                    // onClose={handleClose}
                    // onOpen={handleOpen}
                    // value={age}
                    // onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                </div>
            </div>
        </header>
    );
}

export default Header;