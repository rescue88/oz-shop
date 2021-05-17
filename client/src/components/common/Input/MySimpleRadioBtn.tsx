import { FC } from 'react';
import { FieldAttributes, useField } from 'formik';

type MySimpleRadioBtnType = {
    label: string;
} & FieldAttributes<{}>;

const MySimpleRadioBtn: FC<MySimpleRadioBtnType> = ({id, label, disabled, ...props}) => {
    const [field] = useField<{}>(props);

    return (
        <div className="radioContainer">
            {/* @ts-ignore */}
            <input id={id} type="radio" className="radioContainer__input" {...field} disabled={disabled} />
            <label className="radioContainer__text" htmlFor={id}>{label}</label>
        </div>
    );
}

export default MySimpleRadioBtn;