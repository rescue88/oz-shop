import React from 'react';
import { useDispatch } from 'react-redux';
import { Field, Form, Formik } from 'formik';

import { ValidateEmail, ValidateLogin, ValidatePersonalName, ValidatePhone } from '../../../../../assets/validators/validators';
import MyTextField from '../../../../common/MyTextField';
import MySubmitButton from '../../../../common/MySubmitButton';
import { updateUserData } from '../../../../../redux/reducers/userReducer';
import { getStorageItem } from '../../../../../assets/helpers/helpers';
import { StorageItemType } from '../../../../../types/common';
import { UserInfoType } from './../UserInfo';

const UserInfoForm: React.FC<UserInfoType & {closeForm: () => void}> = ({userData, closeForm}) => {
    const [fileName, setFileName] = React.useState<string>('Не обрано');
    const [choosenFile, setChoosenFile] = React.useState<File | string>('{}');
    const dispatch = useDispatch();
    
    const changeFileInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files: FileList | null = event.currentTarget.files;

        if(files?.length) {
            setFileName(files[0].name);
            setChoosenFile(files[0]);
        } else {
            setFileName("Не обрано");
            setChoosenFile('{}');
        }
    }

    return (
        <Formik
            initialValues={{
                login: userData.login!,
                email: userData.email!,
                name: userData.name!,
                phone: userData.phone!,
            }}
            onSubmit={async (data, {setSubmitting}) => {
                setSubmitting(true);

                let formData = new FormData();
                formData.append('avatar', choosenFile);
                formData.append('login', data.login);
                formData.append('email', data.email);
                formData.append('name', data.name);
                formData.append('phone', data.phone);

                const storageItem: StorageItemType = getStorageItem();
                await dispatch(updateUserData(storageItem!.userId, formData));

                setSubmitting(false);
                closeForm();
            }}
        >
            {
                ({isSubmitting}) => (
                    <Form>
                        <div className="form__header">
                            Змінити профіль
                        </div>
                        <hr/>
                        <div className="form__input_file centered-col">
                            <div className="file__header">
                                Обрати новий аватар
                            </div>
                            <div className="file__field centered-row">
                                <label htmlFor="avatar">
                                    <input 
                                        accept="image/*" 
                                        id="avatar"
                                        name="avatar" 
                                        type="file"
                                        onChange={(e) => changeFileInputHandler(e)}
                                    />
                                    Обрати файл
                                </label>
                                <p>{fileName}</p>
                            </div>
                        </div>
                        <div className="form__input">
                            <Field width={250} validate={ValidateLogin} name="login" placeholder="Введіть логін" type="text" as={MyTextField} />
                        </div>
                        <div className="form__input">
                            <Field width={250} validate={ValidateEmail} name="email" placeholder="Введіть пошту" type="text" as={MyTextField} />
                        </div>
                        <div className="form__input">
                            <Field width={250} validate={ValidatePersonalName} name="name" placeholder="Введіть ім'я" type="text" as={MyTextField} />
                        </div>
                        <div className="form__input">
                            <Field width={250} validate={ValidatePhone} name="phone" placeholder="Введіть мобільний" type="text" as={MyTextField} />
                        </div>
                        <div className="form__submit">
                            <MySubmitButton disabled={isSubmitting} text="Змінити профіль" />
                        </div>
                    </Form>
                )
            }
        </Formik>
    );
}

export default UserInfoForm;