import { FC, useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';

import { convertBuffer } from '../../../../assets/helpers/helpers';
import { ChangePagesItemType } from '../../../../types/common';
import { DiscountItemType } from '../../../../types/stateTypes';
import AddUpdateDiscountForm from '../../../common/Form/AddUpdateDiscountForm';
import EditIcon from '../../../common/Icons/EditIcon';
import DeleteIcon from '../../../common/Icons/DeleteIcon';
import MyDialogWindow from '../../../common/MyDialogWindow';
import defaultProductPhoto from './../../../../assets/images/defaultProduct.png';

type ChangeDiscountsItemType = {
    discount: DiscountItemType;
} & ChangePagesItemType;

const ChangeDiscountsItem: FC<ChangeDiscountsItemType> = ({discount, isFetching, deleteHandler}) => {
    const [openForm, setOpenForm] = useState<boolean>(false);

    const toggleOpenForm = (): void => {
        setOpenForm(prev => !prev);
    }

    return (
        <div className="discountItem borderRadius">
            <MyDialogWindow
                dialogWidth='sm'
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
            <div className="discountItem__image">
                <img src={discount.image.data ? convertBuffer(discount.image.data.data): defaultProductPhoto} alt="discount" />
            </div>
            <div className="discountItem__name">{discount.name}</div>
            <div className="discountItem__description">{discount.description}</div>
            <div className="discountItem__panel space-betw-row">
                <div className="discountItem__percent">{discount.percent}%</div>
                <div className="discountItem__settings centered-row">
                    <Tooltip title="Змінити знижку" arrow>
                        <button
                            className="editBtn" 
                            type="button" 
                            onClick={toggleOpenForm} 
                            disabled={isFetching}
                        >
                            <EditIcon />
                        </button>
                    </Tooltip>
                    <Tooltip title="Видалити знижку" arrow>
                        <button 
                            className="deleteBtn"
                            type="button" 
                            onClick={() => deleteHandler(discount._id)} 
                            disabled={isFetching}
                        >
                            <DeleteIcon />
                        </button>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}

export default ChangeDiscountsItem;