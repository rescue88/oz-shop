import { FC, useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';

import { OrderItemType, OrderStatusType } from '../../../../types/stateTypes';
import DeleteIcon from '../../../common/Icons/DeleteIcon';
import EditIcon from '../../../common/Icons/EditIcon';
import MyDialogWindow from '../../../common/MyDialogWindow';
import ChangeOrdersForm from '../ChangeOrdersForm/ChangeOrdersForm';

type ChangeOrdersItemType = {
    order: OrderItemType;
    isFetching: boolean;
    editOrder: (orderId: string, status: OrderStatusType) => void;
    deleteOrder: (orderId: string) => void;
}

const ChangeOrdersItem: FC<ChangeOrdersItemType> = ({order, isFetching, editOrder, deleteOrder}) => {
    const [openForm, setOpenForm] = useState<boolean>(false);

    const toggleOpenFormHandler = () => {
        setOpenForm(prev => !prev);
    }

    return (
        <div className="changeOrders__item">
            <MyDialogWindow 
                dialogWidth='xs'
                open={openForm}
                onClose={toggleOpenFormHandler}
                Content={(
                    <ChangeOrdersForm 
                        orderId={order._id}
                        status={order.status}
                        editOrder={editOrder}
                        closeForm={toggleOpenFormHandler}
                    />
                )}
            />
            <div className="changeOrders__item_code">Код замовлення: <span>{order._id}</span></div>
            <div className="changeOrders__item_content space-betw-row">
                <div className="changeOrders__item_personal">
                    <div className="changeOrders__item_name">Ім'я: <span>{order.name}</span></div>
                    <div className="changeOrders__item_email">Пошта: <span>{order.email}</span></div>
                    <div className="changeOrders__item_phone">Мобільний: <span>{order.phone}</span></div>
                </div>
                <div className="changeOrders__item_product">
                    <div className="changeOrders__item_amount">Кількість товарів: <span>{order.amount}</span></div>
                    <div className="changeOrders__item_price">Загальна ціна замовлення: <span>{order.price}</span></div>
                    <div className="changeOrders__item_price">Дата замовлення: <span>{order.created}</span></div>
                </div>
            </div>
            <div className="changeOrders__item_address">Адреса доставки: <span>{order.deliveryAddress}</span></div>
            <div className="changeOrders__item_settings settings space-betw-row">
                <div className="settings__status">
                    Статус замовлення: <span className="borderRadius">{order.status}</span>
                </div>
                <div className="settings__buttons centered-row">
                    <Tooltip title="Змінити статус замовлення" arrow>
                        <button className="settings__buttons_edit" onClick={toggleOpenFormHandler} disabled={isFetching}>
                            <EditIcon />
                        </button>
                    </Tooltip>
                    <Tooltip title="Видалити замовлення" arrow>
                        <button className="settings__buttons_delete" onClick={() => deleteOrder(order._id)} disabled={isFetching}>
                            <DeleteIcon />
                        </button>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

export default ChangeOrdersItem;