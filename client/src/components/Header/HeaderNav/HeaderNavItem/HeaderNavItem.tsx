import { FC } from 'react';
import { useSelector } from 'react-redux';
import { StateType } from '../../../../types/stateTypes';

type HeaderNavItemType = {
    Icon: FC;
    name: string;
}

const HeaderNavItem: FC<HeaderNavItemType> = ({Icon, name}) => {
    const { totalCount } = useSelector(({cart}: StateType) => cart);

    return (
        <div className={`header__bar_item centered-col`}>
            <div>
                <Icon />
            </div>
            <div>
                {name}
            </div>
            {
                name === 'Корзина' && (
                    <div className={`cart-items centered-row ${totalCount > 0 && 'active-cart'}`}>{totalCount}</div>
                )
            }
        </div>
    )
}

export default HeaderNavItem;