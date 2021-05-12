import { FC } from 'react';

import { ProductItemType } from '../../../../types/stateTypes';
import DeleteIcon from '../../../common/Icons/DeleteIcon';
import EditIcon from '../../../common/Icons/EditIcon';
import defaultProductPhoto from './../../../../assets/images/defaultProduct.png';

type ChangeProductsItemType = {
    updateProduct?: () => void;
    deleteProduct: (id: string) => void;
    isFetching: boolean;
}

const ChangeProductsItem: FC<ProductItemType & ChangeProductsItemType> = ({
        deleteProduct, isFetching, _id, image, name, price, amount
    }) => {
    console.log(image);
    return (
        <div className="changeBlock__items_item">
            <div className="item__image centered-row">
                <img className="centered-row" src={defaultProductPhoto} alt="" />
            </div>
            <div className="item__name centered-row">{name}</div>
            <div className="item__price centered-row">₴{price}</div>
            <div className="item__amount centered-row">{amount}</div>
            <div className="item__change centered-row">
                <button 
                    type="button" 
                    // onClick={deleteProduct} 
                    disabled={isFetching}
                >
                    <EditIcon />
                </button>
            </div>
            <div className="item__delete centered-row">
                <button 
                    type="button" 
                    onClick={() => deleteProduct(_id)} 
                    disabled={isFetching}
                >
                    <DeleteIcon />
                </button>
            </div>
        </div>
    );
}

export default ChangeProductsItem;