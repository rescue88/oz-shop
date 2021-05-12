import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../../../../types/stateTypes';

const UserFavorites: FC = () => {
    const dispatch = useDispatch();
    const {favorites} = useSelector((state: StateType) => state.user);

    const getFavoritesHandler = async () => {
        
    }

    return (
        <div className="userAdds__favorites">
            {
                favorites.length ? (
                    <>
                        {
                            favorites.map(item => (
                                <div key={item} className="userAdds__favorites_item">{item}</div>
                            ))
                        }
                    </>
                ) : (
                    <div>Вкладка з доданими товарами порожня</div>
                )
            }
        </div>
    )
};

export default UserFavorites;