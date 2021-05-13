import { FC, ReactNode } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogContent } from '@material-ui/core';

import { dialogWindow } from './useStyles';

type MyDialogWindowType = {
    Content: ReactNode;
    open: boolean;
    onClose: () => void;
}

const MyDialogWindow: FC<MyDialogWindowType> = ({open, Content, onClose}) => {
    const classes = dialogWindow();

    return (
        <Dialog
            fullWidth={true}
            maxWidth={'sm'}
            open={open}
            onClose={onClose}
        >
            <DialogContent className={classes.content}>
                {Content}
            </DialogContent>
        </Dialog>
    );
}

export default MyDialogWindow;