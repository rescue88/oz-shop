import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import st from './Register.module.css';
import RegisterForm from './RegisterForm/RegisterForm';

const Register: FC = () => {
    return (
        <div className={st.registerBlock}>
            <div className={st.registerHeader}>
                Створення користувача
            </div>
            <hr/>
            <RegisterForm />
            <div className={st.gotoLogin}>
                Уже є акаунт? Перейдіть на сторінку <NavLink className={st.link} to="/app/login">авторизації</NavLink>!
            </div>
        </div>
    );
}

export default Register;