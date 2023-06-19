import React from 'react';
import '../css/Sanpham.css';
import '../css/Phantrang.css';
import Footer from './Footer';
import Tag from './Tag';
import Fpag from './Fpag';
import Bolocsanpham from './Bolocsanpham';
import '../css/Danhsachsanpham.css';
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../redux/actions';
import { sanPhamState$ } from '../redux/selectors';
import Danhsachsanpham from './Danhsachsanpham';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';





function TimKiemScreen() {

    return (
        <>




            <Footer />
        </>
    );
}

export default TimKiemScreen;
