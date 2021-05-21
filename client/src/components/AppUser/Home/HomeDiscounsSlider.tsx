import { FC } from 'react';
import Slider from 'react-slick';
import { NavLink } from 'react-router-dom';

import { DiscountItemType } from '../../../types/stateTypes';
import defaultSliderImg from './../../../assets/slider.jpg';
import PrevButton from './Arrows/PrevButton';
import NextButton from './Arrows/NextButton';
import { convertBuffer } from '../../../assets/helpers/helpers';

export type SliderButtonsType = {
    onClick?: () => void;
}

type HomeDiscounsSliderType = {
    discounts: Array<DiscountItemType>;
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

const HomeDiscounsSlider: FC<HomeDiscounsSliderType> = ({discounts}) => {
    return (
        <div className="discountSlider">
            {
                discounts.length ? (
                    <div className="slider">
                        <Slider {...sliderSettings} >
                            {
                                discounts.map(item => (
                                    <NavLink key={item._id} to="/app" className="slider__item">
                                        <img src={item.image.data ? convertBuffer(item.image.data.data) : defaultSliderImg} alt="available discount" />
                                    </NavLink>
                                ))
                            }
                        </Slider>
                    </div>
                ) : (
                    <div className="slider">
                        <Slider {...sliderSettings} >
                            <div className="slider__item">
                                <img src={defaultSliderImg} alt="default discount block" />
                            </div>
                            <div className="slider__item">
                                <img src={defaultSliderImg} alt="efault discount block" />
                            </div>
                            <div className="slider__item">
                                <img src={defaultSliderImg} alt="efault discount block" />
                            </div>
                        </Slider>
                    </div>
                )
            }
        </div>
    )
}

export default HomeDiscounsSlider;