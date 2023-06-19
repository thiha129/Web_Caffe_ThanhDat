import React, { Fragment, useState } from 'react';
// import './Countries.css';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
// import Moment from 'react-moment';
// import moment from 'moment';
import { postsCheckedState$, sanPhamAllstate$, postsState$ } from '../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions'

import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Box, Button, Fade } from "@material-ui/core";
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/styles';
import { createTheme, darken, lighten } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Popup from "../Popup"
import '../../css/popup.css';
import { AiFillCamera } from "react-icons/ai";
import Tooltip from '@mui/material/Tooltip'
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ImageCropDialog from '../ImageCropDialog';
const defaultTheme = createTheme();
const useStyles = makeStyles(() => ({
    root: {
        alignItems: 'center',
        lineHeight: '24px',
        width: '100%',
        height: '100%',
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
        display: 'flex',
        '& .cellValue': {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
    },
}));

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
    alignItems: 'center'
};
const typeSP = [
    {
        value: 'Bịch - 0.5Kg',
        label: 'Bịch - 0.5Kg',
    },
    {
        value: 'Bịch - 1Kg',
        label: 'Bịch - 1Kg',
    },
    {
        value: 'Hạt - 0.5Kg',
        label: 'Hạt - 0.5Kg',
    },
    {
        value: 'Hạt - 1Kg',
        label: 'Hạt - 1Kg',
    }
]
// Quy định màu sắc cho từng hạn sử dụgn còn lại 
const cl1 = '#CCF5E6'
const cl2 = '#FFF739'
const cl3 = '#FF4B2C'
// Quy định màu sẽ được chọn cho từng hạn sử dụng còn lại
const useStylesAlert = makeStyles(
    (theme) => {
        const getBackgroundColor = (color) =>
            theme.palette.mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

        const getHoverBackgroundColor = (color) =>
            theme.palette.mode === 'dark' ? darken(color, 0.3) : lighten(color, 0.3);


        return {
            root: {
                // còn dưới 1 tháng
                '& .super-app-theme--1': {
                    backgroundColor: getBackgroundColor(cl1),
                    '&:hover': {
                        backgroundColor: getHoverBackgroundColor(cl1),
                    },
                },
                // còn dưới 5 ngày
                '& .super-app-theme--2': {
                    backgroundColor: getBackgroundColor(cl2),
                    '&:hover': {
                        backgroundColor: getHoverBackgroundColor(cl2),
                    },
                },
                // đã hết hạn
                '& .super-app-theme--3': {
                    backgroundColor: getBackgroundColor(cl3),
                    '&:hover': {
                        backgroundColor: getHoverBackgroundColor(cl3),
                    },
                },
            },
        };
    },
    { defaultTheme },
);

function isOverflown(element) {
    return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
    );
}

