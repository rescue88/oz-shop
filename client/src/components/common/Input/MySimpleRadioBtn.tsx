import { FC } from 'react';
import { FieldAttributes, useField } from 'formik';

type MySimpleRadioBtnType = {
    label: string;
} & FieldAttributes<{}>;

const MySimpleRadioBtn: FC<MySimpleRadioBtnType> = ({label, ...props}) => {
    const [field] = useField<{}>(props);

    return (
        <div className="radioContainer">
            <label>{label}</label>
            {/* @ts-ignore */}
            <input type="radio" {...field} />
        </div>
    );
}

export default MySimpleRadioBtn;