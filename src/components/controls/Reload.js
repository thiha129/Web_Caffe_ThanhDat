import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import { Autorenew } from "@material-ui/icons";
import clsx from "clsx";

import { paymentState$ } from '../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions'

const useStyles = makeStyles((theme) => ({
    refresh: {
        height: '1.5rem',
        cursor: "pointer",
        "&.spin": {
            animation: "$spin 1s 1",
            pointerEvents: "none"
        }
    },
    "@keyframes spin": {
        "0%": {
            transform: "rotate(0deg)"
        },
        "100%": {
            transform: "rotate(180deg)"
        }
    }
}));

function Refresh({ color }) {
    const [spin, setSpin] = React.useState(false);
    const classes = useStyles();

    const dispatch = useDispatch();

    const refreshCanvas = () => {
        setSpin(true);
        setTimeout(() => {
            setSpin(false);
        }, 1000);

    };

    React.useEffect(() => {
        dispatch(actions.getPayment.getPaymentRequest())
        dispatch(actions.getSanPham.getSanPhamRequest())
        dispatch(actions.getPosts.getPostsRequest())
    }, [spin])

    return (
        <Button style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            color: color
        }}
            onClick={refreshCanvas}
        >
            <Autorenew
                className={clsx({
                    [classes.refresh]: true,
                    spin: spin
                })}
                spin={360}
            />
            <a>Làm mới</a>
        </Button>
    );
}

export default Refresh;
