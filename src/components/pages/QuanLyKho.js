import React from 'react';
import MyAppBar from '../MyAppBar';
import QuanLyDonHang from '../admin/QuanLyDonHang';
import QuanLyCuaHang from '../admin/QuanLyCuaHang';
import QuanLyBaiViet from '../admin/QuanLyBaiViet';
import ThongKe from '../admin/ThongKe';
import '../../css/Phantrang.css';
import CircularProgress from '@mui/material/CircularProgress'

import axios from "axios";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import { sanPhamAllstate$, postsState$, paymentState$ } from '../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions'
import { InputAdornment } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function QuanLyDonHangComponent() {
    const [selectedClass, setselectedClass] = React.useState(0)
    const [isLoading, setIsLoading] = React.useState(false)

    const [adminAccount, setadminAccount] = React.useState(false)
    const [userName, setUserName] = React.useState('')
    const [pass, setPass] = React.useState('')


    const dataSP = useSelector(sanPhamAllstate$)
    const dataPost = useSelector(postsState$)
    const dataPayment = useSelector(paymentState$)
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        setIsLoading(false)
        setTimeout(() => {
            setIsLoading(true)
        }, 1000);
    }, [selectedClass])

    React.useEffect(() => {
        setTimeout(() => {
            dispatch(actions.getPosts.getPostsRequest())
            dispatch(actions.getPayment.getPaymentRequest())
            dispatch(actions.getSanPham.getSanPhamRequest())
        }, 600000);
    }, [dataPayment])

    const checkAccount = () => {
        if (userName.trim().length != 0) {
            axios.get(
                `https://thanh-dat-coffee.herokuapp.com/admin?username=${userName}&pass=${pass}`
            ).then(e => {
                if (e.data.check == 1) {
                    setadminAccount(true)
                } else if (e.data.check == 0) {
                    setadminAccount(false)
                }
            }
            )
        }

    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            height: 'auto'
        }}>
            <MyAppBar
                setselectedClass={setselectedClass}
            />
            {
                !isLoading && adminAccount == true ?
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        height: 550
                    }}>
                        <CircularProgress style={{ alignItems: 'center', marginTop: '5%', marginBottom: '1%' }} size={60} color="inherit">
                        </CircularProgress>
                        <label style={{ fontSize: 24 }}>Đang tải ...</label>

                    </div> : null
            }
            {adminAccount ? null :
                <div style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0.9)), url('./backGroundDangKy.png')",
                    minHeight: 600,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }} >
                    <Box
                        component="form"
                        sx={{
                            boxShadow: '0 2px 4px 0 rgb(0 0 0 / 50%), 0 3px 5px 0 rgb(0 0 0 / 30%)',
                            width: '30%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid gray',
                            borderRadius: '10px',
                            minHeight: 300,
                            '& .MuiTextField-root': {
                                width: '-webkit-fill-available',
                                m: '3% 0 5%'
                            },
                            '& h4': {
                                width: '80%',
                                textAlign: 'center',
                                fontWeight: 'bold'
                            },
                            '& .parentInput': {
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '5% 0',
                                width: '65%'
                            }
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <h4>Mời bạn đăng nhập vào tài khoản ADMIN</h4>
                        <div className='parentInput' >

                            <TextField
                                type="text"
                                placeholder="Nhập tài khoản"
                                variant="standard"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><PersonOutlineOutlinedIcon /></InputAdornment>,
                                }}
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <TextField
                                type="password"
                                variant="standard"
                                placeholder="Nhập mật khẩu"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><LockOutlinedIcon /></InputAdornment>,
                                }}
                            />
                        </div>
                        <Button onClick={checkAccount} sx={{ minHeight: '50px' }} variant='outlined' color='success'>
                            Đăng nhập
                        </Button>
                    </Box>
                </div>
            }
            {
                selectedClass == 0 && isLoading == true && adminAccount == true ? <QuanLyCuaHang
                    selectedClass={selectedClass}
                /> : null
            }
            {
                selectedClass == 1 && isLoading == true && adminAccount == true ? <QuanLyDonHang
                    selectedClass={selectedClass}
                /> : null
            }
            {
                selectedClass == 2 && isLoading == true && adminAccount == true ? <QuanLyBaiViet
                    selectedClass={selectedClass}
                /> : null
            }
            {
                selectedClass == 3 && isLoading == true && adminAccount == true ? <ThongKe
                    selectedClass={selectedClass}
                /> : null
            }

        </div>
    );
}

export default QuanLyDonHangComponent;
