import Tooltip from '@material-ui/core/Tooltip';
import { FC, useState } from 'react';

import MySimpleTextInput from '../../common/Input/MySimpleTextInput';
import AddIcon from '../../common/Icons/AddIcon';

const discountTableKeys = [
    'Зображення',
    'Назва',
    'Опис',
    'Знижка',
]

const ChangeDiscounts: FC = () => {
    const [searchStr, setSearchStr] = useState<string>('');

    const changeSearchStrHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchStr(event.currentTarget.value.toLocaleLowerCase());
    }

    const toggleOpenForm = () => {

    }

    return (
        <div className="changeContainer">
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
                <div className="changeBlock__header changeProducts">
                    {
                        discountTableKeys.map(item => (
                            <div key={item} className="changeBlock__header_item centered-row">{item}</div>
                        ))
                    }
                </div>
                <div className="changeBlock__items changeProducts">
                    {
                        
                    }
                </div>
            </div>
        </div>
    )
}

export default ChangeDiscounts;