import { FC } from 'react';
import { FieldAttributes, useField } from 'formik';

type MySimpleTextareaType = {
    label: string;
    width?: boolean;
    updateComment?: boolean;
} & FieldAttributes<{}>;

const MySimpleTextarea: FC<MySimpleTextareaType> = ({updateComment, width, label, ...props}) => {
    const [field, meta] = useField<{}>(props);
    const errorText = meta.error && meta.touched ? meta.error : '';

    return (
        <div>
            <div className="textarea__input">
                <label htmlFor={field.name}>{label}</label>
                {/* @ts-ignore */}
                <textarea 
                    className={`textarea ${errorText ? `fieldError`: ''} ${width ? 'commentsForm__textarea' : ''} ${updateComment ? 'update' : null}`}
                    id={field.name}
                    maxLength={400}
                    {...props}
                    {...field}
                />
            </div>
            {
                errorText ? <div className="textarea__error">{errorText}</div> : null
            }
        </div>
    )
}

export default MySimpleTextarea;