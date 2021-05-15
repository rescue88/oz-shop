import { FC } from 'react';

const ProductTabButtons: FC = () => {
    return (
        <div className="product__content_buttons">
            <div>
                <button 
                    className="wishlistBtn borderRadius" 
                    type="button"
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