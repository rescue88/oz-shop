import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUsers } from '../../../redux/reducers/adminReducer';
import { ChangeUsersPageType, StateType } from '../../../types/stateTypes';

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

    const changeUsersHandler = async () => {
        await dispatch(getUsers());
    }

    useEffect(() => {
        changeUsersHandler();
    }, [changeUsersHandler, dispatch]);
    
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
                    <div className="changeUser__items_item">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangeUsers;