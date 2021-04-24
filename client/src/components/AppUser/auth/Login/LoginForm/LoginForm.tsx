import { FC, useState } from 'react';
import { Field, Form, Formik } from "formik";
import MyPasswordField from "../../../../common/MyPasswordField";
import MySubmitButton from "../../../../common/MySubmitButton";
import MyTextField from "../../../../common/MyTextField";
import st from './../Login.module.css';

const ValidateLogin = (value: string): string => {
    let error: string = '';
    if(!value) {
        error = "Логін обов'язковий";
    } else if(!/^[a-z0-9_]{3,15}$/.test(value)) {
        error = "Некоректно введний логін";
    }
    return error;
}

const ValidatePassword = (value: string): string => {
    let error: string = '';
    if(!value) {
        error = "Пароль обов'язковий";
    } else if(!/^[a-zA-Z0-9_]{3,20}$/.test(value)) {
        error = "Некоректно введений пароль";
    }
    return error;
}

const LoginForm: FC = () => {
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
                password: '',
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
                ({isSubmitting}) => (
                    <Form>
                        <div className={st.inputField}>
                            <Field width={250} validate={ValidateLogin} name="login" placeholder="Введіть логін" type="text" as={MyTextField} />
                        </div>
                        <div className={st.inputField}>
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
                        <div className={st.submitBtn}>
                            <MySubmitButton disabled={isSubmitting} text="Увійти" />
                        </div>
                    </Form>
                )
            }
        </Formik>
    )
}

export default LoginForm;