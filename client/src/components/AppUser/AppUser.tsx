import React from 'react';
import Navbar from './Navbar/Navbar';
import { Route } from 'react-router-dom';

import Home from './Home/Home';

const AppUser: React.FC = () => {
    return (
        <>
            <Navbar />
            <section className="page-container">
                <Route exact path="/app" render={() => <Home />} />
            </section>
        </>
    )
}

export default AppUser;