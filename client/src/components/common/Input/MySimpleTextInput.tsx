import React, { FC } from 'react';

type MySimpleTextInputType = {
    name: string;
    inputValue: string;
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MySimpleTextInput: FC<MySimpleTextInputType> = ({name, changeHandler, inputValue}) => {
    return (
        <input 
            className="textInput"
            type="text" 
            id={name}
            name={name}
            value={inputValue}
            onChange={(e) => changeHandler(e)}
            maxLength={20}
        />
    )
}

export default MySimpleTextInput;