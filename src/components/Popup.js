import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core';
import Controls from "../components/controls/Controls";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(0)
    },
    dialogTitle: {
        paddingRight: '0px',
        padding: '0 !important'
    }
}))

export default function Popup(props) {

    const { title, children, openPopup, setOpenPopup } = props;
    const classes = useStyles();

    return (
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex', width: '100%' }}>
                    <div style={{ width: '99%' }}></div>
                    <div style={{ float: 'right' }}>
                        <Controls.ActionButton
                            onClick={() => { setOpenPopup(false) }}>
                            <CloseIcon />
                        </Controls.ActionButton>
                    </div>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}
