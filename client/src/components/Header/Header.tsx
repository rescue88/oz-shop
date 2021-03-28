import { FC } from 'react';
import st from './Header.module.css';
import HeaderNav from './HeaderNav/HeaderNav';
import Logo from './Logo/Logo';
import SearchForm from './SearchForm/SearchForm';

const Header: FC = () => {
    return (
        <header className={st.header}>
            <Logo />
            <SearchForm />
            <HeaderNav />
        </header>
    );
}

export default Header;