const GridCellExpand = React.memo(function GridCellExpand(props) {
    const { width, value } = props;
    const wrapper = React.useRef(null);
    const cellDiv = React.useRef(null);
    const cellValue = React.useRef(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();
    const [showFullCell, setShowFullCell] = React.useState(false);
    const [showPopper, setShowPopper] = React.useState(false);
    const [openPopup, setOpenPopup] = useState(false);

    const handleMouseEnter = () => {
        const isCurrentlyOverflown = isOverflown(cellValue.current);
        setShowPopper(isCurrentlyOverflown);
        setAnchorEl(cellDiv.current);
        setShowFullCell(true);
    };

    const handleMouseLeave = () => {
        setShowFullCell(false);
    };

    React.useEffect(() => {
        if (!showFullCell) {
            return undefined;
        }

        function handleKeyDown(nativeEvent) {
            // IE11, Edge (prior to using Bink?) use 'Esc'
            if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
                setShowFullCell(false);
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [setShowFullCell, showFullCell]);

    return (
        <div
            ref={wrapper}
            className={classes.root}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                ref={cellDiv}
                style={{
                    height: 1,
                    width,
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                }}
            />
            <div ref={cellValue} className="cellValue">
                {value}
            </div>
            {showPopper && (
                <Popper
                    open={showFullCell && anchorEl !== null}
                    anchorEl={anchorEl}
                    style={{
                        width,
                        minHeight: wrapper.current.offsetHeight,
                        marginTop: wrapper.current.offsetHeight,
                        marginLeft: wrapper.current.offsetHeight * 3.5
                    }}
                >
                    <Paper
                        elevation={1}
                        style={{ minHeight: wrapper.current.offsetHeight - 3, backgroundColor: lighten(cl2, 0.6) }}
                    >
                        <Typography variant="body2" style={{ padding: 8 }}>
                            {value}
                        </Typography>
                    </Paper>
                </Popper>
            )
            }

        </div >
    );
});

const GridCellActions = React.memo(function GridCellActions(props) {

    const { width, value } = props;
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [openPopup, setOpenPopup] = useState(false);

    const [tieuDe, setTieuDe] = React.useState(value.title)
    const [chiTiet, setChiTiet] = React.useState(value.content)


    let fd = new FormData();
    let reader = new FileReader();

    const [pickImg, setPickImg] = React.useState(false)
    const [img, setImg] = React.useState("")
    const [dataImg, setDataImg] = React.useState(undefined)

    const data = useSelector(postsState$)
    const isChecking = useSelector(postsCheckedState$)
    React.useEffect(() => {
        setOpenPopup(false)
        setOpen(false)
        setDataImg(undefined)
    }, [isChecking])

    const handleFileChange = (event) => {
        const { target } = event;
        const { files } = target;

        reader.onloadend = () => { setImg(reader.result) }
        reader.readAsDataURL(files[0])
        if (files && files[0]) {
            setDataImg(files)
            setPickImg(true)
        }

    }

    const onCancel = () => {
        setPickImg(false)
        setImg("")
    };

    const cropImage = (e) => {
        setImg(e.url)
        setDataImg(e.file)
        setPickImg(false)
    }



    const del = () => {
        dispatch(actions.delPosts.delPostsRequest({ _id: value._id }))
    }

    const update = () => {
        if (dataImg == undefined) {
            alert("Bạn chưa chọn ảnh!")
        } else {
            if (
                tieuDe == "" ||
                chiTiet == ""
            ) {
                alert("Không được để trống!", tieuDe)
            } else {
                fd.append('file', dataImg, 'TD')
                fd.append('title', tieuDe)
                fd.append('_id', value._id)
                fd.append('content', chiTiet)
                dispatch(actions.updatePosts.updatePostsRequest(fd))
            }
        }

    }

    const _setOpenPopup = () => {
        setOpenPopup(true)
        setTieuDe(value.title)
        setChiTiet(value.content)
    }

    return (
        <Fragment>
            <Button variant="outlined" color="primary" style={{ marginRight: 10 }} onClick={_setOpenPopup}>Sửa</Button>
            <Button variant="contained" color="primary" onClick={handleOpen}>Xóa</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Bài viết này sẽ bị xóa!
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            Khi bạn nhấn nút "Xác nhận" bài viết này sẽ bị xóa vĩnh viễn. Xác nhận xóa?
                        </Typography>
                        <div style={{
                            width: "auto",
                        }}>
                            <Button variant="outlined" color="secondary" onClick={del}
                                style={{
                                    padding: '6px 16px',
                                    borderRadius: '4px',
                                    float: 'right',
                                    marginLeft: '10px'
                                }}
                            >Xác nhận</Button>
                            <Button variant="text" color="primary" onClick={handleClose}
                                style={{
                                    padding: '6px 16px',
                                    borderRadius: '4px',
                                    color: '#1976d2',
                                    float: 'right',
                                }}
                            >Hủy</Button>


                        </div>
                    </Box>
                </Fade>
            </Modal>
            <div>
                <Popup
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    <div className="popup-container">
                        {
                            pickImg ? <ImageCropDialog
                                id={1}
                                imageUrl={img}
                                cropInit={img.crop}
                                zoomInit={img.zoom}
                                aspectInit={img.aspect}
                                onCancel={onCancel}
                                setCroppedImageFor={cropImage}
                                openPopup={true}
                            /> : null
                        }
                        <div className="popup-left">
                            <div className="multi-imgrow">
                                <div className="mul-holder">
                                    <div className="add-mul">
                                        <input type="file" id="file" accept="image/*" capture="camera" multiple onChange={handleFileChange} />
                                        <label htmlFor="file" >
                                            <i className="material-icons"><AiFillCamera /></i>
                                        </label>
                                    </div>
                                </div>
                                <div className="mul-holder" >
                                    <img style={{ width: "auto" }} src={img} alt="" key={img} />
                                </div>

                            </div>

                        </div>
                        <div className="popup-right">
                            <div className="address-row">
                                <label className="fontSizeLabel">Tiêu đề bài viết</label><br />
                                <input defaultValue={tieuDe} type="text" placeholder="Tiêu đề sản phẩm" className="form-control" onChange={(e) => {
                                    setTieuDe(e.target.value)
                                }}  ></input>
                            </div>

                            <div className="address-row">
                                <label className="fontSizeLabel" >Giới thiệu sản phẩm</label><br />
                                <TextField
                                    defaultValue={chiTiet}
                                    style={{
                                        width: '-webkit-fill-available'
                                    }}
                                    placeholder="Lời giới thiệu cho sản phẩm"
                                    multiline
                                    onChange={(e) => {
                                        setChiTiet(e.target.value)
                                    }}
                                />

                            </div>

                        </div>

                    </div>
                    <hr />
                    <div className="popup-btnrow">
                        <div className="popup-btn">
                            <Button variant="outlined" color="secondary" onClick={update}
                                style={{
                                    padding: '6px 16px',
                                    borderRadius: '4px',
                                    float: 'right',
                                    marginLeft: '10px',
                                    width: "60%"
                                }}
                            >Xác nhận</Button>
                            <Button variant="outlined" onClick={() => setOpenPopup(!openPopup)}
                                style={{
                                    padding: '6px 16px',
                                    borderRadius: '4px',
                                    float: 'right',
                                    marginLeft: '10px',
                                    width: "30%"
                                }}
                            >Hủy</Button>
                        </div>
                    </div>
                </Popup >

            </div>
        </Fragment >
    );
});

GridCellExpand.propTypes = {
    value: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
};

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    // Override media queries injected by theme.mixins.toolbar
    '@media all': {
        minHeight: 20,
    },
}));

