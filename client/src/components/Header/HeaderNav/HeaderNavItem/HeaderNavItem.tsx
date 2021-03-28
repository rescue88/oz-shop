import { FC } from 'react';
import st from './../../Header.module.css';

type HeaderNavItemType = {
    Icon: FC;
    name: string;
}

const HeaderNavItem: FC<HeaderNavItemType> = ({Icon, name}) => {
    return (
        <div className={st.linkBlock}>
            <div>
                <Icon />
            </div>
            <div>
                {name}
            </div>
        </div>
    )
}

export default HeaderNavItem;