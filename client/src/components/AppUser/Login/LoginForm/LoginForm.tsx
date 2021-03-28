import { FC, useState } from 'react';
import { Field, Form, Formik } from "formik";
import MyPasswordField from "../../../common/MyPasswordField";
import MySubmitButton from "../../../common/MySubmitButton";
import MyTextField from "../../../common/MyTextField";
import st from './../Login.module.css';

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
                    console.log('submit', data);
                    setSubmitting(false);
                }}
                validate={
                    (values) => {
                        const errors: Record<string, string> = {login: '', password: ''}

                        if(!/^[a-z0-9_-]{3,16}$/.test(values.login)) {
                            errors.login = "Некоректно введений логін";
                        }

                        if(!/^[a-z0-9_-]{3,16}$/.test(values.password)) {
                            errors.password = 'Некоректно введений пароль'
                        }

                        return errors;
                    }
                }
            >
                {
                    ({values, errors, isSubmitting}) => (
                        <Form>
                            <div className={st.inputField}>
                                <Field width={250} name="login" placeholder="Введіть логін" type="input" as={MyTextField} />
                            </div>
                            <div className={st.inputField}>
                                <Field 
                                    width={205}
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
                            <pre>{JSON.stringify(values, null, 2)}</pre>
                        </Form>
                    )
                }
            </Formik>
    )
}

export default LoginForm;