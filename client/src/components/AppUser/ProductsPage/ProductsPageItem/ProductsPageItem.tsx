import { FC } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { convertBuffer } from '../../../../assets/helpers/helpers';
import { CartProdutType, ProductItemType, StateType } from '../../../../types/stateTypes';
import CartRegularIcon from '../../../common/Icons/CartRegularIcon';
import HeartIcon from '../../../common/Icons/HeartIcon';
import Rating from '../../../common/Rating/Rating';
import defaultProduct from './../../../../assets/images/defaultProduct.png';

type ProductsPageItemType = {
    product: ProductItemType;
    isLoading: boolean;
    addToFavorites: (product: ProductItemType) => void;
    addToCart: (product: CartProdutType) => void;
}

const ProductsPageItem: FC<ProductsPageItemType> = ({product, isLoading, addToFavorites, addToCart}) => {
    const {favorites} = useSelector((state: StateType) => state.user);
    const {isAuth} = useSelector((state: StateType) => state.auth);
    const cartItems = useSelector((state: StateType) => state.cart.items);

    const addToCartHandler = () => {
        const obj: CartProdutType = {
            _id: product._id,
            image: product.image,
            name: product.name,
            price: product.price,
            amount: product.amount
        }

        addToCart(obj);
    }

    return (
        <div className={`itemContainer ${isLoading ? 'disable-click' : ''}`}>
            <NavLink className="item" to={`/app/products/${product._id}`}>
                <div className="item__picture centered-row">
                    <img src={product.image.data ? convertBuffer(product.image.data.data) : defaultProduct} alt="product" />
                </div>
                <div className="item__ratePrice space-betw-row">
                    <Rating rating={product.rating} />
                    <div className="item__ratePrice_price">
                        ₴{product.price}
                    </div>
                </div>
                <div className="item__name">
                    <div className="item__name_header">{product.name}</div>
                    <div className="item__name_subheader">{product.description}</div>
                </div>
            </NavLink>
            <div className="itemContainer__buttons">
                <button 
                    className="itemContainer__buttons_wishlist wishlistBtn" 
                    type="button" 
                    onClick={() => addToFavorites(product)}
                    disabled={favorites.map(item => item._id).includes(product._id) || !isAuth || isLoading}
                >
                    <HeartIcon />
                    В замітки
                </button>
                <button 
                    className="itemContainer__buttons_cart cartBtn" 
                    type="button"
                    onClick={addToCartHandler}
                    disabled={cartItems.map(item => item._id).includes(product._id) || isLoading}
                >
                    <CartRegularIcon />
                    В корзину
                </button>
            </div>
        </div>
    );
}

export default ProductsPageItem;