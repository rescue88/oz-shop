import { FC, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AppAdmin from './components/AppAdmin/AppAdmin';
import AppUser from './components/AppUser/AppUser';
import MySnackbar from './components/common/MySnackbar/MySnackbar';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

const App: FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(true);
  return (
    <main className="main-container">
      <MySnackbar />
      <Header />
      <div className="content">
        <Switch>
          <Route path="/admin" render={() => <AppAdmin isAuth={isAuth} />} />
          <Route path="/app" render={() => <AppUser />} />
          <Redirect to="/app" />
        </Switch>
      </div>
      <Footer />
    </main>
  );
}

export default App;
