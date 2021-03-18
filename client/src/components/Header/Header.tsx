import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { Select } from 'antd';

import st from './Header.module.css';
import logo from './../../assets/images/logo.svg';
import cart from './../../assets/images/cart.svg';

const { Option } = Select;

const Header: React.FC = () => {
    const [dropdownValue, setDropdownValue] = useState('');

    function handleChange(value: any) {
        setDropdownValue(value);
        console.log(value);
    }

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
                    <Select
                        className={st.select}
                        dropdownClassName={st.select__dropdown}
                        defaultActiveFirstOption={true}
                        style={{ width: 120, background: '#0F1642' }} 
                        onChange={handleChange}
                        allowClear
                    >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                </div>
            </div>
        </header>
    );
}

export default Header;