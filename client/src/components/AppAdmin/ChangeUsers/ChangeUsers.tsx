import { FC, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteUser, getUsers } from '../../../redux/reducers/adminReducer';
import { ChangeUsersPageType, StateType } from '../../../types/stateTypes';
import MySimpleTextInput from '../../common/Input/MySimpleTextInput';
import ChangePageLoader from '../../common/Loader/ChangePageLoader';
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
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [searchStr, setSearchStr] = useState<string>('');
    const dispatch = useDispatch();
    const users: Array<ChangeUsersPageType> = useSelector((state: StateType) => state.admin.changeUsers);

    const changeSearchStrHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchStr(event.currentTarget.value.toLocaleLowerCase());
    }

    const getUsersHandler =  async () => {
        setIsFetching(true);

        await dispatch(getUsers());

        setIsFetching(false);
    }

    const deleteUserHandler = useCallback(async (id: string) => {
        setIsFetching(true);

        await dispatch(deleteUser(id));

        setIsFetching(false);
    }, []);

    useEffect(() => {
        getUsersHandler();
    }, [deleteUserHandler]);
    
    return (
        <div className="changeContainer">
            <div className="changeContainer__header">Редагування користувачів</div>
            <hr />
            <div className="changeContainer__content changeBlock">
                <div className="changeBlock__panel space-betw-row">
                    <div className="changeBlock__panel_findInput">
                        <label htmlFor="search">Пошук за іменем продукта</label>
                        <MySimpleTextInput name="search" changeHandler={changeSearchStrHandler} inputValue={searchStr} />
                    </div>
                </div>
                <div className="changeBlock__header changeUsers">
                    {
                        userTableKeys.map(item => (
                            <div key={item} className="changeBlock__header_item centered-row">{item}</div>
                        ))
                    }
                </div>
                <div className="changeBlock__items changeUsers">
                    {
                        users.length ? searchStr ? (
                            users.filter(item => item.login.includes(searchStr)).map(item => (
                                <ChangeUsersItem 
                                    key={item._id} 
                                    {...item} 
                                    deleteUser={deleteUserHandler} 
                                    isFetching={isFetching} 
                                />
                            ))
                        ) : (
                            users.map(item => (
                                <ChangeUsersItem 
                                    key={item._id} 
                                    {...item} 
                                    deleteUser={deleteUserHandler} 
                                    isFetching={isFetching} 
                                />
                            ))
                        ) : (
                            Array(10).fill(0).map(item => <ChangePageLoader />)
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ChangeUsers;