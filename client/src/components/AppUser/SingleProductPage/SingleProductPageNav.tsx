import { FC } from 'react';
import { NavLink } from 'react-router-dom';

type SingleProductPageNavType = {
    productId: string;
}

const SingleProductPageNav: FC<SingleProductPageNavType> = ({productId}) => {
    return (
        <nav className="singleProduct__nav">
            <ul>
                <li>
                    <NavLink exact to={`/app/products/${productId}`} activeClassName="activeLink">Усе про товар</NavLink>
                </li>
                <li>
                    <NavLink exact to={`/app/products/${productId}/comments/`} activeClassName="activeLink">Відгуки</NavLink>
                </li>
            </ul>
            <hr />
        </nav>
    );
}

export default SingleProductPageNav;