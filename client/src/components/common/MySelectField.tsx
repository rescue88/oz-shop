import { FieldAttributes, useField } from 'formik';
import { Select, MenuItem, FormControl, FormHelperText } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import { FC } from 'react';
import { selectField } from './useStyles';

const MySelectField: FC<FieldAttributes<{}>> = ({ ...props }) => {
    const [field, meta] = useField<{}>(props);
    const errorText = meta.error && meta.touched ? meta.error : '';
    const classes = selectField();
  
    return (
        <FormControl error={!!errorText}>
            <InputLabel className={classes.label} id="category">Категорія</InputLabel>
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
                <MenuItem className={classes.selectItems} value="Кухонні товари">Для кухні</MenuItem>
                <MenuItem className={classes.selectItems} value="Товари для дому">Для дому</MenuItem>
                <MenuItem className={classes.selectItems} value="Кліматичні товари">Кліматичні</MenuItem>
                <MenuItem className={classes.selectItems} value="Аксесуари">Аксесуари</MenuItem>
                <MenuItem className={classes.selectItems} value="Товари особистої гігієни">Для гігієни</MenuItem>
            </Select>
            <FormHelperText className={classes.helperText} id={field.name}>{errorText}</FormHelperText>
        </FormControl>
    )
}

export default MySelectField;