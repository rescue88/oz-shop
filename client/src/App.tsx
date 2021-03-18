import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AppAdmin from './components/AppAdmin';
import AppUser from './components/AppUser';
import Header from './components/Header/Header';

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  return (
    <main className="main-container">
      <Header />
      <div className="content">
        <Switch>
          <Route exact path="/admin" render={() => <AppAdmin isAuth={isAuth} />} />
          <Route path="/app" render={() => <AppUser />} />
          <Redirect to="/app" />
        </Switch>
      </div>
    </main>
  );
}

export default App;
