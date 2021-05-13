import { makeStyles } from '@material-ui/core';

// common styles for inputs/buttons
export const useStyles = makeStyles({
    textField: {
        background: 'rgb(43, 50, 83)',
        fontSize: '1.6rem'
    },
    autoInput: {
      fontSize: '1.6rem',
      WebkitBoxShadow: '0 0 0 1000px rgb(43, 50, 83) inset',
      color: 'rgb(255, 168, 76)'
    },
    helperText: {
        background: 'rgb(43, 50, 83)',
        fontSize: '1.2rem'
    },
    submitButton: {
        borderRadius: 0,
        fontSize: '1.5rem',
        background: 'linear-gradient(#6ac676, #499e63)',
        transition: 'all 1s',
        '&:hover': {
            background: 'rgb(255, 168, 76)',
        },
        '&:disabled': {
            background: 'rgb(43, 50, 83)',
            border: '1px solid red'
        }
    }
});

export const dialogWindow = makeStyles({
    content: {
        width: '100%',
        paddingBottom: '2rem', 
        background: 'rgb(15, 22, 66)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export const selectField = makeStyles({
    list: {
        padding: 0,
        dispaly: 'flex',
        flexDirection: 'column',
    },
    label: {
        fontSize: '1.4rem',
        color: 'white'
    },
    select: {
        width: 250,
        fontSize: 14,
        color: 'rgb(255, 168, 76)',
    },
    selectItems: {
        fontSize: '1.2rem',
        backgroundColor: 'rgb(43, 50, 83)',
        '&:not(:last-child)': {
            borderBottom: '1px solid rgb(184, 194, 204)'
        },
        '&:hover': {
            backgroundColor: 'rgb(255, 168, 76)'
        },
        '&:focus': {
            backgroundColor: '#6ac676',
            '&:hover': {
                backgroundColor: '#6ac676'
            }
        },
        '&:disabled': {
            backgroundColor: 'red'
        }
    },
    helperText: {
        background: 'rgb(43, 50, 83)',
        fontSize: '1.2rem'
    },
});