import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import st from './Login.module.css';
import LoginForm from './LoginForm/LoginForm';

const Login: FC = () => {

    return (
        <div className={st.loginBlock}>
            <div className={st.loginHeader}>Авторизація</div>
            <hr/>
            <LoginForm />
            <div className={st.gotoRegister}>
                Немає акаунту? Тоді створіть його на сторінці <NavLink className={st.link} to="/app/register">реєстрації</NavLink>!
            </div>
        </div>
    )
}

export default Login;