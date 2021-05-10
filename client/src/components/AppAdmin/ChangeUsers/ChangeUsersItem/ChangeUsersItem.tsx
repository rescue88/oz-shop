import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userGroups } from '../../../../assets/helpers/helpers';
import { deleteUser } from '../../../../redux/reducers/adminReducer';

import { ChangeUsersPageType, UserPermissions } from '../../../../types/stateTypes';
import DeleteIcon from '../../../common/Icons/DeleteIcon';

const ChangeUsersItem: FC<ChangeUsersPageType> = ({_id, login, email, name, permissions, phone}) => {
    const [disabled, setDisabled] = useState<boolean>(false);
    const dispatch = useDispatch();

    const toggleDisabledHandler = () => {
        setDisabled(prev => !prev);
    }

    const deleteHandler = async () => {
        toggleDisabledHandler();

        await dispatch(deleteUser(_id));

        toggleDisabledHandler();
    }

    return (
        <div className="changeUser__items_item">
            <div className="item__login centered-row">{login}</div>
            <div className="item__email centered-row">{email}</div>
            <div className="item__name centered-row">{name}</div>
            <div className="item__permissions centered-row">{userGroups[permissions as keyof typeof UserPermissions]}</div>
            <div className="item__phone centered-row">{phone}</div>
            <div className="item__delete centered-row"><button type="button" onClick={deleteHandler} disabled={disabled}><DeleteIcon /></button></div>
        </div>
    );
}

export default ChangeUsersItem;