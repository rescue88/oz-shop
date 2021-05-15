import { FC } from 'react';
import { userGroups } from '../../../../assets/helpers/helpers';
import { ChangePagesItemType } from '../../../../types/common';
import { ChangeUsersPageType, UserPermissionType } from '../../../../types/stateTypes';
import DeleteIcon from '../../../common/Icons/DeleteIcon';

type ChangeUsersItemType = {
    user: ChangeUsersPageType;
} & ChangePagesItemType;

const ChangeUsersItem: FC<ChangeUsersItemType> = ({user, deleteHandler, isFetching}) => {
    return (
        <div className="changeBlock__items_item">
            <div className="item__login centered-row">{user.login}</div>
            <div className="item__email centered-row">{user.email}</div>
            <div className="item__name centered-row">{user.name}</div>
            <div className="item__permissions centered-row">{userGroups[user.permissions as UserPermissionType]}</div>
            <div className="item__phone centered-row">{user.phone}</div>
            <div className="item__delete centered-row">
                <button 
                    type="button" 
                    onClick={() => deleteHandler(user._id)} 
                    disabled={isFetching}
                >
                    <DeleteIcon />
                </button>
            </div>
        </div>
    );
}

export default ChangeUsersItem;