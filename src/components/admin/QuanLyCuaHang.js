import React, { Fragment, useState } from 'react';
// import './Countries.css';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
// import Moment from 'react-moment';
// import moment from 'moment';
import { sanPhamCheckedState$, sanPhamAllstate$ } from '../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions'

import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Box, Button, Fade, MenuItem, Checkbox } from "@material-ui/core";
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
// DatePicker
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Cropper from 'react-easy-crop'
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
    const [checkBox, setCheckBox] = React.useState(value.flashSale == 1 ? true : false)

    const [tenSP, setTenSP] = React.useState(value.name)
    const [loaiSP, setLoaiSP] = React.useState(value.type)
    const [donGiaSP, setDonGiaSP] = React.useState(value.price)
    const [giaSale, setgiaSale] = React.useState(value.priceSale)
    const [ngaySanXuat, setNgaySanXuat] = React.useState(value.ngaySanXuat)
    const [ngayHetHan, setNgayHetHan] = React.useState(value.ngayHetHan)
    const [soLuongSP, setSoLuongSP] = React.useState(value.tongKho)
    const [gioiThieuSP, setGioiThieuSP] = React.useState(value.details)

    let reader = new FileReader();

    const [pickImg, setPickImg] = React.useState(false)
    const [img, setImg] = React.useState([])
    const [dataImg, setDataImg] = React.useState([])
    const [multiIMG, setMultiIMG] = React.useState([])

    const data = useSelector(sanPhamAllstate$)

    React.useEffect(() => {
        setOpenPopup(false)
        setOpen(false)
        setDataImg([])
    }, [data])

    const handleFileChange = (event) => {
        const { target } = event;
        const { files } = target;

        reader.onloadend = () => { setImg(reader.result) }
        reader.readAsDataURL(files[0])
        if (files && files[0]) {
            setPickImg(true)
        }

    }

    const onCancel = () => {
        setPickImg(false)
        setImg("")
    };

    const cropImage = (e) => {
        setImg(e.url)
        setDataImg([...dataImg, e.file])
        setPickImg(false)
        setMultiIMG([...multiIMG, e.url])
    }



    const del = () => {
        dispatch(actions.deleteSanPham.deleteSanPhamRequest({ _id: value._id }))
    }

    const update = () => {
        var fd = new FormData();
        fd.append('_id', value._id)
        fd.append('tenSP', tenSP)
        fd.append('loaiSP', loaiSP)
        fd.append('donGiaSP', donGiaSP)
        fd.append('ngaySanXuat', ngaySanXuat)
        fd.append('ngayHetHan', ngayHetHan)
        fd.append('soLuongSP', soLuongSP)
        fd.append('gioiThieuSP', gioiThieuSP)
        // fd.append('dirName', '2021/12')
        if (dataImg == undefined) {
            if (
                tenSP == "" ||
                loaiSP == "" ||
                donGiaSP == "" ||
                ngaySanXuat == "" ||
                ngayHetHan == "" ||
                soLuongSP == "" ||
                gioiThieuSP == ""
            ) {
                alert("Không được để trống!")
            } else {
                if (String(giaSale).trim() == "" && checkBox == true) {
                    alert("Mời nhập giá sale")
                } else if (String(giaSale).trim() != "" && checkBox == true) {
                    fd.append('giaSale', giaSale)
                    fd.append('sale', 1)
                    dispatch(actions.updateSanPham.updateSanPhamRequest(fd))
                } else if (checkBox != true) {
                    fd.append('giaSale', 0)
                    fd.append('sale', 0)
                    dispatch(actions.updateSanPham.updateSanPhamRequest(fd))
                }
            }
        } else {
            for (const key of Object.keys(dataImg)) {
                fd.append('file', dataImg[key])
            }
            if (
                tenSP == "" ||
                loaiSP == "" ||
                donGiaSP == "" ||
                ngaySanXuat == "" ||
                ngayHetHan == "" ||
                soLuongSP == "" ||
                gioiThieuSP == ""
            ) {
                alert("Không được để trống!")
            } else {
                if (String(giaSale).trim() == "" && checkBox == true) {
                    alert("Mời nhập giá sale")
                } else if (String(giaSale).trim() != "" && checkBox == true) {
                    fd.append('giaSale', giaSale)
                    fd.append('sale', 1)
                    dispatch(actions.updateSanPham.updateSanPhamRequest(fd))
                } else if (checkBox != true) {
                    fd.append('giaSale', 0)
                    fd.append('sale', 0)
                    dispatch(actions.updateSanPham.updateSanPhamRequest(fd))
                }
            }
        }

    }

    const handleChange = () => {
        setCheckBox(!checkBox)
    }

    return (
        <Fragment>
            <Button variant="outlined" color="primary" style={{ marginRight: 10 }} onClick={setOpenPopup}>Sửa</Button>
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
                            Sản phẩm này sẽ bị xóa!
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            Khi bạn nhấn nút "Xác nhận" sản phẩm sẽ bị xóa vĩnh viễn. Xác nhận xóa?
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
                                    {multiIMG.map(e =>
                                        <img style={{ width: "auto" }} src={e} alt="" key={e} />
                                    )}
                                </div>

                            </div>

                        </div>
                        <div className="popup-right">
                            {/* <div className="popup-formcontrol"> */}
                            <div className="address-row">
                                <label className="fontSizeLabel" >Tiêu đề sản phẩm</label><br />
                                <input type="text" defaultValue={tenSP} className="form-control" onChange={(e) => {
                                    setTenSP(e.target.value)
                                }}  ></input>
                            </div>
                            <div className="address-row">
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    label="Loại sản phẩm"
                                    defaultValue={loaiSP}
                                    style={{ width: '45%' }}
                                    onChange={(e) => setLoaiSP(e.target.value)}
                                    helperText="Chọn loại sản phẩm"
                                    variant="standard"
                                >
                                    {typeSP.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="address-row">
                                <label className="fontSizeLabel" >Số lượng</label><br />
                                <input type="number" min={0} style={{ width: '100%' }} defaultValue={soLuongSP} className="form-control" onChange={(e) => {
                                    setSoLuongSP(e.target.value)
                                }}  ></input>
                            </div>

                            <div className="flex-space-twoRow" >
                                <div className="address-row">
                                    <label className="fontSizeLabel" >Đơn giá</label><br />
                                    <input type="number" min={0} style={{ width: '100%' }} defaultValue={donGiaSP} placeholder="Số lượng" className="form-control" onChange={(e) => {
                                        setDonGiaSP(e.target.value)
                                    }}  ></input>
                                </div>
                            </div>
                            <div className="flex-space-twoRow" >
                                <div className="address-row">
                                    <Checkbox checked={checkBox} onChange={handleChange} />
                                    <label style={{
                                        margin: 0
                                    }}>Áp dụng giảm giá</label><br />
                                </div>
                            </div>

                            {checkBox ? <div className="flex-space-twoRow" >
                                <div className="address-row">
                                    <label className="fontSizeLabel" >Giá sau khi giảm</label><br />
                                    <input type="number" min={0} style={{ width: '100%' }} defaultValue={giaSale} placeholder="Số lượng" className="form-control" onChange={(e) => {
                                        setgiaSale(e.target.value)
                                    }}  ></input>

                                </div>
                            </div> : null}

                            <div className="flex-space-twoRow" >
                                <div className="address-row">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="Ngày sản xuất"
                                            value={ngaySanXuat}
                                            onChange={(newValue) => {
                                                setNgaySanXuat(newValue);
                                            }}
                                            renderInput={(params) => <TextField style={{ width: '100%' }} {...params} />}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className="address-row">

                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="Ngày hết hạn"
                                            value={ngayHetHan}
                                            onChange={(newValue) => {
                                                setNgayHetHan(newValue);
                                            }}
                                            renderInput={(params) => <TextField style={{ width: '100%' }} {...params} />}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>

                            <div className="address-row">
                                <label className="fontSizeLabel" >Giới thiệu sản phẩm</label><br />
                                <TextField
                                    style={{
                                        width: '-webkit-fill-available'
                                    }}
                                    defaultValue={gioiThieuSP}
                                    placeholder="Lời giới thiệu cho sản phẩm"
                                    multiline
                                    onChange={(e) => {
                                        setGioiThieuSP(e.target.value)
                                    }}
                                />

                            </div>

                        </div>

                    </div>
                    <hr />
                    <div className="popup-btnrow">
                        <div className="popup-btn">
                            <button className="pcancel-btn" onClick={() => setOpenPopup(!openPopup)}>
                                <span >Hủy</span>
                            </button>
                            <button className="psubmit-btn" type='submit' onClick={update}>
                                <span className="pspan-submit">Sửa</span>
                            </button>
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
        field: "actions",
        headerName: 'Tùy chọn',
        type: 'number',
        width: wItem + 10,
        renderCell: (e) => {
            return <GridCellActions value={e.row} />
        },
    },
    {
        field: 'name',
        headerName: 'Tên',
        width: wItem + 50,
        renderCell: renderCellExpand,
    },
    {
        field: 'img',
        width: wItem,
        padding: 10,
        headerName: 'Images',
        renderCell: (e) => {
            return <img src={e.value[0].image} style={{ width: '100%', resize: "both" }} />;
        }
    },
    {
        field: "type",
        headerName: 'Loại',
        type: 'number',
        width: wItem,
        renderCell: renderCellExpand,
    },
    {
        type: 'number',
        field: 'price',
        headerName: 'Giá',
        colDef: "10%",
        width: wItem,
        renderCell: (e) => {
            return <GridCellExpand
                value={e.value ? String(e.value).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + " đ" : ''}
            />
        },
    },
    {
        type: 'number',
        field: 'priceSale',
        headerName: 'Giá sale',
        colDef: "10%",
        width: wItem,
        renderCell: (e) => {
            return <GridCellExpand
                value={e.value ? String(e.value).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + " đ" : '0 đ'}
            />
        },
    },

    {
        type: 'number',
        field: 'flashSale',
        headerName: 'Giảm giá',
        width: wItem,
        renderCell: (e) => {
            return <GridCellExpand
                value={e.value == '1' ? 'Có' : ''}
            />
        },
    },

    {
        field: 'tongKho',
        headerName: 'Số lượng',
        type: 'number',
        width: wItem,
        renderCell: renderCellExpand
    },
    {
        field: "sold",
        headerName: 'Đã bán',
        type: 'number',
        width: wItem - 20,
        renderCell: renderCellExpand,
    },
    {
        field: "createdAt",
        headerName: 'Ngày nhập kho',
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
                value={e.value ? d + "-" + m + "-" + date.getFullYear() + " " + h + "h:" + minus + "'" : ''}
            />
        },
    },

    {
        field: "ngaySanXuat",
        headerName: 'Ngày sản xuất',
        type: 'date',
        width: wItem + 20,
        renderCell: (e) => {
            var date = new Date(e.value)
            var d
            var m

            parseInt(date.getDate()) < 10 ? d = "0" + date.getDate() : d = date.getDate() //thêm sôs 0 vào trước các ngày < 10
            parseInt(date.getMonth()) < 9 ? m = "0" + (date.getMonth() + 1) : m = (date.getMonth() + 1) //để đúng định dạng cho tháng nên + 1 (tháng 0 sẽ là tháng 1)

            return <GridCellExpand
                value={e.value ? d + "-" + m + "-" + date.getFullYear() : ''}
            />
        }
    },
    {
        field: "ngayHetHan",
        headerName: 'Ngày hết hạn',
        type: 'date',
        width: wItem + 20,
        renderCell: (e) => {
            var date = new Date(e.value)
            var d
            var m
            parseInt(date.getDate()) < 10 ? d = "0" + date.getDate() : d = date.getDate()
            parseInt(date.getMonth()) < 9 ? m = "0" + (date.getMonth() + 1) : m = (date.getMonth() + 1)
            return <GridCellExpand
                value={e.value ? d + "-" + m + "-" + date.getFullYear() : ''}
            />
        },
    },



];

