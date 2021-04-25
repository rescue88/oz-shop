import { Field, Form, Formik } from 'formik';
import { FC, useState } from 'react';
import validator from 'validator';

import MyPasswordField from '../../../../common/MyPasswordField';
import MySubmitButton from '../../../../common/MySubmitButton';
import MyTextField from '../../../../common/MyTextField';

const ValidateLogin = (value: string): string => {
    let error: string = '';
    if(!value) {
        error = "Логін обов'язковий";
    } else if(!validator.isAlphanumeric(value)) {
        error = "Лише літери та цифри";
    } else if(!validator.isLength(value, {min: 4, max: 12})) {
        error = "Довжина логіна від 4 до 12 символів";
    }
    return error;
}

const ValidatePersonalName = (value: string): string => {
    let error: string = '';
    if(!value) {
        error = "Ім'я обов'язкове";
    } else if(!/^[А-ЯЁа-яё]{4,20}$/.test(value)) {
        error = "Некоректно введне ім'я";
    }
    return error;
}
const ValidateEmail = (value: string): string => {
    let error: string = '';
    if(!value) {
        error = "Пошта обов'язкова";
    } else if(!validator.isEmail(value)) {
        error = "Некоректно введна пошта";
    }
    return error;
}

const ValidatePhone = (value: string): string => {
    let error: string = '';
    if(!value) {
        error = "Телефон обов'язковий";
    } else if(!validator.isMobilePhone(value, 'uk-UA')) {
        error = "+[код країни][номер] або лише [номер]";
    }
    return error;
}

const ValidatePassword = (value: string): string => {
    let error: string = '';
    if(!value) {
        error = "Пароль обов'язковий";
    } else if(!/^[a-zA-Z0-9_]{7,20}$/.test(value)) {
        error = "Некоректно введений пароль";
    }
    return error;
}

const ValidateRepeatPassword = (password: string, repeatPassword: string): string => {
    let error: string = '';
    if(password !== repeatPassword) {
        error = "Паролі не співпадають!";
    }
    return error;
}

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
                setTimeout(() => {
                    console.log('submit', data);
                    setSubmitting(false);
                }, 3000);
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