function renderCellExpand(params) {
    return (
        <GridCellExpand
            value={params.value ? params.value.toString() : ''}
        />
    );
}

renderCellExpand.propTypes = {
    colDef: PropTypes.object.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.number,
        PropTypes.object,
        PropTypes.string,
        PropTypes.bool,
    ]),
};

const wItem = 300
const columns = [

    {
        field: "actions",
        headerName: 'Tùy chọn',
        type: 'number',
        width: wItem / 1.9,
        renderCell: (e) => {
            return <GridCellActions value={e.row} />
        },
    },
    {
        field: 'title',
        headerName: 'Tiêu đề bài viết',
        width: wItem,
        renderCell: renderCellExpand,
    },
    {
        field: 'attachment',
        width: wItem / 2,
        padding: 10,
        headerName: 'Hình ảnh',
        renderCell: (e) => {
            return <img src={e.value} style={{ width: '100%', resize: "both" }} />;
        }
    },
    {
        field: "content",
        headerName: 'Chi tiết',
        type: 'text',
        width: wItem,
        renderCell: renderCellExpand,
    },

    {
        field: "createdAt",
        headerName: 'Ngày tạo',
        type: 'date',
        width: wItem + 30,
        renderCell: (e) => {
            var date = new Date(e.value)
            var d
            var m
            var minus
            var h

            parseInt(date.getMinutes()) < 10 ? minus = "0" + date.getMinutes() : minus = date.getMinutes()
            parseInt(date.getHours()) < 10 ? h = "0" + date.getHours() : h = date.getHours()

            parseInt(date.getDate()) < 10 ? d = "0" + date.getDate() : d = date.getDate()
            parseInt(date.getMonth()) < 9 ? m = "0" + (date.getMonth() + 1) : m = (date.getMonth() + 1)

            return <GridCellExpand
                value={e.value ? h + "h : " + minus + "'" + " " + d + "-" + m + "-" + date.getFullYear() : ''}
            />
        },
    },



];

