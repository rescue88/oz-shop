import { FC, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useParams } from 'react-router-dom';

import { clearSingleProduct, getSingleProduct } from '../../../redux/reducers/productReducer';
import { StateType } from '../../../types/stateTypes';
import ProductTabLoader from '../../common/Loader/ProductTabLoader';
import Rating from '../../common/Rating/Rating';
import Comments from './Comments/Comments';
import Product from './Product/ProductTab';
import SingleProductPageNav from './SingleProductPageNav';

type ProductPageParamType = {
    productId: string;
}

const SingleProductPage: FC = () => {
    const productId = useParams<ProductPageParamType>().productId;
    const dispatch = useDispatch();
    const {singleProduct} = useSelector((state: StateType) => state.product);

    const getProductHandler = useCallback(async () => {
        await dispatch(getSingleProduct(productId));
    }, [dispatch, productId]);

    useEffect(() => {
        getProductHandler();

        // do smth when component is unmounted
        return () => {
            dispatch(clearSingleProduct());
        }
    }, []);

    return (
        <div className="singleProduct">
            {
                singleProduct ? (
                    <>
                        <div className="singleProduct__header">{singleProduct.name}</div>
                        <div className="singleProduct__rateDate space-betw-row">
                            <Rating rating={4} />
                            <div className="singleProduct__rateDate_data">
                                Створено: {singleProduct.created}
                            </div>
                        </div>
                        <SingleProductPageNav productId={productId} />
                        <div className="singleProduct__content">
                            <Route exact path={`/app/products/${productId}`} render={() => <Product product={singleProduct} />} />
                            <Route exact path={`/app/products/${productId}/comments/`} render={() => <Comments />} />
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