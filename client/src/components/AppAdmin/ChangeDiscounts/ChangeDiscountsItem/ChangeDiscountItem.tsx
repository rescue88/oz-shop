import { FC, useState } from 'react';

import { convertBuffer } from '../../../../assets/helpers/helpers';
import { ChangePagesItemType } from '../../../../types/common';
import { ChangeDiscountsPageType } from '../../../../types/stateTypes';
import AddUpdateDiscountForm from '../../../common/Form/AddUpdateDiscountForm';
import EditIcon from '../../../common/Icons/EditIcon';
import DeleteIcon from '../../../common/Icons/DeleteIcon';
import MyDialogWindow from '../../../common/MyDialogWindow';
import defaultProductPhoto from './../../../../assets/images/defaultProduct.png';

type ChangeDiscountsItemType = {
    discount: ChangeDiscountsPageType;
} & ChangePagesItemType;

const ChangeDiscountsItem: FC<ChangeDiscountsItemType> = ({discount, isFetching, deleteHandler}) => {
    const [openForm, setOpenForm] = useState<boolean>(false);

    const toggleOpenForm = (): void => {
        setOpenForm(prev => !prev);
    }

    return (
        <div className="changeBlock__items_item">
            <MyDialogWindow
                dialogWidth={'md'}
                open={openForm}
                onClose={toggleOpenForm}
                Content={
                    <AddUpdateDiscountForm 
                        header="Оновити товар" 
                        discount={discount} 
                        closeForm={toggleOpenForm} 
                    />
                }
            />
            <div className="item__image centered-row">
                <img 
                    className="centered-row" 
                    src={discount.image.data ? convertBuffer(discount.image.data.data): defaultProductPhoto} 
                    alt="" 
                />
            </div>
            <div className="item__name centered-row">{discount.name}</div>
            <div className="item__description centered-row">₴{discount.description}</div>
            <div className="item__percent centered-row">{discount.percent}</div>
            <div className="item__change centered-row">
                <button 
                    type="button" 
                    onClick={toggleOpenForm} 
                    disabled={isFetching}
                >
                    <EditIcon />
                </button>
            </div>
            <div className="item__delete centered-row">
                <button 
                    type="button" 
                    onClick={() => deleteHandler(discount._id)} 
                    disabled={isFetching}
                >
                    <DeleteIcon />
                </button>
            </div>
        </div>
    );
}

export default ChangeDiscountsItem;