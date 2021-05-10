import { FC } from 'react';

import ProductsPageFilters from './ProductsPageFilters/ProductsPageFilters';
import ProductsPageItem from './ProductsPageItem/ProductsPageItem';

const ProductPage: FC = () => {
    return (
        <div className="productsPage">
            <ProductsPageFilters />
            <div className="productsPage__content">
                <div className="productsPage__content_header">Сторінка товарів</div>
                <div className="productsPage__content_items">
                    <ProductsPageItem />
                </div>
            </div>
        </div>
    );
}

export default ProductPage;