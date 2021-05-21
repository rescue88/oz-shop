import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import NavbarAdmin from './NavbarAdmin/NavbarAdmin';
import { AppType } from '../../types/common';
import { UserPermissionType } from './../../types/stateTypes'
import ChangeUsers from './ChangeUsers/ChangeUsers';
import ChangeDiscounts from './ChangeDiscounts/ChangeDiscounts';
import ChangeProducts from './ChangeProducts/ChangeProducts';
import ChangeOrders from './ChangeOrders/ChangeOrders';

const AppAdmin: React.FC<AppType & {userPerm: UserPermissionType}> = ({isAuth, userPerm}) => {
    return (
        <>
            <NavbarAdmin />
            <section className="page-container">
                <Switch>
                    <Route exact path='/admin' component={ChangeUsers} />
                    <Route exact path='/admin/discounts' component={ChangeDiscounts} />
                    <Route exact path='/admin/products' component={ChangeProducts} />
                    <Route exact path='/admin/orders' component={ChangeOrders} />
                    <Redirect to="/admin" />
                </Switch>
            </section>
        </>
    )
}

export default AppAdmin;