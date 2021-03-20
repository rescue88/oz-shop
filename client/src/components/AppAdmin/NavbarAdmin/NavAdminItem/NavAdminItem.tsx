import { FC } from 'react';

import st from './../Navbar.module.css';

type NavAdminItemType = {
    NavIcon: FC;
    pageName: string;
}

const NavAdminItem: FC<NavAdminItemType> = ({NavIcon, pageName}) => {
    return (
        <div className={st.nav__item}>
            <div className={st.icon}>
                <NavIcon />
            </div>
            <div className={st.page}>
                {`${pageName}`}
            </div>
        </div>
    );
}

export default NavAdminItem;