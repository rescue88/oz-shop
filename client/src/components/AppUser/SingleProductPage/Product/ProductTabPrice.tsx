import { FC } from 'react';

type ProductTabPriceType = {
    price: number;
}

const ProductTabPrice: FC<ProductTabPriceType> = ({price}) => {
    // test data
    const discount: number | null = 10;

    return (
        <div className="product__content_price centered-row">
            Ціна товару: 
            {
                discount ? (
                    <>
                        <span className="oldPrice">₴ {price}</span>
                        <span className="currentPrice">₴ {price * (1 - (discount / 100))}</span>
                    </>
                ) : (
                    <span className="currentPrice">₴ {price}</span>
                )
            }
        </div>
    );
}

export default ProductTabPrice;