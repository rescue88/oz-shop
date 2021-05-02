import { Field, Form, Formik } from 'formik';
import { FC, useState } from 'react';

import MyPasswordField from '../../../../common/MyPasswordField';
import MySubmitButton from '../../../../common/MySubmitButton';
import MyTextField from '../../../../common/MyTextField';
import { ValidateLogin, ValidateEmail, ValidatePersonalName, ValidatePhone, ValidatePassword, ValidateRepeatPassword } from '../../../../../assets/validators/validators';

const RegisterForm: FC = () => {
    const [showPass, setShowPass] = useState<boolean>(false);

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
                personalName: '',
                email: '',
                phone: '',
                password: '',
                repeatPassword: ''
            }}
            onSubmit={(data, {setSubmitting}) => {
                setSubmitting(true);
                setSubmitting(false);
            }}
        >
            {
                ({values, isSubmitting}) => (
                    <Form>
                        <div className="auth__input">
                            <Field width={250} validate={ValidateLogin} name="login" placeholder="Введіть логін" type="text" as={MyTextField} />
                        </div>
                        <div className="auth__input">
                            <Field width={250} validate={ValidatePersonalName} name="personalName" placeholder="Введіть ім'я" type="text" as={MyTextField} />
                        </div>
                        <div className="auth__input">
                            <Field width={250} validate={ValidateEmail} name="email" placeholder="Введіть пошту" type="email" as={MyTextField} />
                        </div>
                        <div className="auth__input">
                            <Field width={250} validate={ValidatePhone} name="phone" placeholder="Введіть телефон" type="text" as={MyTextField} />
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
                        <div className="auth__input">
                            <Field 
                                width={250} 
                                validate={() => ValidateRepeatPassword(values.password, values.repeatPassword)} 
                                name="repeatPassword" 
                                placeholder="Підтвердіть пароль" 
                                type="password" 
                                as={MyTextField} 
                            />
                        </div>
                        <div className="auth__submit">
                            <MySubmitButton disabled={isSubmitting} text="Створити профіль" />
                        </div>
                    </Form>
                )
            }
        </Formik>
    );
}

export default RegisterForm;