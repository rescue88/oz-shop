import { Button, makeStyles } from '@material-ui/core';
import { FC } from 'react';

type MySubmitButtonType = {
    disabled: boolean;
    text: string;
}

const useStyles = makeStyles({
    button: {
        borderRadius: 0,
        fontSize: '1.5rem',
        background: 'linear-gradient(var(--linear-primary), var(--linear-secondary))',
        transition: 'all 1s',
        '&:hover': {
            background: 'var(--secondary-color)',
        }
    }
})

const MySubmitButton: FC<MySubmitButtonType> = ({disabled, text}) => {
    const classes = useStyles();

    return (
        <Button className={classes.button} disabled={disabled} type="submit">{text}</Button>
    )
}

export default MySubmitButton;