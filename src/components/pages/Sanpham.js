import React from 'react';
import '../../css/Sanpham.css';
import '../../css/Phantrang.css';
import Footer from '../Footer';
import Tag from '../Tag';
import '../../css/Danhsachsanpham.css';

import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../redux/actions';
import { sanPhamState$, countPage$, timKiemChecking$, timKiemData$, timKiemCountPage$, textTimKiem$ } from '../../redux/selectors';
import { Link, useParams } from 'react-router-dom';

import Danhsachsanpham from '../Danhsachsanpham';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
function Sanpham(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }));
  const classes = useStyles();
  const perPage = 8;
  //get data frm server 
  const dispatch = useDispatch();
  const sanPham = useSelector(sanPhamState$);
  const countPage = useSelector(countPage$);
  const dataTimKiem = useSelector(timKiemData$)
  const checkingTimKiem = useSelector(timKiemChecking$)
  const countPageTimKiem = useSelector(timKiemCountPage$)
  const textTimKiem = useSelector(textTimKiem$)

  const [data, setData] = React.useState([])
  const [count, setCount] = React.useState(0)
  const [changeData, setChangeData] = React.useState(false)
  const [page, setPage] = React.useState(0)
  const { search } = useParams();

  React.useEffect(() => {
    console.log("[search]", search);
    if (search !== "" && search !== null && search !== undefined) {
      dispatch(actions.timKiem.timKiemRequest({ text: search }))
      console.log("[SearchUndefined]");
    } else if (checkingTimKiem == 0) {
      dispatch(actions.getSanPhamsPage.getSanPhamsPageRequest({ pagenumber: 0 }));
    } else {
      dispatch(actions.getSanPhamsPage.getSanPhamsPageRequest({ pagenumber: 0 }));
    }
  }, [dispatch]);

  React.useEffect(() => {
    setData(sanPham);
    setCount(countPage);
    window.scroll(0, 0)
  }, [sanPham, countPage])

  React.useEffect(() => {
    if (checkingTimKiem == 1) {
      setData(dataTimKiem)
      setCount(countPageTimKiem);
      setChangeData(true)
    } else if (checkingTimKiem == 0) {
      setData(sanPham);
      setCount(countPage);
      setChangeData(false)
      dispatch(actions.getSanPhamsPage.getSanPhamsPageRequest({ pagenumber: 0 }));
    }
  }, [checkingTimKiem, dataTimKiem])

  const changePage = (e) => {
    dispatch(actions.getSanPhamsPage.getSanPhamsPageRequest({
      pagenumber: e.target.outerText - 1
    }, [dispatch]))
    setPage(e.target.outerText - 1)
  }

  return (
    <div className='rootSP' style={{
      backgroundImage: "linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,1)), url('./backGroundDangKy.png')",

    }}>
      <div className='cards__container'>
        <div className="containerpt">
          <Tag checkingTimKiem={checkingTimKiem} text={textTimKiem} />
          <div className='' >
            <div className=''>
              <div className="box-containersanpham1tong">
                <div className="box-containersanpham1">
                  {data.map(danhsachsanpham => <Danhsachsanpham page={page} danhsachsanpham={danhsachsanpham} />)}
                </div>
              </div>
            </div>
            <div className='fpag'>
              <div className={classes.root}>
                {changeData ?
                  <Pagination key={e => e.target.outerText} count={count} onClick={(e) => {
                    dispatch(actions.timKiem.timKiemRequest({
                      text: textTimKiem,
                      pagenumber: e.target.outerText - 1
                    }, [dispatch]))

                  }} variant="outlined" color="secondary" /> :
                  <Pagination key={e => e.target.outerText} count={count} onClick={changePage} variant="outlined" color="secondary" />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Sanpham;