export default function QuanLyCuaHang(props) {
    const [openPopup, setOpenPopup] = useState(false);
    const [tenSP, setTenSP] = React.useState("")
    const [loaiSP, setLoaiSP] = React.useState("")
    const [donGiaSP, setDonGiaSP] = React.useState("10000")
    const [giaSale, setgiaSale] = React.useState("")
    const [ngaySanXuat, setNgaySanXuat] = React.useState("")
    const [ngayHetHan, setNgayHetHan] = React.useState("")
    const [soLuongSP, setSoLuongSP] = React.useState("")
    const [gioiThieuSP, setGioiThieuSP] = React.useState("")
    const [checkBox, setCheckBox] = React.useState(false)

    const [pickImg, setPickImg] = React.useState(false)
    const [img, setImg] = React.useState("")
    const [dataImg, setDataImg] = React.useState([])
    const [multiIMG, setMultiIMG] = React.useState([])

    const [selected, setSelected] = useState(null);

    const onCropComplete = React.useCallback((croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels)
    }, [])
    const dispatch = useDispatch();
    const data = useSelector(sanPhamAllstate$)
    const classes = useStylesAlert();
    const isChecking = useSelector(sanPhamCheckedState$)
    let reader = new FileReader();
    React.useEffect(() => {
        const getData = dispatch(actions.getSanPham.getSanPhamRequest())
        setTenSP('')
        setLoaiSP('')
        setDonGiaSP('')
        setgiaSale('')
        setNgaySanXuat('')
        setNgayHetHan('')
        setSoLuongSP('')
        setGioiThieuSP('')
        setImg("")
        setDataImg([])
        setMultiIMG([])
        setOpenPopup(false)
        return () => getData
    }, [dispatch, isChecking])

    const onCancel = () => {
        setPickImg(false)
        setImg("")
        setCheckBox(false)
    };

    const handleFileChange = (event) => {
        const { target } = event;
        const { files } = target;

        reader.onloadend = () => {
            setImg(reader.result)
        }
        if (files[0] != undefined) {
            reader.readAsDataURL(files[0])
        }
        // console.log('[files[0]]', files[0]);
        if (files && files[0]) {
            setPickImg(true)
        }

    }

    const cropImage = (e) => {
        setImg(e.url)
        setDataImg([...dataImg, e.file])
        setPickImg(false)
        setMultiIMG([...multiIMG, e.url])
    }

    const handleChange = () => {
        setCheckBox(!checkBox)
    }

    const add = () => {
        var fd = new FormData();
        if (dataImg == undefined) {
            alert("Bạn chưa chọn ảnh!")
        } else {
            if (
                tenSP == "" ||
                loaiSP == "" ||
                donGiaSP == "" ||
                ngaySanXuat == "" ||
                ngayHetHan == "" ||
                soLuongSP == "" ||
                gioiThieuSP == ""
            ) {
                alert("Không được để trống!", tenSP)
            } else {
                for (const key of Object.keys(dataImg)) {
                    fd.append('files', dataImg[key])
                }
                fd.append('tenSP', tenSP)
                fd.append('loaiSP', loaiSP)
                fd.append('donGiaSP', donGiaSP)
                fd.append('ngaySanXuat', ngaySanXuat)
                fd.append('ngayHetHan', ngayHetHan)
                fd.append('soLuongSP', soLuongSP)
                fd.append('gioiThieuSP', gioiThieuSP)
                fd.append('dirName', '2021/12')
                if (String(giaSale).trim() == "" && checkBox == true) {
                    alert("Mời nhập giá sale")
                } else if (String(giaSale).trim() != "" && checkBox == true) {
                    fd.append('giaSale', giaSale)
                    fd.append('sale', 1)
                    dispatch(actions.createSanPham.createSanPhamRequest(fd))
                } else if (checkBox != true) {
                    fd.append('giaSale', 0)
                    fd.append('sale', 0)
                    dispatch(actions.createSanPham.createSanPhamRequest(fd))
                }
            }
        }
    }


    return (
        <div style={{ height: 550, width: '100%' }} className={classes.root}>
            <Box sx={{ flexGrow: 1, width: '100%', backgroundColor: 'white !important' }}>
                <AppBar position="static">
                    <StyledToolbar style={{ backgroundColor: 'cornflowerblue', alignItems: "center" }}>
                        <Tooltip title="Thêm sản phẩm" onClick={() => { setOpenPopup(true) }}>
                            <IconButton style={{ border: '1px white solid' }}>
                                <AddIcon style={{ color: 'white' }} />
                            </IconButton>
                        </Tooltip>

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
                                        backgroundColor: lighten(cl1, 0.3),
                                        marginRight: 5,
                                        border: "1px grey solid"

                                    }} />
                                    <a style={{
                                        fontSize: '0.875rem',
                                    }}>: Dưới 1 tháng</a>
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
                                        backgroundColor: lighten(cl2, 0.1),
                                        marginRight: 5,
                                        border: "1px grey solid"
                                    }} />
                                    <a style={{
                                        fontSize: '0.875rem',
                                    }}>: Dưới 10 ngày</a>
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
                                    }}>: Hết hạn</a>
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
                    var date = new Date(params.row.ngayHetHan)
                    var now = new Date();
                    var getToDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()) //Biến lấy ngày hiện tại
                    var format = new Date(date.getFullYear(), date.getMonth(), date.getDate()) //Biến lấy ngày hết hạn theo định dạng yyyy/MM/dd
                    var count = (format - getToDay) / (24 * 60 * 60 * 1000) //Biến tính ngày còn lại
                    var a = "" //Biến thay đổi màu
                    if (count < 30) {
                        a = 'super-app-theme--1';
                        if (count < 10) {
                            a = 'super-app-theme--2';
                            if (count <= 0) {
                                a = 'super-app-theme--3';
                            }
                        }
                    }
                    return a
                }} />
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
                                    <input type="file" id="file" multiple accept="image/*" capture="camera" multiple onChange={handleFileChange} />
                                    <label htmlFor="file" >
                                        <i className="material-icons"><AiFillCamera /></i>
                                    </label>
                                </div>
                            </div>
                            <div className="mul-holder" >
                                {multiIMG.map(e =>
                                    <img style={{ width: "auto" }} src={e} alt="" key={e} />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="popup-right">
                        <div className="address-row">
                            <label className="fontSizeLabel">Tiêu đề sản phẩm</label><br />
                            <input type="text" placeholder="Tiêu đề sản phẩm" className="form-control" onChange={(e) => {
                                setTenSP(e.target.value)
                            }}  ></input>
                        </div>
                        <div className="address-row">
                            <TextField
                                id="standard-select-currency"
                                select
                                label="Loại sản phẩm"
                                style={{ width: '45%' }}
                                onChange={(e) => setLoaiSP(e.target.value)}
                                helperText="Chọn loại sản phẩm"
                                variant="standard"
                            >
                                {typeSP.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className="address-row">
                            <label className="fontSizeLabel" >Số lượng</label><br />
                            <input type="number" min={0} style={{ width: '100%' }} placeholder="Số lượng sản phẩm trong kho" className="form-control" onChange={(e) => {
                                setSoLuongSP(e.target.value)
                            }}  ></input>
                        </div>
                        <div className="flex-space-twoRow" >
                            <div className="address-row">
                                <label className="fontSizeLabel" >Đơn giá</label><br />
                                <input type="number" min={10000} style={{ width: '100%' }} defaultValue={10000} placeholder="Số lượng" className="form-control" onChange={(e) => {
                                    setDonGiaSP(e.target.value)
                                }}  ></input>
                            </div>
                        </div>
                        <div className="flex-space-twoRow" >
                            <div className="address-row">
                                <Checkbox checked={checkBox} onChange={handleChange} />
                                <label style={{
                                    margin: 0
                                }}>Áp dụng giảm giá</label><br />
                            </div>
                        </div>
                        {
                            checkBox ? <div className="flex-space-twoRow" >
                                <div className="address-row">
                                    <label className="fontSizeLabel" >Giá sau khi giảm</label><br />
                                    <input type="number" min={0} style={{ width: '100%' }} defaultValue={0} placeholder="Số lượng" className="form-control" onChange={(e) => {
                                        parseInt(e.target.value) < parseInt(donGiaSP) ? setgiaSale(e.target.value) : setgiaSale(donGiaSP)
                                    }}  ></input>
                                </div>
                            </div> : null
                        }

                        <div className="flex-space-twoRow" >
                            <div className="address-row">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Ngày sản xuất"

                                        value={ngaySanXuat}
                                        onChange={(newValue) => {
                                            setNgaySanXuat(newValue);
                                        }}
                                        renderInput={(params) => <TextField style={{ width: '100%' }} {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div className="address-row">

                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Ngày hết hạn"
                                        value={ngayHetHan}
                                        onChange={(newValue) => {
                                            setNgayHetHan(newValue);
                                        }}
                                        renderInput={(params) => <TextField style={{ width: '100%' }} {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
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
                                    setGioiThieuSP(e.target.value)
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

