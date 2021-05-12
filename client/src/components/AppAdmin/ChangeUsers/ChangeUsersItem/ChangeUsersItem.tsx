import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userGroups } from '../../../../assets/helpers/helpers';

import { ChangeUsersPageType, UserPermissionType } from '../../../../types/stateTypes';
import DeleteIcon from '../../../common/Icons/DeleteIcon';

type ChangeUsersItemType = {
    deleteUser: (id: string) => void;
    isFetching: boolean;
}

const ChangeUsersItem: FC<ChangeUsersPageType & ChangeUsersItemType> = ({_id, login, email, name, permissions, phone, deleteUser, isFetching}) => {
    const dispatch = useDispatch();

    return (
        <div className="changeBlock__items_item">
            <div className="item__login centered-row">{login}</div>
            <div className="item__email centered-row">{email}</div>
            <div className="item__name centered-row">{name}</div>
            <div className="item__permissions centered-row">{userGroups[permissions as UserPermissionType]}</div>
            <div className="item__phone centered-row">{phone}</div>
            <div className="item__delete centered-row">
                <button 
                    type="button" 
                    onClick={() => deleteUser(_id)} 
                    disabled={isFetching}
                >
                    <DeleteIcon />
                </button>
            </div>
        </div>
    );
}

export default ChangeUsersItem;