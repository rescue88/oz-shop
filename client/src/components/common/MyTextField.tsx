import { FieldAttributes, useField } from 'formik';
import { TextField, FormControl, FormHelperText } from '@material-ui/core';
import { FC } from 'react';
import { useStyles } from './useStyles';

type MyTextFieldType = {
    width?: number | string
} & FieldAttributes<{}>

const MyTextField: FC<MyTextFieldType> = ({ width, placeholder, type, ...props }) => {
    const [field, meta] = useField<{}>(props);
    const errorText = meta.error && meta.touched ? meta.error : '';
    const classes = useStyles();
  
    return (
      <FormControl error={!!errorText}>
        <TextField
          className={classes.textField}
          inputProps={{
            className: classes.autoInput,
            classes: {
              root: {
                fontSize: 14
              }
            },
            style: {
              width: '25rem',
            },
          }}
          id={field.name}
          {...field} 
          type={type}
          placeholder={placeholder}
          error={!!errorText}
        />
        <FormHelperText className={classes.helperText} id={field.name}>{errorText}</FormHelperText>
      </FormControl>
    )
}

export default MyTextField;