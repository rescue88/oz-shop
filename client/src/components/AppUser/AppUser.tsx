import React from 'react';
import Navbar from './Navbar/Navbar';
import { Route } from 'react-router-dom';

import Home from './Home/Home';
import Login from './Login/Login';

const AppUser: React.FC = () => {
    return (
        <>
            <Navbar />
            <section className="page-container">
                <Route exact path="/app" render={() => <Home />} />
                <Route exact path="/app/login" render={() => <Login />} />
            </section>
        </>
    )
}

export default AppUser;