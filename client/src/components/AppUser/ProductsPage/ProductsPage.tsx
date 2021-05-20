import { useState, useCallback, useEffect } from 'react';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addToCartHelper, addToFavoritesHelper } from '../../../assets/helpers/helpers';
import { getProducts } from '../../../redux/reducers/productReducer';
import { CartProdutType, ProductItemType, StateType } from '../../../types/stateTypes';
import ProductItemLoader from '../../common/Loader/ProductItemLoader';
import ProductsPageFilters from './ProductsPageFilters/ProductsPageFilters';
import ProductsPageItem from './ProductsPageItem/ProductsPageItem';

const ProductPage: FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const {products} = useSelector((state: StateType) => state.product);

    const getProductsHandler = useCallback(async () => {
        await dispatch(getProducts());
    }, [dispatch]);

    const addToFavoritesHandler = useCallback(async (product: ProductItemType) => {
        setIsLoading(true);

        await addToFavoritesHelper(dispatch, product);

        setIsLoading(false);
    }, [dispatch]);

    const addProductToCartHandler = (product: CartProdutType) => {
        addToCartHelper(dispatch, product);
    }

    useEffect(() => {
        getProductsHandler();
    }, [getProductsHandler, addToFavoritesHandler]);

    return (
        <div className="productsPage">
            <ProductsPageFilters />
            <div className="productsPage__content">
                <div className="productsPage__content_header">Наявні товари</div>
                <div className="productsPage__content_items space-betw-row">
                    {
                        products.length 
                            ? products.map(item => (
                                <ProductsPageItem 
                                    key={item._id} 
                                    product={item}
                                    isLoading={isLoading}
                                    addToFavorites={addToFavoritesHandler}
                                    addToCart={addProductToCartHandler}
                                />
                            ))
                            : Array(6).fill(0).map((item, idx) => <ProductItemLoader key={idx} /> )
                    }
                </div>
            </div>
        </div>
    );
}

export default ProductPage;