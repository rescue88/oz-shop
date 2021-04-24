import { FC, ReactElement } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import st from './Home.module.css';
import img from './../../../assets/slider.jpg';
import PrevButton from './Arrows/PrevButton';
import NextButton from './Arrows/NextButton';
import RandomPropsType from './Arrows/RandomPropsType';

type SlickSettingsType = {
    dots?: boolean;
    infinite?: boolean;
    draggable?: boolean;
    adaptiveHeight?: boolean;
    autoplay?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    prevArrow?: ReactElement<RandomPropsType>;
    nextArrow?: ReactElement<RandomPropsType>;
}

const Home: FC = () => {
    const settings: SlickSettingsType = {
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
        <div className={st.slider}>
            <Slider {...settings} >
                <div className={st.slider__item}>
                    <img src={img} alt="" />
                </div>
                <div className={st.slider__item}>
                    <img src={img} alt="" />
                </div>
                <div className={st.slider__item}>
                    <img src={img} alt="s" />
                </div>
            </Slider>
        </div>
    )
}

export default Home;