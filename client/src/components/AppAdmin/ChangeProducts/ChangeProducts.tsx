import { useCallback } from 'react';
import { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../../../redux/reducers/adminReducer';
import { getProducts } from '../../../redux/reducers/productReducer';
import { StateType } from '../../../types/stateTypes';
import ChangePageLoader from '../../common/Loader/ChangePageLoader';
import ChangeProductsItem from './ChangeProductsItem/ChangeProductsItem';

const productTableKeys = [
    'Зображення',
    'Назва',
    'Ціна',
    'Кількість',
    'Змінити',
    'Видалити',
]

const ChangeProducts: FC = () => {
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const dispatch = useDispatch();
    const {products} = useSelector((state: StateType) => state.product);

    const getProductsHandler = async () => {
        setIsFetching(true);

        await dispatch(getProducts());

        setIsFetching(false);
    }

    const deleteProductHandler = useCallback(async (id: string) => {
        setIsFetching(true);

        await dispatch(deleteProduct(id));

        setIsFetching(false);
    }, []);

    useEffect(() => {
        getProductsHandler();
    }, [deleteProductHandler]);

    return (
        <div className="changeContainer">
            <div className="changeContainer__header">Редагування товарів</div>
            <hr />
            <div className="changeContainer__content changeBlock">
                <div className="changeBlock__header changeProducts">
                    {
                        productTableKeys.map(item => (
                            <div key={item} className="changeBlock__header_item centered-row">{item}</div>
                        ))
                    }
                </div>
                <div className="changeBlock__items changeProducts">
                    {
                        products.length ? (
                            products.map(item => (
                                <ChangeProductsItem 
                                    key={item._id} 
                                    {...item} 
                                    isFetching={isFetching} 
                                    deleteProduct={deleteProductHandler} 
                                />
                            ))
                        ) : (
                            Array(10).fill(0).map(item => <ChangePageLoader />)
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default ChangeProducts;