import { FieldAttributes, useField } from 'formik';
import { Select, MenuItem, FormControl, FormHelperText } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import { FC } from 'react';

import { selectField } from './useStyles';

type MySelectFieldType = {
    label?: string;
} & FieldAttributes<{}>

const MySelectField: FC<MySelectFieldType> = ({ label, children, ...props }) => {
    const [field, meta] = useField<{}>(props);
    const errorText = meta.error && meta.touched ? meta.error : '';
    const classes = selectField();
  
    return (
        <FormControl error={!!errorText}>
            <InputLabel className={classes.label} id="category">{label}</InputLabel>
            <Select
                MenuProps={{
                    classes: {
                        list: classes.list
                    }
                }}
                labelId="category"
                defaultValue=""
                className={classes.select}
                {...field} 
                error={!!errorText}
            >
                {children}
            </Select>
            <FormHelperText className={classes.helperText} id={field.name}>{errorText}</FormHelperText>
        </FormControl>
    )
}

export default MySelectField;