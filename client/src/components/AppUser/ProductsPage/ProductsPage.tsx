import { FC } from 'react';

import ProductsPageFilters from './ProductsPageFilters/ProductsPageFilters';
import ProductsPageItem from './ProductsPageItem/ProductsPageItem';

const ProductPage: FC = () => {
    return (
        <div className="productsPage">
            <ProductsPageFilters />
            <div className="productsPage__content">
                <div className="productsPage__content_header">Наявні товари</div>
                <div className="productsPage__content_items space-betw-row">
                    {
                        Array(10).fill(3).map((item, idx) => <ProductsPageItem key={idx} /> )
                    }
                </div>
            </div>
        </div>
    );
}

export default ProductPage;