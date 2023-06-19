import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../redux/actions';
import { notiState$, timKiemData$ } from '../redux/selectors';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        backgroundColor: 'rgba(242, 254, 255, 0)',
        marginTop: '5px',
        justifyContent: "flex-start",
        flexDirection: 'column',
        marginBottom: '10px',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

export default function Chips({
    checkingTimKiem,
    text
}) {
    const classes = useStyles();
    const [headerText, setHeaderText] = React.useState("Tất Cả Sản Phẩm.")
    const [check, setCheck] = React.useState(false)
    React.useEffect(() => {
        if (checkingTimKiem == 1) {
            setHeaderText(`Kết quả cho từ khóa '${text}'.`)
            setCheck(false)
        } else if (checkingTimKiem == 0 && String(text).trim() == "") {
            setHeaderText(`Tất Cả Sản Phẩm.`)
            setCheck(false)
        } else if (checkingTimKiem == 0) {
            setHeaderText(`Chúng tôi không tìm thấy kết quả nào cho từ khóa '${text}'.`)
            setCheck(true)
        }
    }, [checkingTimKiem, text])

    return (
        <div className={classes.root}>
            <h1 style={{
                fontWeight: 'bold',
                paddingLeft: "10px",
                fontSize: '24px'
            }}>{headerText}</h1>
            {check ? <h1 style={{
                fontWeight: 'bold',
                paddingLeft: "10px",
                fontSize: '20px'
            }}
            >Dưới đây là tất cả sản phẩm.</h1> : null}
        </div>
    );
}
