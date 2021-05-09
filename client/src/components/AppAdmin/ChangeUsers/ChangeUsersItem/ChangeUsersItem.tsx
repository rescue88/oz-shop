import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../../../redux/reducers/adminReducer';

import { ChangeUsersPageType } from '../../../../types/stateTypes';
import DeleteIcon from '../../../common/Icons/DeleteIcon';

const ChangeUsersItem: FC<ChangeUsersPageType> = ({id, login, email, name, permissions, phone}) => {
    const [disabled, setDisabled] = useState<boolean>(false);
    const dispatch = useDispatch();

    const toggleDisabledHandler = () => {
        setDisabled(prev => !prev);
    }

    const deleteHandler = async () => {
        toggleDisabledHandler();

        await dispatch(deleteUser(id));

        toggleDisabledHandler();
    }

    return (
        <div className="changeUser__items_item">
            <div className="item__login centered-row">{login}</div>
            <div className="item__email centered-row">{email}</div>
            <div className="item__name centered-row">{name}</div>
            <div className="item__permissions centered-row">{permissions}</div>
            <div className="item__phone centered-row">{phone}</div>
            <div className="item__delete centered-row"><button type="button" onClick={deleteHandler} disabled={disabled}><DeleteIcon /></button></div>
        </div>
    );
}

export default ChangeUsersItem;