import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { addToFavoritesHelper } from '../../../../assets/helpers/helpers';
import { ProductItemType, StateType } from '../../../../types/stateTypes';
import Rating from '../../../common/Rating/Rating';
import defaultProduct from './../../../../assets/images/defaultProduct.png';

type ProductsPageItemType = {
    product: ProductItemType
}

const ProductsPageItem: FC<ProductsPageItemType> = ({product}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const {favorites} = useSelector((state: StateType) => state.user);

    const addToFavoritesHandler = async () => {
        setIsLoading(true);

        await addToFavoritesHelper(dispatch, product);

        setIsLoading(false);
    }

    return (
        <div className={`itemContainer ${isLoading ? 'disable-clicks' : ''}`}>
            <NavLink className="item" to={`/app/products/${product._id}`}>
                <div className="item__picture centered-row">
                    <img src={defaultProduct} alt="product" />
                </div>
                <div className="item__ratePrice space-betw-row">
                    <Rating rating={4} />
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
                    onClick={addToFavoritesHandler}
                    disabled={favorites.map(item => item._id).includes(product._id) ? true : false}
                >
                    <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 
                            27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 
                            98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z">
                        </path>
                    </svg>
                    В замітки
                </button>
                <button 
                    className="itemContainer__buttons_cart cartBtn" 
                    type="button"
                    disabled={isLoading}
                >
                    <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450.391 450.391">
                        <g>
                            <path d="M143.673,350.322c-25.969,0-47.02,21.052-47.02,47.02c0,25.969,21.052,47.02,47.02,47.02
                                c25.969,0,47.02-21.052,47.02-47.02C190.694,371.374,169.642,350.322,143.673,350.322z M143.673,423.465
                                c-14.427,0-26.122-11.695-26.122-26.122c0-14.427,11.695-26.122,26.122-26.122c14.427,0,26.122,11.695,26.122,26.122
                                C169.796,411.77,158.1,423.465,143.673,423.465z"/>
                            <path d="M342.204,350.322c-25.969,0-47.02,21.052-47.02,47.02c0,25.969,21.052,47.02,47.02,47.02s47.02-21.052,47.02-47.02
                                C389.224,371.374,368.173,350.322,342.204,350.322z M342.204,423.465c-14.427,0-26.122-11.695-26.122-26.122
                                c0-14.427,11.695-26.122,26.122-26.122s26.122,11.695,26.122,26.122C368.327,411.77,356.631,423.465,342.204,423.465z"/>
                            <path d="M448.261,76.037c-2.176-2.377-5.153-3.865-8.359-4.18L99.788,67.155L90.384,38.42
                                C83.759,19.211,65.771,6.243,45.453,6.028H10.449C4.678,6.028,0,10.706,0,16.477s4.678,10.449,10.449,10.449h35.004
                                c11.361,0.251,21.365,7.546,25.078,18.286l66.351,200.098l-5.224,12.016c-5.827,15.026-4.077,31.938,4.702,45.453
                                c8.695,13.274,23.323,21.466,39.184,21.943h203.233c5.771,0,10.449-4.678,10.449-10.449c0-5.771-4.678-10.449-10.449-10.449
                                H175.543c-8.957-0.224-17.202-4.936-21.943-12.539c-4.688-7.51-5.651-16.762-2.612-25.078l4.18-9.404l219.951-22.988
                                c24.16-2.661,44.034-20.233,49.633-43.886l25.078-105.012C450.96,81.893,450.36,78.492,448.261,76.037z M404.376,185.228
                                c-3.392,15.226-16.319,26.457-31.869,27.69l-217.339,22.465L106.58,88.053l320.261,4.702L404.376,185.228z"/>
                        </g>
                    </svg>
                    В корзину
                </button>
            </div>
        </div>
    );
}

export default ProductsPageItem;