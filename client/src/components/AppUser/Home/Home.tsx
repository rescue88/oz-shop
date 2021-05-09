import { FC, ReactElement } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img from './../../../assets/slider.jpg';
import PrevButton from './Arrows/PrevButton';
import NextButton from './Arrows/NextButton';

export type SliderButtonsType = {
    onClick?: () => void;
}

const Home: FC = () => {
    const settings = {
        dots: false,
        infinite: true,
        draggable: false,
        adaptiveHeight: true,
        autoplay: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PrevButton />,
        nextArrow: <NextButton />
    }

    return (
        <div className="slider">
            <Slider {...settings} >
                <div className="slider__item">
                    <img src={img} alt="" />
                </div>
                <div className="slider__item">
                    <img src={img} alt="" />
                </div>
                <div className="slider__item">
                    <img src={img} alt="s" />
                </div>
            </Slider>
        </div>
    )
}

export default Home;