import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Field, Form, Formik } from 'formik';

import { ProductItemType } from '../../../types/stateTypes';
import { ValidateDescription, ValidateName, ValidateProductAmount, ValidateProductSize } from '../../../assets/validators/validators';
import MyTextField from '../MyTextField';
import MySubmitButton from '../MySubmitButton';

type AddUpdateProductForm = {
    product: ProductItemType;
    header: string;
    updateForm?: () => void;
    closeForm: () => void;
}

const AddUpdateProductForm: FC<AddUpdateProductForm> = ({header, product, closeForm}) => {
    const [fileName, setFileName] = useState<string>('Не обрано');
    const [choosenFile, setChoosenFile] = useState<File | string>('{}');
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
                name: product.name,
                description: product.description,
                category: product.category,
                price: product.price,
                amount: String(product.amount),
                producer: product.producer,
                size: product.size
            }}
            onSubmit={async (data, {setSubmitting}) => {
                setSubmitting(true);

                let formData = new FormData();

                setSubmitting(false);
            }}
        >
            {
                ({isSubmitting}) => (
                    <Form>
                        <div className="form__header">
                            {header}
                        </div>
                        <hr/>
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
                            <label htmlFor="name">Назва товару</label>
                            <Field width={250} validate={ValidateName} name="name" placeholder="Введіть ім'я продукту" type="text" as={MyTextField} />
                        </div>
                        <div className="form__input">
                            <label htmlFor="description">Опис товару</label>
                            <Field width={250} validate={ValidateDescription} name="description" placeholder="Введіть опис продукту" type="text" as={MyTextField} />
                        </div>
                        {/* <div className="form__input">
                            <Field width={250} name="name" placeholder="Введіть ім'я" type="text" as={MyTextField} />
                        </div> */}
                        <div className="form__input">
                            <label htmlFor="amount">Кількість товарів даного типу</label>
                            <Field width={250} validate={ValidateProductAmount} name="amount" placeholder="Кількість продуктів на складі" type="text" as={MyTextField} />
                        </div>
                        <div className="form__input">
                        <label htmlFor="size">Розмір товару</label>
                            <Field width={250} validate={ValidateProductSize} name="size" placeholder="Кількість продуктів на складі" type="text" as={MyTextField} />
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

export default AddUpdateProductForm;