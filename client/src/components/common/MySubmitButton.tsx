import { Button } from '@material-ui/core';
import { FC } from 'react';
import { useStyles } from './useStyles';

type MySubmitButtonType = {
    disabled: boolean;
    text: string;
}

const MySubmitButton: FC<MySubmitButtonType> = ({disabled, text}) => {
    const classes = useStyles();

    return (
        <Button className={classes.submitButton} disabled={disabled} type="submit">{text}</Button>
    )
}

export default MySubmitButton;