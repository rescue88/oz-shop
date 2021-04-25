import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import LoginForm from './LoginForm/LoginForm';

const Login: FC = () => {

    return (
        <div className="auth centered-col">
            <div className="auth__header">Авторизація</div>
            <hr/>
            <LoginForm />
            <div className="auth__tip">
                Немає акаунту? Тоді створіть його на сторінці <NavLink className="auth__tip_link" to="/app/register">реєстрації</NavLink>!
            </div>
        </div>
    )
}

export default Login;