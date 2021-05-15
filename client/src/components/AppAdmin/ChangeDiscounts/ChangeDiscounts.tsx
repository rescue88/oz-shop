import Tooltip from '@material-ui/core/Tooltip';
import { FC, useState } from 'react';

import MySimpleTextInput from '../../common/Input/MySimpleTextInput';
import AddIcon from '../../common/Icons/AddIcon';
import MyDialogWindow from '../../common/MyDialogWindow';
import AddUpdateDiscountForm from '../../common/Form/AddUpdateDiscountForm';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeDiscountsPageType, StateType } from '../../../types/stateTypes';
import ChangeDiscountsItem from './ChangeDiscountsItem/ChangeDiscountItem';
import ChangePageLoader from '../../common/Loader/ChangePageLoader';
import { deleteDiscount } from '../../../redux/reducers/adminReducer';

const ChangeDiscounts: FC = () => {
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [openForm, setOpenForm] = useState<boolean>(false);
    const [searchStr, setSearchStr] = useState<string>('');
    const dispatch = useDispatch();
    const discounts: Array<ChangeDiscountsPageType> = useSelector((state: StateType) => state.admin.changeDiscounts);

    const changeSearchStrHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchStr(event.currentTarget.value.toLocaleLowerCase());
    }

    const toggleOpenForm = () => {
        setOpenForm(prev => !prev);
    }

    const deleteDiscountHandler = async (id: string) => {
        setIsFetching(true);

        await(dispatch(deleteDiscount(id)));

        setIsFetching(false);
    }

    return (
        <div className="changeContainer">
            <MyDialogWindow 
                dialogWidth={'sm'}
                open={openForm}
                onClose={toggleOpenForm}
                Content={
                    <AddUpdateDiscountForm 
                        header="Оновити товар" 
                        closeForm={toggleOpenForm} 
                    />
                }
            />
            <div className="changeContainer__header">Редагування знижок</div>
            <hr />
            <div className="changeContainer__content changeBlock">
                <div className="changeBlock__panel space-betw-row">
                    <div className="changeBlock__panel_findInput">
                        <label htmlFor="search">Пошук знижок за назвою</label>
                        <MySimpleTextInput name="search" changeHandler={changeSearchStrHandler} inputValue={searchStr} />
                    </div>
                    
                    <Tooltip title="Додати знижку" arrow>
                        <div className="changeBlock__panel_addItem" onClick={toggleOpenForm}>
                            <button>
                                <AddIcon />
                            </button>
                        </div>
                    </Tooltip>
                </div>
                {/* <div className="changeBlock__header changeProducts">
                    {
                        discountTableKeys.map(item => (
                            <div key={item} className="changeBlock__header_item centered-row">{item}</div>
                        ))
                    }
                </div> */}
                <div className="changeBlock__items changeDiscounts centered-col">
                    {
                        discounts.length ? searchStr ? (
                            discounts.filter(item => item.name.toLowerCase().includes(searchStr)).map(item => (
                                <ChangeDiscountsItem 
                                    key={item._id} 
                                    discount={item}
                                    isFetching={isFetching}
                                    deleteHandler={deleteDiscountHandler}
                                />
                            ))
                        ) : (
                            discounts.map(item => (
                                <ChangeDiscountsItem 
                                    key={item._id}
                                    discount={item}
                                    isFetching={isFetching}
                                    deleteHandler={deleteDiscountHandler}
                                />
                            ))
                        ) : (
                            Array(10).fill(0).map((item, idx) => <ChangePageLoader key={idx} />)
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ChangeDiscounts;