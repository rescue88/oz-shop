import { FC } from 'react';
import Tooltip from '@material-ui/core/Tooltip';

import SettingsIcon from '../icons/SettingsIcon';
import defaultAva from './../../../../assets/images/defaultAva.png';

const userGroups = {
    user: 'користувач',
    admin: 'адмін',
    moder: 'контент-менеджер'
}

const UserInfo: FC = () => {
    return (
        <section className="userInfo">
            <div className="userInfo__header">Ваш профіль</div>
            <hr/>
            <div className="userInfo__data space-betw-row">
                <div className="userInfo__data_avatar">
                    <img src={defaultAva} alt="user avatar"/>
                </div>
                <div className="userInfo__data_content space-betw-row">
                    <div className="part1">
                        <div className="userInfo__item">
                            <b>Логін:</b> finik
                        </div>
                        <div className="userInfo__item">
                            <b>Пошта:</b> finik848848@gmail.com
                        </div>
                        <div className="userInfo__item">
                            <b>Ім'я:</b> Богдан Згоннік
                        </div>
                    </div>
                    <div className="part1">
                        <div className="userInfo__item">
                            <b>Телефон:</b> +380980593614
                        </div>
                        <div className="userInfo__item">
                            <b>Створено профіль:</b> 22 квітня 2021
                        </div>
                        <div className="userInfo__item">
                            <b>Група:</b> {userGroups.user}
                        </div>
                    </div>
                </div>
                <div className="userInfo__data_settings">
                    <Tooltip title="Змінити дані профіля">
                        <div>
                            <SettingsIcon />
                        </div>
                    </Tooltip>
                </div>
            </div>
        </section>
    )
}

export default UserInfo;