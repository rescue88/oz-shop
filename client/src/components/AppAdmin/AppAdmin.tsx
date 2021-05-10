import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import NavbarAdmin from './NavbarAdmin/NavbarAdmin';
import { AppType } from '../../types/common';
import { UserPermissions } from './../../types/stateTypes'
import ChangeUsers from './ChangeUsers/ChangeUsers';
import ChangeDiscounts from './ChangeDiscounts/ChangeDiscounts';
import ChangeProducts from './ChangeProducts/ChangeProducts';

const AppAdmin: React.FC<AppType & {userPerm: keyof typeof UserPermissions}> = ({isAuth, userPerm}) => {
    return (
        <>
            <NavbarAdmin />
            <section className="page-container">
                <Switch>
                    <Route exact path='/admin' component={ChangeUsers} />
                    <Route exact path='/admin/discounts' component={ChangeDiscounts} />
                    <Route exact path='/admin/products' component={ChangeProducts} />
                    <Redirect to="/admin" />
                </Switch>
            </section>
        </>
    )
}

export default AppAdmin;