import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { convertBuffer } from '../../../assets/helpers/helpers';
import { CartProdutType } from '../../../types/stateTypes';
import CloseIcon from '../../common/Icons/CloseIcon';
import MinusIcon from '../../common/Icons/MinusIcon';
import PlusIcon from '../../common/Icons/PlusIcon';
import defaultProduct from './../../../assets/images/defaultProduct.png';

type CartPageItemType = {
    productItems: Array<CartProdutType>;
    increaseAmount: (productId: string) => void;
    decreaseAmount: (productId: string) => void;
    deleteProduct: (productId: string) => void;
}

const CartPageItem: FC<CartPageItemType> = ({productItems, increaseAmount, decreaseAmount, deleteProduct}) => {
    const singleProduct = productItems[0];

    return (

        <div className="cartItem">
            <NavLink to={`/app/products/${singleProduct._id}`} className="cartItem__image">
                <img src={singleProduct.image.data ? convertBuffer(singleProduct.image.data.data) : defaultProduct} alt="product to buy" />
            </NavLink>
            <div className="cartItem__name">{singleProduct.name}</div>
            <div className="cartItem__amount centered-row">
                <button 
                    className="minusBtn high-opacity" 
                    type="button"
                    onClick={() => decreaseAmount(singleProduct._id)}
                    disabled={productItems.length === 1}
                >
                    <MinusIcon />
                </button>
                <div className="cartItem__amount_number">{productItems.length}</div>
                <button 
                    className="plusBtn high-opacity" 
                    type="button" 
                    onClick={() => increaseAmount(singleProduct._id)}
                    disabled={singleProduct.amount === productItems.length}
                >
                    <PlusIcon />
                </button>
            </div>
            <div className="cartItem__price">
                ₴{singleProduct.price * productItems.length}
            </div>
            <button className="cartItem__delete high-opacity" onClick={() => deleteProduct(singleProduct._id)}><CloseIcon /></button>
        </div>
    );
}

export default CartPageItem;