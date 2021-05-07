import { FC } from 'react';
import { useSelector } from 'react-redux';
import { StateType, UserStateType } from '../../../types/stateTypes';

import UserAdds from './UserAdds/UserAdds';
import UserInfo from './UserInfo/UserInfo';

const UserPage: FC = () => {
    const userData: UserStateType = useSelector((state: StateType) => state.user);

    return (
        <div className="userPage">
            <UserInfo userData={userData} />
            <UserAdds />
        </div>
    )
}

export default UserPage;