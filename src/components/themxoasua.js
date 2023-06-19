import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import { green, pink } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import FolderIcon from '@mui/icons-material/Folder';
import PageviewIcon from '@mui/icons-material/Pageview';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const useStyles = makeStyles((theme) => ({

    button: {
        margin: theme.spacing(1),
    },
}));

export default function IconLabelButtons() {
    const classes = useStyles();

    return (
        <div>
            <Stack direction="row" spacing={2}>
                <Avatar sx={{ bgcolor: green[500] }}>
                    <AddIcon />
                </Avatar>
                <Avatar sx={{ bgcolor: pink[500] }}>
                    <DeleteOutlineIcon />
                </Avatar>
                <Avatar>
                    <FolderIcon />
                </Avatar>

            </Stack>
            {/* <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<DeleteIcon />}
            >
                Xóa
            </Button> 
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
            >
                Thêm sản phẩm
            </Button>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
            >
                Xóa sản phẩm
            </Button>
             <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<CloudUploadIcon />}
            >
                Xuất File
            </Button> */}
            {/* <Button
                variant="contained"
                disabled
                color="secondary"
                className={classes.button}
            >
                abc
            </Button> 
            <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<SaveIcon />}
            >
                Save
            </Button>
            <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon />}
            >
                Lưu
            </Button> */}
        </div>
    );
}
