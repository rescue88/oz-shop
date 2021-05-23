import { FC, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getStorageItem } from '../../../../../../assets/helpers/helpers';
import { clearOrders, getOwnOrders } from '../../../../../../redux/reducers/userReducer';
import { StateType } from '../../../../../../types/stateTypes';
import UserTabOrdersLoader from '../../../../../common/Loader/UserTabOrdersLoader';
import UserOrdersItem from './UserOrdersItem';

const UserOrders: FC = () => {
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const userId: string = getStorageItem()!.userId;
    const dispatch = useDispatch();
    const {orders} = useSelector((state: StateType) => state.user);

    const getOwnOrdersHandler = useCallback(async () => {
        setIsFetching(true);

        await dispatch(getOwnOrders(userId));

        setIsFetching(false);
    }, [dispatch, userId]);

    useEffect(() => {
        getOwnOrdersHandler();

        return () => {
            dispatch(clearOrders);
        }
    }, [dispatch, getOwnOrdersHandler]);

    return (
        <div className="userAdds__orders">
            <div className="userAdds__orders_items">
                {
                    isFetching ? (
                        Array(3).fill(0).map((item, idx) => <UserTabOrdersLoader key={idx} />)
                    ) : orders.length ? (
                        orders.map(item => (
                            <UserOrdersItem key={item._id} order={item} />
                        ))
                    ) : (
                        <div className="no-items">Ви не здійснили жодного замовлення</div>
                    )
                }
            </div>
        </div>
    )
};

export default UserOrders;