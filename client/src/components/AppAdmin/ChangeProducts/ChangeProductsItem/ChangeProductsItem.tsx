import { FC, useState } from 'react';
import { convertBuffer } from '../../../../assets/helpers/helpers';
import { ChangePagesItemType } from '../../../../types/common';

import { ProductItemType } from '../../../../types/stateTypes';
import AddUpdateProductForm from '../../../common/Form/AddUpdateProductForm';
import DeleteIcon from '../../../common/Icons/DeleteIcon';
import EditIcon from '../../../common/Icons/EditIcon';
import MyDialogWindow from '../../../common/MyDialogWindow';
import defaultProductPhoto from './../../../../assets/images/defaultProduct.png';

type ChangeProductsItemType = {
    product: ProductItemType;
} & ChangePagesItemType;

const ChangeProductsItem: FC<ChangeProductsItemType> = ({deleteHandler, isFetching, product}) => {
    const [openForm, setOpenForm] = useState<boolean>(false); 

    const toggleOpenForm = () => {
        setOpenForm(prev => !prev);
    }

    return (
        <div className="changeBlock__items_item borderRadius">
            <MyDialogWindow
                dialogWidth='md'
                open={openForm}
                onClose={toggleOpenForm}
                Content={
                    <AddUpdateProductForm 
                        header="Оновити товар" 
                        product={product} 
                        closeForm={toggleOpenForm} 
                    />
                }
            />
            <div className="item__image centered-row">
                <img 
                    className="centered-row" 
                    src={product.image.data ? convertBuffer(product.image.data.data): defaultProductPhoto} 
                    alt="" 
                />
            </div>
            <div className="item__name centered-row">{product.name}</div>
            <div className="item__price centered-row">₴{product.price}</div>
            <div className="item__amount centered-row">{product.amount}</div>
            <button 
                className="editBtn centered-row"
                type="button" 
                onClick={toggleOpenForm} 
                disabled={isFetching}
            >
                <EditIcon />
            </button>
            <button 
                className="deleteBtn centered-row"
                type="button" 
                onClick={() => deleteHandler(product._id)} 
                disabled={isFetching}
            >
                <DeleteIcon />
            </button>
        </div>
    );
}

export default ChangeProductsItem;