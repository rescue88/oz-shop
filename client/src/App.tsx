import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import AppAdmin from './components/AppAdmin/AppAdmin';
import AppUser from './components/AppUser/AppUser';
import MySnackbar from './components/common/MySnackbar/MySnackbar';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { useAuth } from './hooks/auth.hook';
import { StateType } from './types/stateTypes';

const App: FC = () => {
  const { ready } = useAuth();

  const isAuth = useSelector((state: StateType) => state.auth.isAuth);
  const userPerm = useSelector((state: StateType) => state.user.permissons);
  // TODO:　make a preloader
  if(!ready) {
    return <div style={{width: '100%', height: '100%', backgroundColor: 'red'}}>not ready</div>
  }

  return (
    <main className="main-container">
      <MySnackbar />
      <Header />
      <div className="content">
        {
          <Switch>
            {
              userPerm === 'admin' && <Route path="/admin" render={() => <AppAdmin isAuth={isAuth} />} />
            }
            <Route path="/app" render={() => <AppUser isAuth={isAuth} />} />
            <Redirect exact to="/app" />
          </Switch>
        }
      </div>
      <Footer />
    </main>
  );
}

export default App;
