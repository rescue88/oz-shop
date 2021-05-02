import { FC } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import Login from './auth/Login/Login';
import Register from './auth/Register/Register';
import { StateType } from '../../types/stateTypes';

const AppUser: FC = () => {
    const isAuth: boolean = useSelector((state: StateType) => state.auth.isAuth);

    return (
        <>
            <Navbar />
            <section className="page-container">
                <Route exact path="/app" render={() => <Home />} />
                {
                    !isAuth && (
                        <>
                            <Route exact path="/app/login" render={() => <Login />} />
                            <Route exact path="/app/register" render={() => <Register />} />
                        </>
                    )
                }
            </section>
        </>
    )
}

export default AppUser;