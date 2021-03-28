import { FC } from 'react';
import { FieldAttributes, useField } from 'formik';
import { InputAdornment, IconButton, Input, FormControl, FormHelperText } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useStyles } from './useStyles';

type MyPasswordFieldType = {
    width?: number | string;
    showPass: boolean;
    handleClickShowPassword: () => void;
    handleMouseDownPassword: () => void;
} & FieldAttributes<{}>

const MyPasswordField: FC<MyPasswordFieldType> = ({ width, placeholder, showPass, handleClickShowPassword, handleMouseDownPassword, ...props }) => {
    const [field, meta] = useField<{}>(props);
    const errorText = meta.error && meta.touched ? meta.error : '';
    const classes = useStyles();
  
    return (
        <FormControl error={!!errorText}>
            <Input
                className={classes.textField}
                inputProps={{
                    style: {
                        width: width
                    }
                }}
                id={field.name}
                type={showPass ? 'text' : 'password'}
                placeholder={placeholder}
                {...field}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPass ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
                error={!!errorText}
            />
            <FormHelperText className={classes.helperText} id={field.name}>{errorText}</FormHelperText>
        </FormControl>
    )
}

export default MyPasswordField;