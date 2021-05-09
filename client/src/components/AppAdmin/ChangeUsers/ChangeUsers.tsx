import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUsers } from '../../../redux/reducers/adminReducer';
import { ChangeUsersPageType, StateType } from '../../../types/stateTypes';
import ChangeUsersItem from './ChangeUsersItem/ChangeUsersItem';

const userTableKeys = [
    "Логін",
    "Пошта",
    "Ім'я",
    "Група",
    "Мобільний",
    "Видалення"
];

const ChangeUsers: FC = () => {
    const dispatch = useDispatch();
    const users: Array<ChangeUsersPageType> = useSelector((state: StateType) => state.admin.changeUsers);
    console.log(users);

    const changeUsersHandler = async () => {
        await dispatch(getUsers());
    }

    useEffect(() => {
        changeUsersHandler();
    }, []);
    
    return (
        <div className="changeContainer">
            <div className="changeContainer__header">Редагування користувачів</div>
            <hr />
            <div className="changeContainer__content changeUser">
                <div className="changeUser__header">
                    {
                        userTableKeys.map(item => (
                            <div key={item} className="changeUser__header_item centered-row">{item}</div>
                        ))
                    }
                </div>
                <div className="changeUser__items">
                    {
                        users.map(item => <ChangeUsersItem key={item.id} {...item} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default ChangeUsers;