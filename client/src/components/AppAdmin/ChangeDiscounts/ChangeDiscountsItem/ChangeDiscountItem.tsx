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
        <div className="changeBlock__items_item">
            <MyDialogWindow
                dialogWidth='md'
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
            <div className="item__image">
                <img 
                    className="" 
                    src={discount.image.data ? convertBuffer(discount.image.data.data): defaultProductPhoto} 
                    alt="" 
                />
            </div>
            <div className="item__name">{discount.name}</div>
            <div className="item__description">{discount.description}</div>
            <div className="item__panel space-betw-row">
                <div className="item__panel_percent centered-row">
                    <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M112 224c61.9 0 112-50.1 112-112S173.9 0 112 0 0 50.1 0 112s50.1 112 112 112zm0-160c26.5 0 48 21.5 48 48s-21.5 
                            48-48 48-48-21.5-48-48 21.5-48 48-48zm224 224c-61.9 0-112 50.1-112 112s50.1 112 112 112 112-50.1 112-112-50.1-112-112-112zm0 
                            160c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zM392.3.2l31.6-.1c19.4-.1 30.9 21.8 19.7 37.8L77.4 
                            501.6a23.95 23.95 0 0 1-19.6 10.2l-33.4.1c-19.5 0-30.9-21.9-19.7-37.8l368-463.7C377.2 4 384.5.2 392.3.2z">
                        </path>
                    </svg>
                    {discount.percent}
                </div>
                <div className="item__buttons">
                    <div className="item__change">
                        <Tooltip title="Змінити знижку" arrow>
                            <button 
                                type="button" 
                                onClick={toggleOpenForm} 
                                disabled={isFetching}
                            >
                                <EditIcon />
                            </button>
                        </Tooltip>
                    </div>
                    <div className="item__delete">
                        <Tooltip title="Видалити знижку" arrow>
                            <button 
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
        </div>
    );
}

export default ChangeDiscountsItem;