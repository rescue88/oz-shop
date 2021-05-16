import { Field, Form, Formik } from 'formik';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ValidateDescription, ValidateDiscountPercent, ValidateName } from '../../../assets/validators/validators';
import { createDiscount, updateDiscount } from '../../../redux/reducers/adminReducer';
import { AddUpdateFormType } from '../../../types/common';
import { DiscountItemType } from '../../../types/stateTypes';
import MySimpleTextarea from '../Input/MySimpleTextarea';
import MySubmitButton from '../MySubmitButton';
import MyTextField from '../MyTextField';

type AddUpdateDiscountFormType = {
    discount?: DiscountItemType;
} & AddUpdateFormType;

const AddUpdateDiscountForm: FC<AddUpdateDiscountFormType> = ({discount, closeForm, header}) => {
    const [fileName, setFileName] = useState<string>('Не обрано');
    const [choosenFile, setChoosenFile] = useState<File | string>('{}');
    const dispatch = useDispatch();

    const initialFormState = !discount ? ({
        name: '',
        description: '',
        percent: '',
    }) : ({
        name: discount.name,
        description: discount.description,
        percent: String(discount.percent),
    });

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
            initialValues={initialFormState}
            onSubmit={async (data, {setSubmitting}) => {
                setSubmitting(true);

                let formData = new FormData();
                formData.append('image', choosenFile);
                formData.append('name', data.name);
                formData.append('description', data.description);
                formData.append('percent', data.percent);

                if(!discount) {
                    await dispatch(createDiscount(formData));
                } else {
                    await dispatch(updateDiscount(discount._id, formData));
                }

                setSubmitting(false);

                closeForm();
            }}
        >
            {
                ({isSubmitting}) => (
                    <Form>
                        <div className="form__header">{header}</div>
                        <hr />
                        <div className="form__input_file centered-col">
                            <div className="file__header">
                                Обрати нове зображення
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
                            <label htmlFor="name">Назва знижки</label>
                            <Field validate={ValidateName} name="name" placeholder="Введіть назву знижки" type="text" as={MyTextField} />
                        </div>
                        <div className="form__input">
                            <Field validate={ValidateDescription} name="description" placeholder="Введіть опис знижки" type="textarea" as={MySimpleTextarea} />
                        </div>
                        <div className="form__input">
                            <label htmlFor="percent">Відсоток знижки</label>
                            <Field validate={ValidateDiscountPercent} name="percent" placeholder="Введіть ціну знижки" type="text" as={MyTextField} />
                        </div>
                        <div className="form__submit">
                            <MySubmitButton disabled={isSubmitting} text={discount ? 'Змінити знижку' : 'Додати знижку'} />
                        </div>
                    </Form> 
                )
            }
        </Formik>
    );
}

export default AddUpdateDiscountForm;