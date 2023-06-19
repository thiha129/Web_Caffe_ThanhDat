import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../redux/actions'
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function PaginationOutlined() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const perPage = 6;
    return (
        <div className={classes.root}>
            <Pagination key={e => e.target.outerText} count={10} onClick={(e) => {
                dispatch(actions.getSanPhamsPage.getSanPhamsPageRequest({
                    pagenumber: e.target.outerText,
                    perpage: perPage,
                }))
            }} variant="outlined" color="secondary" />
        </div>
    );
}
