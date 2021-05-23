import { FC } from 'react';
import Tooltip from '@material-ui/core/Tooltip';

import { OrderItemType } from '../../../../types/stateTypes';
import DeleteIcon from '../../../common/Icons/DeleteIcon';
import EditIcon from '../../../common/Icons/EditIcon';

type ChangeOrdersItemType = {
    order: OrderItemType;
    isFetching: boolean;
}

const ChangeOrdersItem: FC<ChangeOrdersItemType> = ({order, isFetching}) => {
    return (
        <div className="changeOrders__item">
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
                    <Tooltip title="Змінити товар" arrow>
                        <button className="settings__buttons_edit">
                            <EditIcon />
                        </button>
                    </Tooltip>
                    <Tooltip title="Видалити товар" arrow>
                        <button className="settings__buttons_delete" disabled={isFetching}>
                            <DeleteIcon />
                        </button>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

export default ChangeOrdersItem;