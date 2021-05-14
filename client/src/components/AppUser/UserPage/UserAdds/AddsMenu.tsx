import { FC } from 'react';
import { NavLink } from 'react-router-dom';

const AddsMenu: FC = () => {
    return (
        <nav className="userAdds__menu">
            <ul>
                <li>
                    <NavLink exact to="/app/profile/" activeClassName="activeTab">Збережені товари</NavLink>
                </li>
                <li>
                    <NavLink exact to="/app/profile/orders" activeClassName="activeTab">Замовлення</NavLink>
                </li>
                <li>
                    <NavLink exact to="/app/profile/comments" activeClassName="activeTab">Коментарі</NavLink>
                </li>
            </ul>
            <hr/>
        </nav>
    )
};

export default AddsMenu;