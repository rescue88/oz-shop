import React, { FC } from 'react';
import { FieldAttributes, useField } from 'formik';

const MySimpleTextarea: FC<FieldAttributes<{}>> = ({...props}) => {
    const [field, meta] = useField<{}>(props);
    const errorText = meta.error && meta.touched ? meta.error : '';

    return (
        <div>
            <div className="textarea__input">
                <label htmlFor="description">Опис товару</label>
                {/* @ts-ignore */}
                <textarea 
                    className={`textarea ${errorText ? `fieldError`: ''}`}
                    id={field.name}
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