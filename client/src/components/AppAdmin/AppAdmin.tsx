import React from 'react';
import { Redirect } from 'react-router-dom';

import NavbarAdmin from './NavbarAdmin/NavbarAdmin';
import { AppType } from '../../types/common';
import { UserPermissions } from './../../types/stateTypes'

const AppAdmin: React.FC<AppType & {userPerm: keyof typeof UserPermissions}> = ({isAuth, userPerm}) => {
    return (
        <>
            <NavbarAdmin />
            <section className="page-container">
                <div>
                    admin-home
                </div>
            </section>
        </>
    )
}

export default AppAdmin;