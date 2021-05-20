import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import { addToCartHelper, addToFavoritesHelper, convertBuffer } from '../../../../assets/helpers/helpers';
import { CartProdutType, ProductItemType } from '../../../../types/stateTypes';
import defaultProduct from './../../../../assets/images/defaultProduct.png';
import ProductTabAvailable from './ProductTabAvailable';
import ProductTabButtons from './ProductTabButtons';
import ProductTabPrice from './ProductTabPrice';

type ProductTabType = {
    product: ProductItemType;
}

const Product: FC<ProductTabType> = ({product}) => {
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const isAvailable = Boolean(product.amount);
    const dispatch = useDispatch();

    const addToFavoritesHandler = async () => {
        setIsFetching(true);

        await addToFavoritesHelper(dispatch, product);

        setIsFetching(false);
    }

    const addToCartHandler = () => {
        const obj: CartProdutType = {
            _id: product._id,
            image: product.image,
            name: product.name,
            price: product.price,
            amount: product.amount
        }

        addToCartHelper(dispatch, obj);
    }

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
                <ProductTabButtons 
                    isFetching={isFetching}
                    productId={product._id}
                    addToFavorites={addToFavoritesHandler}
                    addToCart={addToCartHandler} 
                />
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