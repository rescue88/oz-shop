import { FC } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogContent } from '@material-ui/core';

import { dialogWindow } from './useStyles';

type MyDialogWindow = {
    Content: FC;
    open: boolean;
    onClose: () => void;
}

const MyDialogWindow: FC<MyDialogWindow> = ({open, Content, onClose}) => {
    const classes = dialogWindow();

    return (
        <Dialog
            fullWidth={true}
            maxWidth={'sm'}
            open={open}
            onClose={onClose}
        >
            <DialogContent className={classes.content}>
                <Content />
            </DialogContent>
        </Dialog>
    );
}

export default MyDialogWindow;