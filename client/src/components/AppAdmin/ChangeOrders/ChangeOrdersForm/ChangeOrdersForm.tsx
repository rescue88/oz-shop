import { Formik, Form, Field } from 'formik';
import { MenuItem } from '@material-ui/core';
import { FC } from 'react';

import { OrderStatusType } from '../../../../types/stateTypes';
import { selectField } from '../../../common/useStyles';
import { ValidateOrderStatus } from '../../../../assets/validators/validators';
import MySelectField from '../../../common/MySelectField';
import MySubmitButton from '../../../common/MySubmitButton';

type ChangeOrdersFormType = {
    orderId: string;
    status: OrderStatusType;
    editOrder: (orderId: string, status: OrderStatusType) => void;
    closeForm: () => void;
}

const ChangeOrdersForm: FC<ChangeOrdersFormType> = ({orderId, status, editOrder, closeForm}) => {
    const classes = selectField();

    return (
        <Formik
            initialValues={{
                status
            }}
            onSubmit={async (data, {setSubmitting}) => {
                setSubmitting(true);

                if(data.status !== status) {
                    await editOrder(orderId, data.status as OrderStatusType);
                }

                setSubmitting(false);

                closeForm();
            }}
        >
            {
                ({isSubmitting}) => (
                    <Form>
                        <div className="form__header">Оновити статус замовлення</div>
                        <hr />
                        <div className="form__input">
                            <Field name="status" label="Статус замовлення" validate={ValidateOrderStatus} type="select" as={MySelectField} >
                                <MenuItem className={classes.selectItems} value="Оформлення">Оформлення</MenuItem>
                                <MenuItem className={classes.selectItems} value="У дорозі">У дорозі</MenuItem>
                                <MenuItem className={classes.selectItems} value="Очікування">Очікування</MenuItem>
                                <MenuItem className={classes.selectItems} value="Завершено">Завершено</MenuItem>
                            </Field>
                        </div>
                        <div className="form__submit">
                            <MySubmitButton disabled={isSubmitting} text='Змінити статус замовлення' />
                        </div>
                    </Form>
                )
            }
        </Formik>
    );
}

export default ChangeOrdersForm;