import { makeStyles } from '@material-ui/core';

// common styles for inputs/buttons
export const useStyles = makeStyles({
    textField: {
        background: 'var(--def-back)',
        fontSize: '1.6rem'
    },
    autoInput: {
      fontSize: '1.6rem',
      WebkitBoxShadow: '0 0 0 1000px var(--def-back) inset',
      color: 'var(--secondary-color)'
    },
    helperText: {
        background: 'var(--def-back)',
        fontSize: '1.2rem'
    },
    submitButton: {
        borderRadius: 0,
        fontSize: '1.5rem',
        background: 'linear-gradient(var(--linear-primary), var(--linear-secondary))',
        transition: 'all 1s',
        '&:hover': {
            background: 'var(--secondary-color)',
        },
        '&:disabled': {
            background: 'var(--def-back)',
            border: '1px solid red'
        }
    }
});