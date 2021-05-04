import { FC } from 'react';

import UserAdds from './UserAdds/UserAdds';
import UserInfo from './UserInfo/UserInfo';

const UserPage: FC = () => {
    return (
        <div className="userPage">
            <UserInfo />
            <UserAdds />
        </div>
    )
}

export default UserPage;