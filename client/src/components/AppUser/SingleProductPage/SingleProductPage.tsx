import { FC, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useParams } from 'react-router-dom';

import { getStorageItem } from '../../../assets/helpers/helpers';
import { clearSingleProduct, getSingleProduct } from '../../../redux/reducers/productReducer';
import { clearRating, getOwnRating } from '../../../redux/reducers/ratingReducer';
import { StateType } from '../../../types/stateTypes';
import AddUpdateRatingForm from '../../common/Form/AddUpdateRatingForm';
import StarSolidIcon from '../../common/Icons/StarSolidIcon';
import ProductTabLoader from '../../common/Loader/ProductTabLoader';
import MyDialogWindow from '../../common/MyDialogWindow';
import Rating from '../../common/Rating/Rating';
import CommentsTab from './Comments/CommentsTab';
import ProductTab from './Product/ProductTab';
import SingleProductPageNav from './SingleProductPageNav';

type ProductPageParamType = {
    productId: string;
}

const SingleProductPage: FC = () => {
    const [openForm, setOpenForm] = useState<boolean>(false);
    const productId = useParams<ProductPageParamType>().productId;
    const dispatch = useDispatch();
    const {singleProduct} = useSelector((state: StateType) => state.product);
    const {rating} = useSelector((state: StateType) => state.rating);
    const {isAuth} = useSelector((state: StateType) => state.auth);

    const toggleOpenFormHandler = () => {
        setOpenForm(prev => !prev);
    }

    const getProductHandler = useCallback(async () => {
        const userId: string | undefined = getStorageItem()?.userId;

        if(userId) {
            await dispatch(getOwnRating(userId, productId));
        }

        await dispatch(getSingleProduct(productId));
    }, [dispatch, productId]);

    useEffect(() => {
        getProductHandler();

        // do smth when component is unmounted
        return () => {
            dispatch(clearSingleProduct());
            dispatch(clearRating());
        }
    }, [getProductHandler, dispatch]);

    return (
        <div className="singleProduct">
            {
                singleProduct ? (
                    <>
                        <MyDialogWindow 
                            open={openForm}
                            dialogWidth='xs'
                            onClose={toggleOpenFormHandler}
                            Content={
                                <AddUpdateRatingForm
                                    rating={rating}
                                    productId={singleProduct._id}
                                    header={singleProduct.name}
                                    closeForm={toggleOpenFormHandler}
                                />
                            }
                        />
                        <div className="singleProduct__header">{singleProduct.name}</div>
                        <div className="singleProduct__rateDate space-betw-row">
                            <div className="singleProduct__rateDate_rate centered-row">
                                <div className={isAuth ? '' : 'disable-click'} onClick={toggleOpenFormHandler}><Rating rating={singleProduct.rating} /></div>
                                <div className="ownRating centered-row">
                                    <StarSolidIcon />
                                    {rating ? rating: '???????? ???????????? ???? ???? ????????????'}
                                </div>
                            </div>
                            <div className="singleProduct__rateDate_date">
                                ????????????????: {singleProduct.created}
                            </div>
                        </div>
                        <SingleProductPageNav productId={productId} />
                        <div className="singleProduct__content">
                            <Route exact path={`/app/products/${productId}`} render={() => <ProductTab product={singleProduct} />} />
                            <Route exact path={`/app/products/${productId}/comments/`} render={() => <CommentsTab productId={productId} />} />
                        </div>
                    </>
                ) : (
                    <ProductTabLoader />
                )
            }
        </div>
    );
}

export default SingleProductPage;