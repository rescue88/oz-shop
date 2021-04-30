import { FC } from 'react';

import HeaderNav from './HeaderNav/HeaderNav';
import Logo from './Logo/Logo';
import SearchForm from './SearchForm/SearchForm';

const Header: FC = () => {
    return (
        <header className="header space-betw-row">
            <Logo />
            <SearchForm />
            <HeaderNav />
        </header>
    );
}

export default Header;