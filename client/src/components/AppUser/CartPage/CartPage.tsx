import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { addProductToCart, clearCart, deacreaseProductAmount, deleteProductFromCart } from '../../../redux/reducers/cartReducer';
import { StateType } from '../../../types/stateTypes';
import CartRegularIcon from '../../common/Icons/CartRegularIcon';
import DeleteIcon from '../../common/Icons/DeleteIcon';
import NavIcon from '../Navbar/NavIcon/NavIcon';
import CartPageEmpty from './CartPageEmpty';
import CartPageItem from './CartPageItem';

const CartPage: FC = () => {
    const dispatch = useDispatch();
    const {items: cartItems, totalCount, totalPrice} = useSelector((state: StateType) => state.cart);

    const increaseProductAmountHandler = (productId: string) => {
        dispatch(addProductToCart(cartItems[productId][0]));
    }

    const decreaseProductAmountHandler = (productId: string) => {
        dispatch(deacreaseProductAmount(productId));
    }

    const clearCartHandler = () => {
        dispatch(clearCart());
    }

    const deleteProductHandler = (productId: string) => {
        dispatch(deleteProductFromCart(productId));
    }

    return (
        <>
            {
                Object.keys(cartItems).length ? (
                    <div className="cart">
                        <div className="cart__head">
                            <div className="cart__head_header">
                                <CartRegularIcon />
                                Корзина
                            </div>
                            <button className="cart__head_clear high-opacity" onClick={clearCartHandler}>
                                <DeleteIcon />
                                Очистити корзину
                            </button>
                        </div>
                        <div className="cart__items">
                            {
                                Object.keys(cartItems).map(item => (
                                    <CartPageItem
                                        key={cartItems[item][0]._id}
                                        productItems={cartItems[item]}
                                        increaseAmount={increaseProductAmountHandler}
                                        decreaseAmount={decreaseProductAmountHandler}
                                        deleteProduct={deleteProductHandler}
                                    />
                                ))
                            }
                        </div>
                        <div className="cart__sum space-betw-row">
                            <div className="cart__sum_amount">Загальна кількість товарів: <span>{totalCount}</span></div>
                            <div className="cart__sum_money">Сума замовлення: <span className="price">₴{totalPrice}</span></div>
                        </div>
                        <div className="cart__buttons space-betw-row">
                            <NavLink to="/app/products" className="cart__buttons_back high-opacity centered-row">
                                <NavIcon />
                                До товарів
                            </NavLink>
                            <button className="cart__buttons_pay opacity">Оплатити зараз</button>
                        </div>
                    </div>
                ) : (
                    <CartPageEmpty />
                )
            }
        </>
    );
}

export default CartPage;