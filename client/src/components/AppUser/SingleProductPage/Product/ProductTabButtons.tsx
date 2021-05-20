import { FC } from 'react';
import { useSelector } from 'react-redux';
import { StateType } from '../../../../types/stateTypes';
import CartRegularIcon from '../../../common/Icons/CartRegularIcon';
import HeartIcon from '../../../common/Icons/HeartIcon';

type ProductTabButtonsType = {
    productId: string;
    isFetching: boolean;
    addToFavorites: () => void;
    addToCart: () => void;
}

const ProductTabButtons: FC<ProductTabButtonsType> = ({productId, isFetching, addToFavorites, addToCart}) => {
    const {favorites} = useSelector((state: StateType) => state.user);
    const {isAuth} = useSelector((state: StateType) => state.auth);
    const cartItems = useSelector((state: StateType) => state.cart.items);

    return (
        <div className="product__content_buttons">
            <div>
                <button 
                    className="wishlistBtn borderRadius centered-row" 
                    type="button"
                    onClick={addToFavorites}
                    disabled={isAuth || isFetching || favorites.map(item => item._id).includes(productId)}
                >
                    <HeartIcon />
                    До заміток
                </button>
            </div>
            <div>
                <button 
                    className="cartBtn borderRadius centered-row" 
                    type="button"
                    onClick={addToCart}
                    disabled={isFetching || cartItems.map(item => item._id).includes(productId)}
                >
                    <CartRegularIcon />
                    До корзини
                </button>
            </div>
        </div>
    );
}

export default ProductTabButtons;