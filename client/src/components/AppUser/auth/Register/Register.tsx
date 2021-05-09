import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import RegisterForm from './RegisterForm/RegisterForm';

const Register: FC = () => {
    return (
        <div className="form centered-col">
            <div className="form__header">
                Створення користувача
            </div>
            <hr/>
            <RegisterForm />
            <div className="form__tip">
                Уже є акаунт? Перейдіть на сторінку <NavLink className="form__tip_link" to="/app/login">авторизації</NavLink>
            </div>
        </div>
    );
}

export default Register;