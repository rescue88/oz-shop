import { FC } from 'react';

import { useSelector } from 'react-redux';
import { StateType } from '../../../types/stateTypes';
import HomeDiscounsSlider from './HomeDiscounsSlider';
import HomeLatestProducts from './HomeLatestProducts';

export type SliderButtonsType = {
    onClick?: () => void;
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