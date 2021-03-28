import { makeStyles } from '@material-ui/core';
import { FieldAttributes, useField } from 'formik';
import { TextField } from '@material-ui/core';
import { FC } from 'react';

const useStyles = makeStyles({
    textField: {
        padding: '.3rem 0',
        background: 'var(--def-back)'
    },
    input: {
      fontSize: '1.6rem',
      WebkitBoxShadow: '0 0 0 1000px var(--def-back) inset',
      color: 'var(--secondary-color)'
    }
});

type MyTextFieldType = {
    width?: number
} & FieldAttributes<{}>

const MyTextField: FC<MyTextFieldType> = ({ width, placeholder, ...props }) => {
    const [field, meta] = useField<{}>(props);
    const errorText = meta.error && meta.touched ? meta.error : '';
    const classes = useStyles();
  
    return (
      <TextField
        className={classes.textField}
        inputProps={{
          className: classes.input,
          style: {
            width: width,
          }
        }}
        {...field} 
        placeholder={placeholder}
        helperText={errorText}
        error={!!errorText}
      />
    )
}

export default MyTextField;