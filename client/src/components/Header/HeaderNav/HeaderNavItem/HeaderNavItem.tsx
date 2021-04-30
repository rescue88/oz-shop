import { FC } from 'react';

type HeaderNavItemType = {
    Icon: FC;
    name: string;
}

const HeaderNavItem: FC<HeaderNavItemType> = ({Icon, name}) => {
    const itemsCount = 0;

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
                    <div className={`cart-items centered-row ${itemsCount > 0 && 'active-cart'}`}>{itemsCount}</div>
                )
            }
        </div>
    )
}

export default HeaderNavItem;