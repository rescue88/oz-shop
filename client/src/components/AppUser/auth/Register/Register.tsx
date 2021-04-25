import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import RegisterForm from './RegisterForm/RegisterForm';

const Register: FC = () => {
    return (
        <div className="auth centered-col">
            <div className="auth__header">
                Створення користувача
            </div>
            <hr/>
            <RegisterForm />
            <div className="auth__tip">
                Уже є акаунт? Перейдіть на сторінку <NavLink className="auth__tip_link" to="/app/login">авторизації</NavLink>!
            </div>
        </div>
    );
}

export default Register;