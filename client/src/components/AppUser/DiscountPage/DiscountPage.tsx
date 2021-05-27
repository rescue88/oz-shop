import { FC } from 'react';
import { useSelector } from 'react-redux';
import { StateType } from '../../../types/stateTypes';
import DiscountPageItem from './DiscountPageItem';

const DiscountPage: FC = () => {
    const {discounts} = useSelector((state: StateType) => state.discount);

    return (
        <div className="discounts">
            <div className="discounts__header">Наявні знижки</div>
            <div className="discounts__items">
                {
                    discounts.length ? (
                        discounts.map(item => (
                            <DiscountPageItem discount={item} />
                        ))
                    ) : (
                        <div className="no-items">Наразі немає діючих знижок</div>
                    )
                }
            </div>
        </div>
    );
}

export default DiscountPage;