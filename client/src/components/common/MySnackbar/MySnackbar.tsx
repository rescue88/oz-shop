import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { StateType } from '../../../types/stateTypes';
import { setSnackbar } from '../../../redux/reducers/snackbarReducer';



const useStyles = makeStyles((theme: Theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
}));

const MySnackbar: FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const snackbarOpen = useSelector((state: StateType) => state.snackbar.snackbarOpen);
    const snackbarType = useSelector((state: StateType) => state.snackbar.snackbarType);
    const snackbarMessage = useSelector((state: StateType) => state.snackbar.snackbarMessage);

    const handleClose = (event?: React.SyntheticEvent | React.MouseEvent, reason?: string): void => {
        if (reason === 'clickaway') {
          return;
        }
    
        dispatch(setSnackbar(false, snackbarType, snackbarMessage));
    };

    return (
        <div className={classes.root}>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert
                    elevation={6}
                    variant="filled"
                    onClose={handleClose}
                    color={snackbarType}
                    severity={snackbarType}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default MySnackbar;