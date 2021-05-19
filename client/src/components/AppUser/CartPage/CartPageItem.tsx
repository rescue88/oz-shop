import { FC } from 'react';
import CloseIcon from '../../common/Icons/CloseIcon';
import MinusIcon from '../../common/Icons/MinusIcon';
import PlusIcon from '../../common/Icons/PlusIcon';

import defaultProduct from './../../../assets/images/defaultProduct.png';

const CartPageItem: FC = () => {
    return (
        <div className="cartItem">
            <div className="cartItem__image">
                <img src={defaultProduct} alt="product to buy" />
            </div>
            <div className="cartItem__name">Холодильник Samsung A5</div>
            <div className="cartItem__amount centered-row">
                <button className="minusBtn opacity" type="button">
                    <MinusIcon />
                </button>
                <div className="cartItem__amount_number">10</div>
                <button className="plusBtn opacity" type="button">
                    <PlusIcon />
                </button>
            </div>
            <button className="cartItem__delete opacity"><CloseIcon /></button>
        </div>
    );
}

export default CartPageItem;