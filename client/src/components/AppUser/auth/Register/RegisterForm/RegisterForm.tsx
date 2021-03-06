import { Field, Form, Formik } from 'formik';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import MyPasswordField from '../../../../common/MyPasswordField';
import MySubmitButton from '../../../../common/MySubmitButton';
import MyTextField from '../../../../common/MyTextField';
import { ValidateLogin, ValidateEmail, ValidatePersonalName, ValidatePhone, ValidatePassword, ValidateRepeatPassword } from '../../../../../assets/validators/validators';
import { register } from '../../../../../redux/reducers/authReducer';

const RegisterForm: FC = () => {
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
                email: '',
                personalName: '',
                phone: '',
                password: '',
                repeatPassword: ''
            }}
            onSubmit={async (data, {setSubmitting}) => {
                setSubmitting(true);

                await dispatch(register(data.login, data.email, data.personalName, data.phone, data.password));

                setSubmitting(false);
            }}
        >
            {
                ({values, isSubmitting}) => (
                    <Form>
                        <div className="form__input">
                            <Field width={250} validate={ValidateLogin} name="login" placeholder="Введіть логін" type="text" as={MyTextField} />
                        </div>
                        <div className="form__input">
                            <Field width={250} validate={ValidatePersonalName} name="personalName" placeholder="Введіть ім'я" type="text" as={MyTextField} />
                        </div>
                        <div className="form__input">
                            <Field width={250} validate={ValidateEmail} name="email" placeholder="Введіть пошту" type="email" as={MyTextField} />
                        </div>
                        <div className="form__input">
                            <Field width={250} validate={ValidatePhone} name="phone" placeholder="Введіть телефон" type="text" as={MyTextField} />
                        </div>
                        <div className="form__input">
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
                        <div className="form__input">
                            <Field 
                                width={250} 
                                validate={() => ValidateRepeatPassword(values.password, values.repeatPassword)} 
                                name="repeatPassword" 
                                placeholder="Підтвердіть пароль" 
                                type="password" 
                                as={MyTextField} 
                            />
                        </div>
                        <div className="form__submit">
                            <MySubmitButton disabled={isSubmitting} text="Створити профіль" />
                        </div>
                    </Form>
                )
            }
        </Formik>
    );
}

export default RegisterForm;