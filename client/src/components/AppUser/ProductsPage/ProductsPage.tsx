import { useEffect } from 'react';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../redux/reducers/productReducer';
import { StateType } from '../../../types/stateTypes';
import ProductItemLoader from '../../common/Loader/ProductItemLoader';

import ProductsPageFilters from './ProductsPageFilters/ProductsPageFilters';
import ProductsPageItem from './ProductsPageItem/ProductsPageItem';

const ProductPage: FC = () => {
    const dispatch = useDispatch();
    const products = useSelector((state: StateType) => state.product.products);

    const getProductsHandler = async () => {
        await dispatch(getProducts());
    }

    useEffect(() => {
        getProductsHandler();
    }, []);

    return (
        <div className="productsPage">
            <ProductsPageFilters />
            <div className="productsPage__content">
                <div className="productsPage__content_header">Наявні товари</div>
                <div className="productsPage__content_items space-betw-row">
                    {
                        products.length 
                            ? products.map(item => <ProductsPageItem key={item._id} product={item} />)
                            : Array(6).fill(0).map((item, idx) => <ProductItemLoader key={idx} /> )
                    }
                </div>
            </div>
        </div>
    );
}

export default ProductPage;