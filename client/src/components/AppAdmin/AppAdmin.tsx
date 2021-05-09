import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import NavbarAdmin from './NavbarAdmin/NavbarAdmin';
import { AppType } from '../../types/common';
import { UserPermissions } from './../../types/stateTypes'
import ChangeUsers from './ChangeUsers/ChangeUsers';

const AppAdmin: React.FC<AppType & {userPerm: keyof typeof UserPermissions}> = ({isAuth, userPerm}) => {
    return (
        <>
            <NavbarAdmin />
            <section className="page-container">
                <Switch>
                    <Route exact path='/admin' component={ChangeUsers} />
                    <Redirect to="/admin" />
                </Switch>
            </section>
        </>
    )
}

export default AppAdmin;