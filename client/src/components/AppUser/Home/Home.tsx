import { FC } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import defaultSliderImg from './../../../assets/slider.jpg';
import PrevButton from './Arrows/PrevButton';
import NextButton from './Arrows/NextButton';
import { useSelector } from 'react-redux';
import { StateType } from '../../../types/stateTypes';
import HomeDiscounsSlider from './HomeDiscounsSlider';
import HomeLatestProducts from './HomeLatestProducts';

export type SliderButtonsType = {
    onClick?: () => void;
}

const sliderSettings = {
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

const Home: FC = () => {
    const {discounts} = useSelector((state: StateType) => state.discount);

    return (
        <div className="homePage">
            <HomeDiscounsSlider discounts={discounts} />
            <HomeLatestProducts />
        </div>
    )
}

export default Home;