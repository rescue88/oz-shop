import { FC } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { NavLink } from 'react-router-dom';

import { convertBuffer } from '../../../../../../../assets/helpers/helpers';
import { UserFavoritesType } from '../../../../../../../types/stateTypes';
import defaultProductPhoto from './../../../../../../../assets/images/defaultProduct.png';
import DeleteIcon from '../../../../../../common/Icons/DeleteIcon';

type UserFavoritesItemType = {
    isLoading: boolean;
    deleteHandler : (productId: string) => void; 
} & UserFavoritesType

const UserFavoritesItem: FC<UserFavoritesItemType> = ({_id, image, name, price, amount, isLoading, deleteHandler}) => {
    return (
        <div className="userAdds__favorites_item item space-betw-row">
            <NavLink to={`/app/product/${_id}`} className="centered-row">
                <div className="item__image">
                    <img src={image.data ? convertBuffer(image.data.data) : defaultProductPhoto} alt="" />
                </div>
                <div className="item__info">
                    <div>Назва товару: {name}</div>
                    <div>Ціна: {price}</div>
                    <div>Доступна кількість на складі: {amount}</div>
                </div>
            </NavLink>
            <Tooltip title="Видалити товар із заміток" arrow>
                <button 
                    className="item__delete" 
                    onClick={() => deleteHandler(_id)}
                    disabled={isLoading}
                >
                    <DeleteIcon />
                </button>
            </Tooltip>
        </div>
    );
}

export default UserFavoritesItem;