import { FC } from 'react';
import { useSelector } from 'react-redux';
import { StateType } from '../../../../types/stateTypes';

type ProductTabButtonsType = {
    productId: string;
    isFetching: boolean;
    addToFavorites: () => void;
    addToCart?: () => void;
}

const ProductTabButtons: FC<ProductTabButtonsType> = ({productId, isFetching, addToFavorites}) => {
    const {favorites} = useSelector((state: StateType) => state.user);

    return (
        <div className="product__content_buttons">
            <div>
                <button 
                    className="wishlistBtn borderRadius" 
                    type="button"
                    onClick={addToFavorites}
                    disabled={isFetching || favorites.map(item => item._id).includes(productId)}
                >
                    До заміток
                </button>
            </div>
            <div>
                <button 
                    className="cartBtn borderRadius" 
                    type="button"
                >
                    До корзини
                </button>
            </div>
        </div>
    );
}

export default ProductTabButtons;