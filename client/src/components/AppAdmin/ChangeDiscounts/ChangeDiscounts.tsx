import Tooltip from '@material-ui/core/Tooltip';
import { FC, useState } from 'react';

import MySimpleTextInput from '../../common/Input/MySimpleTextInput';
import AddIcon from '../../common/Icons/AddIcon';
import MyDialogWindow from '../../common/MyDialogWindow';
import AddUpdateDiscountForm from '../../common/Form/AddUpdateDiscountForm';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../../types/stateTypes';
import ChangeDiscountsItem from './ChangeDiscountsItem/ChangeDiscountItem';
import ChangePageLoader from '../../common/Loader/ChangePageLoader';
import { deleteDiscount } from '../../../redux/reducers/adminReducer';

const ChangeDiscounts: FC = () => {
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [openForm, setOpenForm] = useState<boolean>(false);
    const [searchStr, setSearchStr] = useState<string>('');
    const dispatch = useDispatch();
    const {discounts} = useSelector((state: StateType) => state.discount);

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
                dialogWidth='sm'
                open={openForm}
                onClose={toggleOpenForm}
                Content={
                    <AddUpdateDiscountForm 
                        header="Додати знижку" 
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
                        <button 
                            className="addBtn"
                            onClick={toggleOpenForm}
                            disabled={isFetching}
                        >
                            <AddIcon />
                        </button>
                    </Tooltip>
                </div>
                <div className="discounts__items">
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