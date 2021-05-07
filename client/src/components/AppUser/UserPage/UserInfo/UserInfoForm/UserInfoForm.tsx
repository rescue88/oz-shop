import React from 'react';
import { useDispatch } from 'react-redux';
import { Field, Form, Formik } from 'formik';

import { ValidateEmail, ValidateLogin, ValidatePersonalName, ValidatePhone } from '../../../../../assets/validators/validators';
import MyTextField from '../../../../common/MyTextField';
import MySubmitButton from '../../../../common/MySubmitButton';
import { updateUserData } from '../../../../../redux/reducers/userReducer';
import { getStorageItem } from '../../../../../assets/helpers/helpers';
import { StorageItemType } from '../../../../../types/common';

// const TypeUserInfoForm = {

// }

const UserInfoForm: React.FC = () => {
    const [choosenFile, setChoosenFile] = React.useState<string>('Не обрано');

    const dispatch = useDispatch();

    const changeFileInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.currentTarget.files?.length) {
            setChoosenFile(event.currentTarget.files[0].name);
        } else {
            setChoosenFile("Не обрано");
        }
    }

    return (
        <Formik
            initialValues={{
                photo: '',
                login: '',
                email: '',
                name: '',
                phone: '',
            }}
            onSubmit={async (data, {setSubmitting}) => {
                setSubmitting(true);

                const storageItem: StorageItemType = getStorageItem();
                await dispatch(updateUserData(storageItem!.userId, data.photo, data.login, data.email, data.name, data.phone));

                setSubmitting(false);
            }}
        >
            {
                ({values, isSubmitting}) => (
                    <Form>
                        <div className="auth__header">
                            Змінити профіль
                        </div>
                        <hr/>
                        <div className="auth__input_file centered-col">
                            <div className="file__header">
                                Обрати новий аватар
                            </div>
                            <div className="file__field centered-row">
                                <label htmlFor="photo">
                                    <input 
                                        accept="image/*" 
                                        id="photo"
                                        name="photo" 
                                        type="file"
                                        onChange={(e) => changeFileInputHandler(e)}
                                    />
                                    Обрати файл
                                </label>
                                <p>{choosenFile}</p>
                            </div>
                        </div>
                        {
                            console.log(values.photo)
                        }
                        <div className="auth__input">
                            <Field width={250} validate={ValidateLogin} name="login" placeholder="Введіть логін" type="text" as={MyTextField} />
                        </div>
                        <div className="auth__input">
                            <Field width={250} validate={ValidateEmail} name="email" placeholder="Введіть пошту" type="text" as={MyTextField} />
                        </div>
                        <div className="auth__input">
                            <Field width={250} validate={ValidatePersonalName} name="name" placeholder="Введіть ім'я" type="text" as={MyTextField} />
                        </div>
                        <div className="auth__input">
                            <Field width={250} validate={ValidatePhone} name="phone" placeholder="Введіть мобільний" type="text" as={MyTextField} />
                        </div>
                        <div className="auth__submit">
                            <MySubmitButton disabled={isSubmitting} text="Змінити профіль" />
                        </div>
                    </Form>
                )
            }
        </Formik>
    );
}

export default UserInfoForm;