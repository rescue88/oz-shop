import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import AppAdmin from './components/AppAdmin/AppAdmin';
import AppUser from './components/AppUser/AppUser';
import Loader from './components/common/Loader/Loader';
import MySnackbar from './components/common/MySnackbar/MySnackbar';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { useAuth } from './hooks/auth.hook';
import { StateType } from './types/stateTypes';

const App: FC = () => {
  const { ready } = useAuth();

  const isAuth = useSelector((state: StateType) => state.auth.isAuth);
  const userPerm = useSelector((state: StateType) => state.user.permissions);
  
  if(!ready) {
    return <Loader />
  }

  return (
    <main className="main-container">
      <MySnackbar />
      <Header />
      <div className="content">
        {
          <Switch>
            {
              userPerm === 'admin' && <Route path="/admin" render={() => <AppAdmin isAuth={isAuth} userPerm={userPerm} />} />
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