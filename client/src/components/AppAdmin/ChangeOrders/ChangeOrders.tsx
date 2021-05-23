import { FC, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../../redux/reducers/adminReducer';
import { StateType } from '../../../types/stateTypes';
import ChangeOrdersLoader from '../../common/Loader/ChangeOrdersLoader';
import ChangeOrdersItem from './ChangeOrdersItem/ChangeOrdersItem';

const ChangeOrders: FC = () => {
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const dispatch = useDispatch();
    const orders = useSelector((state: StateType) => state.admin.changeOrders);
    // console.log(orders);

    const getOrdersHandler = useCallback(async () => {
        setIsFetching(true);

        await dispatch(getOrders());

        setIsFetching(false);
    }, []);

    useEffect(() => {
        getOrdersHandler();
    }, [getOrdersHandler]);

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
                                <ChangeOrdersItem key={item._id} order={item} isFetching={isFetching} />
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