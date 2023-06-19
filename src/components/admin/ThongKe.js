import React from 'react';
import Bolocthongke from '../Bolocthongke';
import Bangdulieufake from '../bangdulieufake';
import Dulieufake2 from '../dulieufake2';
import '../../css/Phantrang.css';

import { Box, Button, Fade } from "@material-ui/core";
import AppBar from '@mui/material/AppBar';
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, darken, lighten } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';



const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    // Override media queries injected by theme.mixins.toolbar
    '@media all': {
        minHeight: 20,
    },
}));
const cl0 = '#FF4B2C' // Hủy đơn
const cl1 = '#FFF739' // Chờ xác nhận
const cl2 = '#05F787' // Đã xác nhận
const cl3 = '#FAAD48' // Đang giao
const cl4 = '#D7F6F0' // Đã giao

function Khothongke() {
    return (
        <>
            <div className="">
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
                <div className='cards__container'>

                    <div className="containerpt">
                        <div className="box box-2">
                            <div className='"box box-22'>

                                <Bangdulieufake />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Khothongke;
