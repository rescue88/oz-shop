import React from 'react';
import { useDispatch } from 'react-redux';

import { getStorageItem } from '../../../assets/helpers/helpers';
import { getSingleProduct } from '../../../redux/reducers/productReducer';
import { addRating, updateRating } from '../../../redux/reducers/ratingReducer';
import { AddUpdateFormType } from '../../../types/common';
import StarSolidIcon from '../Icons/StarSolidIcon';

type AddUpdateRatingFormType = {
    rating: number | null;
    productId: string;
} & AddUpdateFormType;

const ratings = {
    10: 'усе сподобалось',
    9: 'майже ідеально',
    8: 'є незначні недоліки',
    7: 'більше плюсів, ніж мінусів',
    6: 'вцілому непогано',
    5: 'нижче середнього',
    4: 'погана якість',
    3: 'майже не відповідає х-м',
    2: 'жахливо',
    1: 'найгірший стан',
}

const AddUpdateRatingForm: React.FC<AddUpdateRatingFormType> = ({productId, rating, header, closeForm}) => {
    const [isFetching, setIsFetching] = React.useState<boolean>(false);
    const dispatch = useDispatch();

    const addOrUpdateHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsFetching(true);

        const userId = getStorageItem()!.userId;
        const choosenRating: number = Number(event.currentTarget.name);

        if(rating) {
            await dispatch(updateRating(userId, productId, choosenRating));
        } else {
            await dispatch(addRating(userId, productId, choosenRating));
        }

        setIsFetching(false);

        closeForm();

        dispatch(getSingleProduct(productId));
    }

    return (
        <div className="ratingForm">
            <div className="form__header">{rating ? 'Змінити рейтинг товару' : header}</div>
            <hr />
            {
                Object.keys(ratings).reverse().map(item => (
                    <button 
                        key={item}
                        name={item} 
                        className="ratingForm__input" 
                        onClick={(e) => addOrUpdateHandler(e)}
                        disabled={isFetching}
                    >
                        <StarSolidIcon />
                        <div>{item}&nbsp;-&nbsp;</div>
                        <div className="ratingForm__input_label">{ratings[Number(item) as keyof typeof ratings]}</div>
                    </button>
                ))
            }
        </div>
    );
}

export default AddUpdateRatingForm;