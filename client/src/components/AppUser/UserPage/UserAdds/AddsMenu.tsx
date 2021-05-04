import { FC } from 'react';
import { NavLink } from 'react-router-dom';

const AddsMenu: FC = () => {
    return (
        <nav className="userAdds__menu">
            <ul>
                <li>
                    <NavLink exact to="/app/profile/" activeClassName="activeUserAdd">Збережені товари</NavLink>
                </li>
                <li>
                    <NavLink exact to="/app/profile/orders" activeClassName="activeUserAdd">Замовлення</NavLink>
                </li>
                <li>
                    <NavLink exact to="/app/profile/comments" activeClassName="activeUserAdd">Коментарі</NavLink>
                </li>
            </ul>
            <hr/>
        </nav>
    )
};

export default AddsMenu;