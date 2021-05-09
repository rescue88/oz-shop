import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import LoginForm from './LoginForm/LoginForm';

const Login: FC = () => {
    return (
        <div className="form centered-col">
            <div className="form__header">Авторизація</div>
            <hr/>
            <LoginForm />
            <div className="form__tip">
                Немає акаунту? Тоді створіть його на сторінці <NavLink className="form__tip_link" to="/app/register">реєстрації</NavLink>
            </div>
        </div>
    )
}

export default Login;