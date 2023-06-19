import React, { Fragment, useEffect, useState } from 'react';
import { paymentState$, paymentStateChecking$ } from '../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions'

import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Box, Button, Fade, MenuItem, Checkbox, TextField } from "@material-ui/core";
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/styles';
import { createTheme, darken, lighten } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import Popup from "../Popup"
import '../../css/popup.css';
import Tooltip from '@mui/material/Tooltip'
import AppBar from '@mui/material/AppBar';

import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';



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
// Quy định trạng thái đơn hàng
const cl0 = '#FF4B2C' // Hủy đơn
const cl1 = '#FFF739' // Chờ xác nhận
const cl2 = '#05F795' // Đã xác nhận
const cl3 = '#FAAD48' // Đang giao
const cl4 = '#14D100' // Đã giao

const useStylesAlert = makeStyles(
    (theme) => {
        const getBackgroundColor = (color) =>
            theme.palette.mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

        const getHoverBackgroundColor = (color) =>
            theme.palette.mode === 'dark' ? darken(color, 0.3) : lighten(color, 0.3);


        return {
            root: {
                // Hủy
                '& .super-app-theme--0': {
                    backgroundColor: getBackgroundColor(cl0),
                    '&:hover': {
                        backgroundColor: getHoverBackgroundColor(cl0),
                    },
                },
                // Chờ xác nhận
                '& .super-app-theme--1': {
                    backgroundColor: getBackgroundColor(cl1),
                    '&:hover': {
                        backgroundColor: getHoverBackgroundColor(cl1),
                    },
                },
                // đã xác nhận
                '& .super-app-theme--2': {
                    backgroundColor: getBackgroundColor(cl2),
                    '&:hover': {
                        backgroundColor: getHoverBackgroundColor(cl2),
                    },
                },
                // đang giao
                '& .super-app-theme--3': {
                    backgroundColor: getBackgroundColor(cl3),
                    '&:hover': {
                        backgroundColor: getHoverBackgroundColor(cl3),
                    },
                },
                // đã giao
                '& .super-app-theme--4': {
                    backgroundColor: getBackgroundColor(cl4),
                    '&:hover': {
                        backgroundColor: getHoverBackgroundColor(cl4),
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


const ViewSanPham = React.memo(function ViewSanPham(props) {
    const { width, value } = props;
    const [openPopup, setOpenPopup] = useState(false);
    const [openPopupStatus, setOpenPopupStatus] = useState(false);
    const [data, setData] = useState(props.value.product)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [ship, setShip] = useState(1000)
    const [checkShip, setCheckShip] = useState(false)

    const checkingType = useSelector(paymentStateChecking$)

    const [numberModal, setNumberModal] = useState(1)

    const _openModal = (value) => {
        setOpen(true)
        setOpenPopupStatus(false)
        if (value == 0) {
            setNumberModal(0)
        } else if (value == 2) {
            setCheckShip(true)
            setNumberModal(2)
        } else if (value == 3) {
            setNumberModal(3)
        } else if (value == 4) {
            setNumberModal(4)
            console.log("[ThongKe_Data]", props.value.product);

        }
    }

    useEffect(() => {
        setOpenPopupStatus(false)
        setOpen(false)
        setShip(0)
        setCheckShip(false)
    }, [checkingType])

    const _changeTypeButton = () => {
        if (checkShip == true && ship != "" && numberModal == 2) {
            dispatch(actions.changeStatusPayment.changeStatusPaymentRequest({ _id: props.value._id, type: numberModal, ship: ship }))
        } else if (numberModal == 4) {
            dispatch(actions.changeStatusPayment.changeStatusPaymentRequest({ _id: props.value._id, type: numberModal }))
            dispatch(actions.addThongKe.addThongKeRequest(props.value.product))
        } else {
            dispatch(actions.changeStatusPayment.changeStatusPaymentRequest({ _id: props.value._id, type: numberModal }))
        }
    }

    const convertString = (e) => {
        return e.length != 0 ? String(parseInt(e)).replace(/\B(?=(\d{3})+(?!\d))/g, '.') : "0"
    }

    return (
        <Fragment>
            <Button variant="outlined" color="secondary" style={{ marginRight: 10, fontSize: 12 }} onClick={setOpenPopup}>Xem đơn</Button>
            <Button variant="contained" color="primary" style={{ marginRight: 10, fontSize: 12 }} onClick={setOpenPopupStatus}>Trạng thái</Button>
            <div>
                <Popup
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                >
                    <div style={{
                        width: '100%',
                        minWidth: 'auto',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        {
                            data.map((e) =>
                                <div style={{
                                    width: '100%',
                                    height: 'auto',
                                    marginBottom: '1.5%',
                                    padding: '5px',
                                    borderRadius: '10px',
                                    boxShadow: '0.2px 1px 2px 1px #9e9e9e'
                                }}>
                                    <div style={{ height: "auto" }}>
                                        <div style={{ float: 'left', width: '25%' }}>
                                            <img src={e.img} style={{ width: '90%', resize: 'both', borderRadius: '5px' }} />
                                        </div>
                                        <div style={{ float: 'left' }}>
                                            <label style={{ fontWeight: 'bold', fontSize: 20 }}>{e.tenSanPham}</label>
                                            <div style={{
                                                display: 'flex',
                                                boxSizing: 'border-box',
                                                flexDirection: 'column'
                                            }}>
                                                {/* {e.flashSale == 0 ?
                                                    <label >Giá sản phẩm: {convertString(e.giaSanPham)}đ</label>
                                                    :
                                                    <label >Giá sản phẩm: {convertString(e.priceSale)}đ</label>
                                                } */}
                                                <label >Số lượng: {convertString(e.soLuong)}</label>
                                                <label >Tổng giá: {convertString(e.tongGiaBan)}đ</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        <div className="popup-btnrow">
                            <hr />
                            <div style={{
                                width: '10%',
                                float: 'right'
                            }}>
                                <Button variant="contained" color="primary" style={{ marginRight: 10, fontSize: 12 }}
                                    onClick={() => setOpenPopup(false)}>Đóng</Button>

                            </div>
                        </div>
                    </div>
                </Popup >
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={() =>
                        setOpen(false) +
                        setOpenPopupStatus(true) +
                        setShip(0) +
                        setCheckShip(false)}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        {checkShip ?
                            <Box sx={style}>
                                <Typography id="transition-modal-title" variant="h6" component="h2">
                                    Chưa nhập phí vận chuyển!
                                </Typography>
                                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                    Xin mời nhập phí vận chuyển.
                                </Typography>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'right',
                                }}>
                                    <TextField
                                        label="Phí vận chuyển"
                                        type='number'
                                        style={{
                                            width: '-webkit-fill-available',
                                        }}
                                        defaultValue={1000}
                                        value={ship}
                                        onChange={(e) => setShip(e.target.value)}
                                        variant="standard" />
                                </div>
                                {parseInt(ship) < 1000 || ship.length == 0 ? <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'left',
                                    color: 'red',
                                    marginTop: '5px',
                                    fontSize: 12,
                                    fontWeight: 'bold'
                                }}>
                                    <a>Phí vận chuyển lớn hơn 1000đ</a>
                                </div> : null}
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'right',
                                    margin: '10px 0'
                                }}>
                                    Phí vận chuyển: {convertString(ship)} đ
                                </div>

                                <div style={{
                                    width: "auto",
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                }}>
                                    <Button variant="text" color="primary" onClick={() =>
                                        setOpen(false) +
                                        setOpenPopupStatus(true) +
                                        setShip(0) +
                                        setCheckShip(false)
                                    }
                                        style={{
                                            padding: '6px 16px',
                                            borderRadius: '4px',
                                            color: '#1976d2',
                                            float: 'right',
                                        }}
                                    >Hủy</Button>
                                    <Button variant="outlined" color="secondary" onClick={_changeTypeButton}
                                        style={{
                                            padding: '6px 16px',
                                            borderRadius: '4px',
                                            float: 'right',
                                        }}
                                    >Xác nhận</Button>
                                </div>
                            </Box>
                            :
                            <Box sx={style}>
                                <Typography id="transition-modal-title" variant="h6" component="h2">
                                    Thay đổi trạng thái đơn hàng!
                                </Typography>
                                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                    Bạn xác định muốn thay đổi trạng thái đơn hàng. Xác nhận?
                                </Typography>
                                <div style={{
                                    width: "auto",
                                }}>
                                    <Button variant="outlined" color="secondary" onClick={_changeTypeButton}
                                        style={{
                                            padding: '6px 16px',
                                            borderRadius: '4px',
                                            float: 'right',
                                            marginLeft: '10px'
                                        }}
                                    >Xác nhận</Button>
                                    <Button variant="text" color="primary" onClick={() => setOpen(false) + setOpenPopupStatus(true)}
                                        style={{
                                            padding: '6px 16px',
                                            borderRadius: '4px',
                                            color: '#1976d2',
                                            float: 'right',
                                        }}
                                    >Hủy</Button>


                                </div>
                            </Box>
                        }

                    </Fade>
                </Modal>
                <Popup
                    openPopup={openPopupStatus}
                    setOpenPopup={setOpenPopupStatus}
                >
                    <div style={{
                        width: '100%',
                        minWidth: 'auto',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>

                        {props.value.type == 1 ? <Button style={{
                            width: '100%',
                            height: 'auto',
                            marginBottom: '1.5%',
                            padding: '5px',
                            borderRadius: '10px',
                            boxShadow: '0.2px 1px 2px 1px #9e9e9e',
                            backgroundColor: cl2,
                        }}
                            onClick={() => _openModal(2)}>
                            <div style={{ height: "auto" }}>
                                <div style={{ float: 'left', width: '25%' }}>
                                </div>
                                <div style={{ float: 'left' }}>
                                    <label style={{ fontWeight: 'bold', fontSize: 20 }}>Xác nhận đơn hàng</label>
                                    <div style={{
                                        display: 'flex',
                                        boxSizing: 'border-box',
                                        flexDirection: 'column'
                                    }}>
                                        <label >Đơn hàng sẽ được chuyển qua trạng thái "Đã xác nhận!"</label>
                                    </div>
                                </div>
                            </div>
                        </Button> : null}
                        {props.value.type == 2 || props.value.type == 1 ? <Button style={{
                            width: '100%',
                            height: 'auto',
                            marginBottom: '1.5%',
                            padding: '5px',
                            borderRadius: '10px',
                            boxShadow: '0.2px 1px 2px 1px #9e9e9e',
                            backgroundColor: cl3,
                            border: 'none',
                        }}
                            onClick={() => _openModal(3)}>

                            <div style={{
                                height: "auto",

                            }}>
                                <div style={{ float: 'left', width: '25%' }}>
                                </div>
                                <div style={{ float: 'left' }}>
                                    <label style={{ fontWeight: 'bold', fontSize: 20 }}>Đang giao!</label>
                                    <div style={{
                                        display: 'flex',
                                        boxSizing: 'border-box',
                                        flexDirection: 'column'
                                    }}>
                                        <label >Đơn hàng sẽ được chuyển qua trạng thái "Đang giao hàng!"</label>
                                    </div>
                                </div>
                            </div>
                        </Button> : null}
                        {props.value.type != 0 ? <Button style={{
                            width: '100%',
                            height: 'auto',
                            marginBottom: '1.5%',
                            padding: '5px',
                            borderRadius: '10px',
                            boxShadow: '0.2px 1px 2px 1px #9e9e9e',
                            backgroundColor: cl4,
                            border: 'none',
                        }}
                            onClick={() => props.value.type != 4 ? _openModal(4) : null}>

                            <div style={{
                                height: "auto",

                            }}>
                                <div style={{ float: 'left', width: '25%' }}>
                                </div>
                                <div style={{ float: 'left' }}>
                                    <label style={{ fontWeight: 'bold', fontSize: 20 }}>Đã giao!</label>
                                    <div style={{
                                        display: 'flex',
                                        boxSizing: 'border-box',
                                        flexDirection: 'column'
                                    }}>
                                        <label >Đơn hàng sẽ được chuyển qua trạng thái "Đã giao hàng!"</label>
                                    </div>
                                </div>
                            </div>
                        </Button> : null}
                        {props.value.type != 4 || props.value.type == 0 ? <Button style={{
                            width: '100%',
                            height: 'auto',
                            marginBottom: '1.5%',
                            padding: '5px',
                            borderRadius: '10px',
                            boxShadow: '0.2px 1px 2px 1px #9e9e9e',
                            backgroundColor: cl0,
                            border: 'none',
                            color: 'white'
                        }}
                            onClick={() => props.value.type != 0 ? _openModal(0) : null}>

                            <div style={{
                                height: "auto",

                            }}>
                                <div style={{ float: 'left', width: '25%' }}>
                                </div>
                                <div style={{ float: 'left' }}>
                                    <label style={{ fontWeight: 'bold', fontSize: 20 }}>Hủy đơn hàng</label>
                                    <div style={{
                                        display: 'flex',
                                        boxSizing: 'border-box',
                                        flexDirection: 'column'
                                    }}>
                                        <label >Đơn hàng sẽ được chuyển qua trạng thái "Hủy đơn hàng!"</label>
                                    </div>
                                </div>
                            </div>
                        </Button> : null}
                        <div className="popup-btnrow">
                            <hr />
                            <div style={{
                                float: 'right'
                            }}>
                                <Button variant="contained" color="primary" style={{ marginRight: 10, fontSize: 12 }}
                                    onClick={() => setOpenPopupStatus(false)}>Đóng</Button>
                            </div>
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

const wItem = 150
const columns = [
    {
        field: "view",
        headerName: 'Đơn hàng & trạng thái',
        type: 'date',
        width: wItem + 80,
        renderCell: (e) => {
            return <ViewSanPham value={e.row} />
        },
    },

    {
        field: 'nameUser',
        headerName: 'Tên khách hàng',
        width: wItem + 30,
        renderCell: renderCellExpand,
    },
    {
        field: 'diaChi',
        width: wItem + 140,
        padding: 10,
        headerName: 'Địa chỉ',
        renderCell: (e) => {
            return <GridCellExpand value={e.row.specificaddress + ", " + e.row.address} />
        }
    },
    {
        field: 'phoneNumber',
        width: wItem + 30,
        type: 'number',
        padding: 10,
        headerName: 'SĐT khách hàng',
        renderCell: renderCellExpand
    },
    {
        field: "type",
        headerName: 'Trạng thái',
        type: 'number',
        width: wItem - 5,
        renderCell: (e) => {
            let type
            if (e.value == 1) {
                type = "Chờ xác nhận"
            } else if (e.value == 2) {
                type = "Đã xác nhận"
            } else if (e.value == 3) {
                type = "Đang giao"
            } else if (e.value == 4) {
                type = "Đã giao"
            } else if (e.value == 0) {
                type = "Hủy đơn"
            }
            return <GridCellExpand value={type} />
        }
    },
    {
        type: 'number',
        field: 'tongThanhToan',
        headerName: 'Giá',
        colDef: "10%",
        width: wItem - 20,
        renderCell: (e) => {
            return <GridCellExpand
                value={e.value ? String(e.value).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + " đ" : ''}
            />
        },
    },
    {
        type: 'number',
        field: 'ship',
        headerName: 'Ship',
        colDef: "10%",
        width: wItem - 20,
        renderCell: (e) => {
            return <GridCellExpand
                value={e.value ? String(e.value).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + " đ" : '0 đ'}
            />
        },
    },

    {
        field: "createdAt",
        headerName: 'Ngày tạo đơn',
        type: 'date',
        width: wItem + 20,
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
                value={e.value ? d + "-" + m + "-" + date.getFullYear() + " " + h + "h:" + minus + "'" : ''}
            />
        },
    },

];

export default function QuanLyDonHang(props) {

    const dispatch = useDispatch();
    const data = useSelector(paymentState$)
    const classes = useStylesAlert();
    const checkingType = useSelector(paymentStateChecking$)
    React.useEffect(() => {
        const getData = dispatch(actions.getPayment.getPaymentRequest())
        return () => getData
    }, [dispatch, checkingType])
    return (
        <div style={{ height: 550, width: '100%' }} className={classes.root}>
            <Box sx={{ flexGrow: 1, width: '100%', backgroundColor: 'white !important' }}>
                <AppBar position="static">
                    <StyledToolbar style={{ backgroundColor: 'cornflowerblue', alignItems: "center" }}>
                        <div style={{ height: '42px', width: '42px' }} />

                        <Tooltip title="Ghi chú">
                            <view style={{
                                flexDirection: 'row',
                                display: 'flex',
                                alignItems: 'center',
                                alignContent: 'center',
                                color: 'white',
                                marginLeft: 10
                            }}>
                                <div style={{
                                    flexDirection: 'row',
                                    display: 'flex',
                                    alignItems: 'center',
                                    alignContent: 'center',
                                    marginLeft: 10
                                }}>
                                    <div style={{
                                        width: 15,
                                        height: 15,
                                        backgroundColor: lighten(cl0, 0.3),
                                        marginRight: 5,
                                        border: "1px grey solid"

                                    }} />
                                    <a style={{
                                        fontSize: '0.875rem',
                                    }}>: Hủy đơn</a>
                                </div>
                                <div style={{
                                    flexDirection: 'row',
                                    display: 'flex',
                                    alignItems: 'center',
                                    alignContent: 'center',
                                    marginLeft: 10
                                }}>
                                    <div style={{
                                        width: 15,
                                        height: 15,
                                        backgroundColor: lighten(cl1, 0.1),
                                        marginRight: 5,
                                        border: "1px grey solid"
                                    }} />
                                    <a style={{
                                        fontSize: '0.875rem',
                                    }}>: Chờ xác nhận</a>
                                </div>
                                <div style={{
                                    flexDirection: 'row',
                                    display: 'flex',
                                    alignItems: 'center',
                                    alignContent: 'center',
                                    marginLeft: 10
                                }}>
                                    <div style={{
                                        width: 15,
                                        height: 15,
                                        backgroundColor: lighten(cl2, 0),
                                        marginRight: 5,
                                        border: "1px grey solid"
                                    }} />
                                    <a style={{
                                        fontSize: '0.875rem',
                                    }}>: Đã xác nhận</a>
                                </div>
                                <div style={{
                                    flexDirection: 'row',
                                    display: 'flex',
                                    alignItems: 'center',
                                    alignContent: 'center',
                                    marginLeft: 10
                                }}>
                                    <div style={{
                                        width: 15,
                                        height: 15,
                                        backgroundColor: lighten(cl3, 0),
                                        marginRight: 5,
                                        border: "1px grey solid"
                                    }} />
                                    <a style={{
                                        fontSize: '0.875rem',
                                    }}>: Đang giao</a>
                                </div>
                                <div style={{
                                    flexDirection: 'row',
                                    display: 'flex',
                                    alignItems: 'center',
                                    alignContent: 'center',
                                    marginLeft: 10
                                }}>
                                    <div style={{
                                        width: 15,
                                        height: 15,
                                        backgroundColor: lighten(cl4, 0),
                                        marginRight: 5,
                                        border: "1px grey solid"
                                    }} />
                                    <a style={{
                                        fontSize: '0.875rem',
                                    }}>: Đã giao</a>
                                </div>
                            </view>
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
                getRowClassName={(params) => {
                    var type = params.row.type
                    var color = ""
                    if (type == 0) {
                        color = 'super-app-theme--0';
                    } else if (type == 1) {
                        color = 'super-app-theme--1';
                    } else if (type == 2) {
                        color = 'super-app-theme--2';
                    } else if (type == 3) {
                        color = 'super-app-theme--3';
                    } else if (type == 4) {
                        color = 'super-app-theme--4';
                    }
                    return color
                }} />
        </div >
    );
}

