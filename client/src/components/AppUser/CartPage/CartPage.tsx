import { FC } from 'react';
import CartRegularIcon from '../../common/Icons/CartRegularIcon';
import DeleteIcon from '../../common/Icons/DeleteIcon';
import CartPageItem from './CartPageItem';

const CartPage: FC = () => {
    return (
        <div className="cart">
            <div className="cart__head">
                <div className="cart__head_header">
                    <CartRegularIcon />
                    Корзина
                </div>
                <button className="cart__head_clear">
                    <DeleteIcon />
                    Очистити корзину
                </button>
            </div>
            <div className="cart__items">
                {
                    Array(5).fill(0).map((item, idx) => <CartPageItem key={idx} />)
                }
            </div>
            <div className="cart__sum space-betw-row">
                <div className="cart__sum_amount">Загальна кількість товарів: <span>7</span></div>
                <div className="cart__sum_money">Сума замовлення: <span className="price">₴900</span></div>
            </div>
            <div className="cart__buttons">
                there will be two buttons
            </div>
        </div>
    );
}

export default CartPage;