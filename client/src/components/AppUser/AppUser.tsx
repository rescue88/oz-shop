import { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import Login from './auth/Login/Login';
import Register from './auth/Register/Register';
import { AppType } from '../../types/common';
import UserPage from './UserPage/UserPage';
import ProductsPage from './ProductsPage/ProductsPage';
import CartPage from './CartPage/CartPage';
import DiscountPage from './DiscountPage/DiscountPage';
import SingleProductPage from './SingleProductPage/SingleProductPage';

const AppUser: FC<AppType> = ({isAuth}) => {
    return (
        <>
            <Navbar />
            <section className="page-container">
                {
                    isAuth ? (
                        <Switch>
                            <Route exact path="/app" render={() => <Home />} />
                            <Route exact path="/app/products" render={() => <ProductsPage />} />
                            <Route path="/app/products/:productId" render={() => <SingleProductPage />} />
                            <Route exact path="/app/cart" render={() => <CartPage />} />
                            <Route exact path="/app/discounts" render={() => <DiscountPage />} />
                            <Route path="/app/profile" render={() => <UserPage />} />
                            <Redirect exact to="/app" />
                        </Switch>
                    ) : (
                        <Switch>
                            <Route exact path="/app" render={() => <Home />} />
                            <Route exact path="/app/products" render={() => <ProductsPage />} />
                            <Route path="/app/products/:productId" render={() => <SingleProductPage />} />
                            <Route exact path="/app/cart" render={() => <CartPage />} />
                            <Route exact path="/app/discounts" render={() => <DiscountPage />} />
                            <Route exact path="/app/login" render={() => <Login />} />
                            <Route exact path="/app/register" render={() => <Register />} />
                            <Redirect exact to="/app" />
                        </Switch>
                    )
                }
            </section>
        </>
    )
}

export default AppUser;