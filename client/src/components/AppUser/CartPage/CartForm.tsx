import { Formik, Form, Field } from 'formik';
import { FC } from 'react';
import { useDispatch } from 'react-redux';

import { getStorageItem } from '../../../assets/helpers/helpers';
import { ValidateDeliveryAddress, ValidateEmail, ValidateName, ValidatePhone } from '../../../assets/validators/validators';
import { addOrder, addOrderGuest } from '../../../redux/reducers/userReducer';
import { StorageItemType } from '../../../types/common';
import MySubmitButton from '../../common/MySubmitButton';
import MyTextField from '../../common/MyTextField';

type CartFormType = {
    products: Array<string>;
    price: number;
    closeForm: () => void;
}

const CartForm: FC<CartFormType> = ({products, price, closeForm}) => {
    const userData: StorageItemType = getStorageItem();

    const dispatch = useDispatch();

    const initialValues = userData !== null ? ({
        'deliveryAddress': ''
    }) : ({
        'name': '',
        'email': '',
        'phone': '',
        'deliveryAddress': ''
    });

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (data, {setSubmitting}) => {
                setSubmitting(true);

                if(userData !== null) {
                    await dispatch(addOrder(userData.userId, products, price, data.deliveryAddress));
                } else {
                    await dispatch(addOrderGuest(products, data.name!, data.email!, data.phone!, price,  data.deliveryAddress));
                }

                setSubmitting(false);

                closeForm();
            }}
        >
            {
                ({isSubmitting}) => (
                    <Form>
                        <div className='form__header'>Оформити замовлення</div>
                        <hr />
                        {
                            userData === null ? (
                                <>
                                    <div className="form__input">
                                        <label htmlFor="name">ПІБ</label>
                                        <Field 
                                            validate={ValidateName} 
                                            name="name" 
                                            placeholder="Введіть своє ім'я" type="text" as={MyTextField} />
                                    </div>
                                    <div className="form__input">
                                        <label htmlFor="email">Пошта</label>
                                        <Field 
                                            validate={ValidateEmail} 
                                            name="email" 
                                            placeholder="Введіть пошту" type="text" as={MyTextField} />
                                    </div>
                                    <div className="form__input">
                                        <label htmlFor="phone">Мобільний</label>
                                        <Field 
                                            validate={ValidatePhone} 
                                            name="phone" 
                                            placeholder="Введіть мобільий" type="text" as={MyTextField} />
                                    </div>
                                </>
                            ) : (
                                <div className="form__info">Уся особиста інформація буде<br />отримана з вашого профіля</div>
                            )
                        }
                        <div className="form__input">
                            <label htmlFor="deliveryAddress">Адреса доставки</label>
                            <Field 
                                validate={ValidateDeliveryAddress} 
                                name="deliveryAddress" 
                                placeholder="Введіть адресу доставки" type="text" as={MyTextField} />
                        </div>
                        <div className="form__submit">
                            <MySubmitButton disabled={isSubmitting} text="Оформити замовлення" />
                        </div>
                    </Form>
                )
            }
        </Formik>
    )
}

export default CartForm;