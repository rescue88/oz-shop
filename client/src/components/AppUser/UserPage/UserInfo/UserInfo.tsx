import { FC, useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';

import SettingsIcon from '../icons/SettingsIcon';
import defaultAva from './../../../../assets/images/defaultAva.png';
import { UserStateType } from '../../../../types/stateTypes';
import MyDialogWindow from '../../../common/MyDialogWindow';
import UserInfoForm from './UserInfoForm/UserInfoForm';
import { convertBuffer, userGroups } from '../../../../assets/helpers/helpers';

export type UserInfoType = {
    userData: UserStateType;
}

const UserInfo: FC<UserInfoType> = ({userData}) => {
    const [openForm, setOpenForm] = useState<boolean>(false);

    const toggleOpenForm = () => {
        setOpenForm(prev => !prev);
    }

    return (
        <section className="userInfo">
            <MyDialogWindow 
                open={openForm} 
                onClose={toggleOpenForm} 
                Content={<UserInfoForm userData={userData} closeForm={toggleOpenForm} />} 
            />
            <div className="userInfo__header">Ваш профіль</div>
            <hr/>
            <div className="userInfo__data space-betw-row">
                <div className="userInfo__data_avatar">
                    <img src={userData.avatar.data ? convertBuffer(userData.avatar.data.data): defaultAva} alt="user avatar"/>
                </div>
                <div className="userInfo__data_content space-betw-row">
                    <div className="part1">
                        <div className="userInfo__item">
                            <b>Логін:</b> {userData.login}
                        </div>
                        <div className="userInfo__item">
                            <b>Пошта:</b> {userData.email}
                        </div>
                        <div className="userInfo__item">
                            <b>Ім'я:</b> {userData.name}
                        </div>
                    </div>
                    <div className="part1">
                        <div className="userInfo__item">
                            <b>Телефон:</b> {userData.phone}
                        </div>
                        <div className="userInfo__item">
                            <b>Створено профіль:</b> {userData.created}
                        </div>
                        <div className="userInfo__item">
                            <b>Група:</b> {userGroups[userData.permissions]}
                        </div>
                    </div>
                </div>
                <div className="userInfo__data_settings">
                    <Tooltip title="Змінити дані профіля" arrow>
                        <div onClick={toggleOpenForm}>
                            <SettingsIcon />
                        </div>
                    </Tooltip>
                </div>
            </div>
        </section>
    )
}

export default UserInfo;