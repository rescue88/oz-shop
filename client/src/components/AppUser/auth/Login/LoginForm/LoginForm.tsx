import { FC, useState } from 'react';
import { Field, Form, Formik } from "formik";
import { useDispatch } from 'react-redux';

import MyPasswordField from "../../../../common/MyPasswordField";
import MySubmitButton from "../../../../common/MySubmitButton";
import MyTextField from "../../../../common/MyTextField";
import { ValidateLogin, ValidatePassword } from './../../../../../assets/validators/validators';
import { login } from '../../../../../redux/reducers/authReducer';

const LoginForm: FC = () => {
    const [showPass, setShowPass] = useState<boolean>(false);
    const dispatch = useDispatch();

    const handleClickShowPassword = () => {
        setShowPass(!showPass);
    };
    
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Formik
            initialValues={{
                login: '',
                password: '',
            }}
            onSubmit={async (data, {setSubmitting}) => {
                setSubmitting(true);

                await dispatch(login(data.login, data.password));

                setSubmitting(false);
            }}
        >
            {
                ({isSubmitting}) => (
                    <Form>
                        <div className="auth__input">
                            <Field width={250} validate={ValidateLogin} name="login" placeholder="Введіть логін" type="text" as={MyTextField} />
                        </div>
                        <div className="auth__input">
                            <Field 
                                width={203}
                                validate={ValidatePassword}
                                name="password" 
                                placeholder="Введіть пароль"
                                showPass={showPass} 
                                handleClickShowPassword={handleClickShowPassword} 
                                handleMouseDownPassword={handleMouseDownPassword}
                                as={MyPasswordField} 
                            />
                        </div>
                        <div className="auth__submit">
                            <MySubmitButton disabled={isSubmitting} text="Увійти" />
                        </div>
                    </Form>
                )
            }
        </Formik>
    )
}

export default LoginForm;