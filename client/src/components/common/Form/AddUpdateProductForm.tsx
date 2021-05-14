import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Field, Form, Formik } from 'formik';

import { ProductItemType } from '../../../types/stateTypes';
import { ValidateDescription, ValidateName, ValidateProductAmount, ValidateProductCategory, ValidateProductPrice, ValidateProductProducer, ValidateProductSize } from '../../../assets/validators/validators';
import MyTextField from '../MyTextField';
import MySubmitButton from '../MySubmitButton';
import MySimpleTextarea from '../Input/MySimpleTextarea';
import MySelectField from '../MySelectField';
import { createProduct, updateProduct } from '../../../redux/reducers/adminReducer';

type AddUpdateProductFormType = {
    product?: ProductItemType;
    header: string;
    addOrUpdate?: () => void;
    closeForm: () => void;
}

const AddUpdateProductForm: FC<AddUpdateProductFormType> = ({header, product, closeForm}) => {
    const [fileName, setFileName] = useState<string>('Не обрано');
    const [choosenFile, setChoosenFile] = useState<File | string>('{}');
    const dispatch = useDispatch();

    const initialFormState = !product ? ({
        name: '',
        description: '',
        category: '',
        price: '',
        amount: '',
        producer: '',
        size: ''
    }) : ({
        name: product.name,
        description: product.description,
        category: product.category,
        price: String(product.price),
        amount: String(product.amount),
        producer: product.producer,
        size: product.size
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
                formData.append('name', data.name);
                formData.append('description', data.description);
                formData.append('image', choosenFile);
                formData.append('category', data.category);
                formData.append('price', data.price);
                formData.append('amount', data.amount);
                formData.append('producer', data.producer);
                formData.append('size', data.size);

                if(!product) {
                    await dispatch(createProduct(formData));
                } else {
                    await dispatch(updateProduct(product._id, formData));
                }

                setSubmitting(false);

                closeForm();
            }}
        >
            {
                ({isSubmitting}) => (
                    <Form>
                        <div className="form__header">
                            {header}
                        </div>
                        <hr/>
                        <div className="formContainer centered-row">
                            <div className="formContainer_part1">

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
                                    <Field validate={ValidateDescription} name="description" placeholder="Введіть опис продукту" type="textarea" as={MySimpleTextarea} />
                                </div>

                            </div>
                            <div className="formContainer_part2">

                                <div className="form__input">
                                    <Field name="category" validate={ValidateProductCategory} type="select" as={MySelectField} />
                                </div>
                                <div className="form__input">
                                    <label htmlFor="price">Ціна товару</label>
                                    <Field width={250} validate={ValidateProductPrice} name="price" placeholder="Введіть ціну" type="text" as={MyTextField} />
                                </div>
                                <div className="form__input">
                                    <label htmlFor="amount">Кількість товарів даного типу</label>
                                    <Field width={250} validate={ValidateProductAmount} name="amount" placeholder="Кількість продуктів на складі" type="text" as={MyTextField} />
                                </div>
                                <div className="form__input">
                                    <label htmlFor="producer">Виробник</label>
                                    <Field width={250} validate={ValidateProductProducer} name="producer" placeholder="Вкажіть виробника" type="text" as={MyTextField} />
                                </div>
                                <div className="form__input">
                                    <label htmlFor="size">Розмір товару</label>
                                    <Field width={250} validate={ValidateProductSize} name="size" placeholder="Заповніть габарити" type="text" as={MyTextField} />
                                </div>

                            </div>
                        </div>
                        <div className="form__submit">
                            <MySubmitButton disabled={isSubmitting} text={product ? 'Змінити товар' : 'Додати товар'} />
                        </div>
                    </Form>
                )
            }
        </Formik>
    );
}

export default AddUpdateProductForm;