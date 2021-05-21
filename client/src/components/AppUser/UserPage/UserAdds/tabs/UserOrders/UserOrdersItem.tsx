import { FC } from 'react';

import { OrderUserItemType } from '../../../../../../types/stateTypes';

type UserOrdersItemType = {
    order: OrderUserItemType;
}

const UserOrdersItem: FC<UserOrdersItemType> = ({order}) => {
    return (
        <div className="orderItem">
            <div className="orderItem__code">Код замовлення: <span>{order._id}</span></div>
            <div className="orderItem__amount">Кількість товарів: <span>{order.amount}</span></div>
            <div className="orderItem__price">Загальна ціна замовлення: <span>₴ {order.price}</span></div>
            <div className="orderItem__date">Оформлено: <span>{order.created}</span></div>
            <div className="orderItem__status">Статус замовлення: <span className="borderRadius">{order.status}</span></div>
        </div>
    )
}

export default UserOrdersItem;