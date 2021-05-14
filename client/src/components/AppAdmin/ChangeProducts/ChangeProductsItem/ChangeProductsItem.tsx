import { FC, useState } from 'react';
import { convertBuffer } from '../../../../assets/helpers/helpers';

import { ProductItemType } from '../../../../types/stateTypes';
import AddUpdateProductForm from '../../../common/Form/AddUpdateProductForm';
import DeleteIcon from '../../../common/Icons/DeleteIcon';
import EditIcon from '../../../common/Icons/EditIcon';
import MyDialogWindow from '../../../common/MyDialogWindow';
import defaultProductPhoto from './../../../../assets/images/defaultProduct.png';

type ChangeProductsItemType = {
    product: ProductItemType;
    deleteProduct: (id: string) => void;
    isFetching: boolean;
}

const ChangeProductsItem: FC<ChangeProductsItemType> = ({deleteProduct, isFetching, product}) => {
    const [openForm, setOpenForm] = useState<boolean>(false); 

    const toggleOpenForm = () => {
        setOpenForm(prev => !prev);
    }

    return (
        <div className="changeBlock__items_item">
            <MyDialogWindow
                dialogWidth={'md'}
                open={openForm}
                onClose={toggleOpenForm}
                Content={
                    <AddUpdateProductForm 
                        header="Оновити товар" 
                        item={product} 
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
                    onClick={() => deleteProduct(product._id)} 
                    disabled={isFetching}
                >
                    <DeleteIcon />
                </button>
            </div>
        </div>
    );
}

export default ChangeProductsItem;