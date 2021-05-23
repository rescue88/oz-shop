import { FC, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, getOrders, updateOrder } from '../../../redux/reducers/adminReducer';
import { OrderStatusType, StateType } from '../../../types/stateTypes';
import ChangeOrdersLoader from '../../common/Loader/ChangeOrdersLoader';
import ChangeOrdersItem from './ChangeOrdersItem/ChangeOrdersItem';

const ChangeOrders: FC = () => {
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const dispatch = useDispatch();
    const orders = useSelector((state: StateType) => state.admin.changeOrders);

    const getOrdersHandler = useCallback(async () => {
        setIsFetching(true);

        await dispatch(getOrders());

        setIsFetching(false);
    }, [dispatch]);

    const updateOrderHandler = useCallback(async (orderId: string, status: OrderStatusType) => {
        setIsFetching(true);

        await dispatch(updateOrder(orderId, status));

        setIsFetching(false);
    }, [dispatch]);

    const deleteOrderHandler = useCallback(async (orderId: string) => {
        setIsFetching(true);

        await dispatch(deleteOrder(orderId));

        setIsFetching(false);
    }, [dispatch]);

    useEffect(() => {
        getOrdersHandler();
    }, [getOrdersHandler, deleteOrderHandler]);

    return (
        <div className="changeContainer">
            <div className="changeContainer__header">Редагування замовлень</div>
            <hr />
            <div className="changeContainer__content changeBlock">
                <div className="changeBlock__items changeOrders">
                    {
                        isFetching ? (
                            Array(3).fill(0).map((item, idx) => <ChangeOrdersLoader key={idx} />)
                        ) : orders.length ? (
                            orders.map(item => (
                                <ChangeOrdersItem 
                                    key={item._id} 
                                    order={item} 
                                    isFetching={isFetching}
                                    editOrder={updateOrderHandler}
                                    deleteOrder={deleteOrderHandler}
                                />
                            ))
                        ) : (
                            <div className="no-items">Список замовлень порожній</div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ChangeOrders;