import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { convertBuffer } from '../../../assets/helpers/helpers';
import { DiscountItemType } from '../../../types/stateTypes';

type DiscountPageItemType = {
    discount: DiscountItemType
}

const DiscountPageItem: FC<DiscountPageItemType> = ({discount}) => {
    return (
        <NavLink to="app" className="discountItem borderRadius">
            <div className="discountItem__image"><img src={convertBuffer(discount.image.data.data)} alt="discount" /></div>
            <div className="discountItem__name">{discount.name}</div>
            <div className="discountItem__description">{discount.description}</div>
            <div className="discountItem__percent">{discount.percent}%</div>
        </NavLink>
    );
}

export default DiscountPageItem;