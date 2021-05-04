import { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import Login from './auth/Login/Login';
import Register from './auth/Register/Register';
import { StateType } from '../../types/stateTypes';
import { AppType } from '../../types/common';
import UserPage from './UserPage/UserPage';

const AppUser: FC<AppType> = ({isAuth}) => {
    return (
        <>
            <Navbar />
            <section className="page-container">
                <Switch>
                    <Route exact path="/app" render={() => <Home />} />
                    {
                        !isAuth ? (
                            <>
                                <Route path="/app/login" render={() => <Login />} />
                                <Route path="/app/register" render={() => <Register />} />
                            </>
                        ) : (
                            <Route path="/app/profile" render={() => <UserPage />} />
                        )
                    }
                    <Redirect exact to="/app" />
                </Switch>
            </section>
        </>
    )
}

export default AppUser;