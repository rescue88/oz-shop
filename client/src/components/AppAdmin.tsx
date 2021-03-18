import React from 'react';
import NavbarAdmin from './NavbarAdmin/NavbarAdmin';
import {Redirect} from 'react-router-dom';

type AppAdminType = {
    isAuth: boolean;
}

const AppAdmin: React.FC<AppAdminType> = ({isAuth}) => {
    return (
        <>
            {
                isAuth ? null : <Redirect to="/app" />
            }
            <NavbarAdmin />
        </>
    )
}

export default AppAdmin;