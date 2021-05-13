import Tooltip from '@material-ui/core/Tooltip';
import React, { FC, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteProduct } from '../../../redux/reducers/adminReducer';
import { getProducts } from '../../../redux/reducers/productReducer';
import { StateType } from '../../../types/stateTypes';
import AddUpdateProductForm from '../../common/Form/AddUpdateProductForm';
import AddIcon from '../../common/Icons/AddIcon';
import MySimpleTextInput from '../../common/Input/MySimpleTextInput';
import ChangePageLoader from '../../common/Loader/ChangePageLoader';
import MyDialogWindow from '../../common/MyDialogWindow';
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
    const [openForm, setOpenForm] = useState<boolean>(false);
    const [searchStr, setSearchStr] = useState<string>('');
    const dispatch = useDispatch();
    const {products} = useSelector((state: StateType) => state.product);

    const toggleOpenForm = () => {
        setOpenForm(prev => !prev);
    }

    const changeSearchStrHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchStr(event.currentTarget.value.toLocaleLowerCase());
    }

    const getProductsHandler = useCallback(async () => {
        setIsFetching(true);

        await dispatch(getProducts());

        setIsFetching(false);
    }, []);

    const updateProductHandler = useCallback(async() => {

    }, []);

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
            <MyDialogWindow
                dialogWidth={'md'}
                open={openForm}
                onClose={toggleOpenForm}
                Content={
                    <AddUpdateProductForm 
                        header="Додати товар"
                        closeForm={toggleOpenForm} 
                    />
                }
            />
            <div className="changeContainer__header">Редагування товарів</div>
            <hr />
            <div className="changeContainer__content changeBlock">
                <div className="changeBlock__panel space-betw-row">
                    <div className="changeBlock__panel_findInput">
                        <label htmlFor="search">Пошук за іменем продукта</label>
                        <MySimpleTextInput name="search" changeHandler={changeSearchStrHandler} inputValue={searchStr} />
                    </div>
                    
                    <Tooltip title="Додати товар" arrow>
                        <div className="changeBlock__panel_addItem" onClick={toggleOpenForm}>
                            <button>
                                <AddIcon />
                            </button>
                        </div>
                    </Tooltip>
                </div>
                <div className="changeBlock__header changeProducts">
                    {
                        productTableKeys.map(item => (
                            <div key={item} className="changeBlock__header_item centered-row">{item}</div>
                        ))
                    }
                </div>
                <div className="changeBlock__items changeProducts">
                    {
                        products.length ? searchStr ? ( 
                            products.filter(item => item.name.toLowerCase().includes(searchStr)).map(item => (
                                <ChangeProductsItem 
                                    key={item._id} 
                                    product={item}
                                    isFetching={isFetching} 
                                    deleteProduct={deleteProductHandler} 
                                />
                            ))
                        ) : (
                            products.map(item => (
                                <ChangeProductsItem 
                                    key={item._id} 
                                    product={item}
                                    isFetching={isFetching} 
                                    deleteProduct={deleteProductHandler} 
                                />
                            ))
                        ) : (
                            Array(10).fill(0).map((item, idx) => <ChangePageLoader key={idx} />)
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default ChangeProducts;