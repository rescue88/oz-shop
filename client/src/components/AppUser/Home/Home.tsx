import { FC, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearLatestProducts, getLatestProducts } from '../../../redux/reducers/productReducer';

import { StateType } from '../../../types/stateTypes';
import HomeDiscounsSlider from './HomeDiscounsSlider';
import HomeLatestProducts from './HomeLatestProducts';

export type SliderButtonsType = {
    onClick?: () => void;
}

const Home: FC = () => {
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const dispatch = useDispatch();
    const {discounts} = useSelector((state: StateType) => state.discount);
    const {latestProducts} = useSelector((state: StateType) => state.product);

    const getLatestProductsHandler = useCallback(async () => {
        setIsFetching(true);

        await dispatch(getLatestProducts());

        setIsFetching(false);
    }, []);

    useEffect(() => {
        getLatestProductsHandler();

        return () => {
            dispatch(clearLatestProducts());
        }
    }, [getLatestProductsHandler]);

    return (
        <div className="homePage">
            <HomeDiscounsSlider discounts={discounts} />
            <HomeLatestProducts products={latestProducts} isFetching={isFetching} />
        </div>
    )
}

export default Home;