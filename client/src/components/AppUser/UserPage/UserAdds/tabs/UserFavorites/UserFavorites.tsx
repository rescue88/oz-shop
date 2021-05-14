import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStorageItem } from '../../../../../../assets/helpers/helpers';

import { deleteFromFavorites } from '../../../../../../redux/reducers/userReducer';
import { StateType } from '../../../../../../types/stateTypes';
import UserFavoritesItem from './UserFavoritesItem/UserFavoritesItem';

const UserFavorites: FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const {favorites} = useSelector((state: StateType) => state.user);

    const deleteFavoriteHandler = async (productId: string) => {
        setIsLoading(true);

        const userId: string = getStorageItem()!.userId;
        dispatch(deleteFromFavorites(userId, productId));

        setIsLoading(false);
    }

    return (
        <div className="userAdds__favorites">
            {
                favorites.length ? (
                    favorites.map(item => (
                        <UserFavoritesItem 
                            {...item}
                            isLoading={isLoading}
                            deleteHandler={deleteFavoriteHandler}
                        />
                    ))
                ) : (
                    <div className="userAdds__favorites_warning">Вкладка з доданими товарами порожня</div>
                )
            }
        </div>
    )
};

export default UserFavorites;