import { FC } from 'react';
import Slider from 'react-slick';
import { NavLink } from 'react-router-dom';

import { ProductLatestItemType } from '../../../types/stateTypes';
import defaultProductImg from './../../../assets/images/defaultProduct.png';
import { convertBuffer } from '../../../assets/helpers/helpers';

const sliderSettings = {
    arrows: false,
    dots: false,
    infinite: true,
    draggable: false,
    adaptiveHeight: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
}

type HomeLatestProductsType = {
    isFetching: boolean;
    products: Array<ProductLatestItemType>;
}

const HomeLatestProducts: FC<HomeLatestProductsType> = ({products, isFetching}) => {
    return (
        <div className="homePage__latest">
            <div className="homePage__latest_header">Нові товари на сайті</div>
            <hr />
            <div className="homePage__latest_slider">
                <Slider {...sliderSettings}>
                    {
                        products.map(item => (
                            <NavLink key={item._id} to={`/app/products/${item._id}`} className="homePage__latest_item slider-item">
                                <div className="slider-item__image">
                                    <img src={item.image.data ? convertBuffer(item.image.data.data) : defaultProductImg} alt="latest product" />
                                </div>
                                <div className="slider-item__name">{item.name}</div>
                                <div className="slider-item__price">₴ {item.price}</div>
                            </NavLink>
                        ))
                    }
                </Slider>
            </div>
            <hr />
        </div>
    );
}

export default HomeLatestProducts;