export default function QuanLyBaiViet(props) {
    const [openPopup, setOpenPopup] = useState(false);

    const [tieuDe, setTieuDe] = React.useState("")
    const [chiTiet, setChiTiet] = React.useState("")

    const [pickImg, setPickImg] = React.useState(false)
    const [img, setImg] = React.useState("")
    const [dataImg, setDataImg] = React.useState(undefined)

    const dispatch = useDispatch();
    const data = useSelector(postsState$)
    const classes = useStylesAlert();
    const isChecking = useSelector(postsCheckedState$)

    let formData = new FormData();
    let reader = new FileReader();

    React.useEffect(() => {
        const getData = dispatch(actions.getPosts.getPostsRequest())
        setTieuDe('')
        setChiTiet('')
        setDataImg(undefined)
        setOpenPopup(false)
        return () => getData
    }, [dispatch, isChecking])

    const onCancel = () => {
        setPickImg(false)
        setImg("")
    };

    const handleFileChange = (event) => {
        const { target } = event;
        const { files } = target;

        reader.onloadend = () => { setImg(reader.result) }
        reader.readAsDataURL(files[0])
        if (files && files[0]) {
            setDataImg(files)
            setPickImg(true)
        }

    }

    const add = () => {
        if (dataImg == undefined) {
            alert("Bạn chưa chọn ảnh!")
        } else {
            if (
                tieuDe == "" ||
                chiTiet == ""
            ) {
                alert("Không được để trống!", tieuDe)
            } else {
                formData.append('files', dataImg, 'TD')
                formData.append('title', tieuDe)
                formData.append('content', chiTiet)
                dispatch(actions.createPosts.createPostsRequest(formData))
            }
        }
    }
    const cropImage = (e) => {
        setImg(e.url)
        setDataImg(e.file)
        setPickImg(false)
    }

    return (
        <div style={{ height: 550, width: '100%' }} className={classes.root}>
            <Box sx={{ flexGrow: 1, width: '100%', backgroundColor: 'white !important' }}>
                <AppBar position="static">
                    <StyledToolbar style={{ backgroundColor: 'cornflowerblue', alignItems: "center" }}>
                        <Tooltip title="Thêm bài viết" onClick={() => { setOpenPopup(true) }}>
                            <IconButton style={{ border: '1px white solid' }}>
                                <AddIcon style={{ color: 'white' }} />
                            </IconButton>
                        </Tooltip>
                    </StyledToolbar>
                </AppBar>
            </Box>
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={8}
                pagination
                disableSelectionOnClick
            />
            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <div className="popup-container">
                    {
                        pickImg ? <ImageCropDialog
                            id={1}
                            imageUrl={img}
                            cropInit={img.crop}
                            zoomInit={img.zoom}
                            aspectInit={img.aspect}
                            onCancel={onCancel}
                            setCroppedImageFor={cropImage}
                            openPopup={true}
                        /> : null
                    }
                    <div className="popup-left">
                        <div className="multi-imgrow">
                            <div className="mul-holder">
                                <div className="add-mul">
                                    <input type="file" id="file" accept="image/*" capture="camera" multiple onChange={handleFileChange} />
                                    <label htmlFor="file" >
                                        <i className="material-icons"><AiFillCamera /></i>
                                    </label>
                                </div>
                            </div>
                            <div className="mul-holder" >
                                <img style={{ width: "auto" }} src={img} alt="" key={img} />
                            </div>

                        </div>

                    </div>
                    <div className="popup-right">
                        <div className="address-row">
                            <label className="fontSizeLabel">Tiêu đề bài viết</label><br />
                            <input type="text" placeholder="Tiêu đề sản phẩm" className="form-control" onChange={(e) => {
                                setTieuDe(e.target.value)
                            }}  ></input>
                        </div>

                        <div className="address-row">
                            <label className="fontSizeLabel" >Giới thiệu sản phẩm</label><br />
                            <TextField
                                style={{
                                    width: '-webkit-fill-available'
                                }}
                                placeholder="Lời giới thiệu cho sản phẩm"
                                multiline
                                onChange={(e) => {
                                    setChiTiet(e.target.value)
                                }}
                            />

                        </div>

                    </div>

                </div>
                <hr />
                <div className="popup-btnrow">
                    <div className="popup-btn">
                        <Button variant="outlined" color="secondary" onClick={add}
                            style={{
                                padding: '6px 16px',
                                borderRadius: '4px',
                                float: 'right',
                                marginLeft: '10px',
                                width: "60%"
                            }}
                        >Thêm</Button>
                        <Button variant="outlined" onClick={() => setOpenPopup(!openPopup)}
                            style={{
                                padding: '6px 16px',
                                borderRadius: '4px',
                                float: 'right',
                                marginLeft: '10px',
                                width: "30%"
                            }}
                        >Hủy</Button>
                    </div>
                </div>
            </Popup >

        </div>
    );
}

