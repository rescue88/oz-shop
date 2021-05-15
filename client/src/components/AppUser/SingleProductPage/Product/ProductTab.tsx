import { FC } from 'react';

import { convertBuffer } from '../../../../assets/helpers/helpers';
import { ProductItemType } from '../../../../types/stateTypes';
import defaultProduct from './../../../../assets/images/defaultProduct.png';
import ProductTabAvailable from './ProductTabAvailable';
import ProductTabButtons from './ProductTabButtons';
import ProductTabPrice from './ProductTabPrice';

type ProductTabType = {
    product: ProductItemType;
}

const Product: FC<ProductTabType> = ({product}) => {
    const isAvailable = Boolean(product.amount);

    return (
        <div className="singleProduct__content_product product">
            <div className="product__image">
                <img src={product.image.data ? convertBuffer(product.image.data.data) : defaultProduct} alt="" />
            </div>
            <div className="product__content">
                <ProductTabAvailable available={isAvailable} />
                <div className="product__content_description">
                    {product.description}
                </div>
                <ProductTabButtons />
                <div className="product__content_characteristics">
                    <div>Кількість на складі: <span>{product.amount}</span></div>
                    <div>Категорія: <span>{product.category}</span></div>
                    <div>Виробник: <span>{product.producer}</span></div>
                    <div>Габарити: <span>{product.size}</span></div>
                </div>
                <ProductTabPrice price={product.price} />
            </div>
        </div>
    );
}

export default Product;