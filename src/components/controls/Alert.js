import * as React from 'react';

import Modal from '@mui/material/Modal';
import { Box, Fade, Typography } from "@material-ui/core";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
};
export default function AlertDialogSlide({
    open,
    onClose,
    title
}) {
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            closeAfterTransition
            BackdropProps={{
                timeout: 500,
            }}
            open={open}
            onClose={onClose}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <img src="./ok.png" />
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        {title}
                    </Typography>
                </Box>
            </Fade>
        </Modal>
    );
}