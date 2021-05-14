import { FC } from 'react';
import { Route } from 'react-router-dom';

import AddsMenu from './AddsMenu';
import UserComments from './tabs/UserComments';
import UserFavorites from './tabs/UserFavorites/UserFavorites';
import UserOrders from './tabs/UserOrders';

const UserAdds: FC = () => {
    return (
        <div className="userAdds">
            <AddsMenu />

            <div className="userAdds__content">
                <Route exact path="/app/profile" render={() => <UserFavorites />} />
                <Route exact path="/app/profile/orders" render={() => <UserOrders />} />
                <Route exact path="/app/profile/comments" render={() => <UserComments />} />
            </div>
        </div>
    )
};

export default UserAdds;
