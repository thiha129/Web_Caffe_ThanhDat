
import React, { useEffect } from "react";
import "../../App.css";
import Footer from "../Footer";
import { Button } from '../Button';
import MultiItemCrousel from "../MultiItemCrousel";
import "../../css/Danhsachsanpham.css";

import * as actions from '../../redux/actions';
import { useDispatch, useSelector } from "react-redux";

import Cards from '../Cards';
import banner from "../../assets/logo/banner.png"
function Home() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.getSanPham.getSanPhamRequest());
  }, [dispatch]);
  return (
    <>

      <div style={{ background: 'white', margin: 'auto', position: 'relative' }}>
        <img src={banner} style={{ width: '100%' }}></img>
        <div>
          <Button
            className='btns'
            buttonStyle='btn--primary'
            buttonSize='btn--large'
            onClick={console.log('hey')}

          >
            Mua ngay <i className='far fa-play-circle' />
          </Button>
        </div>
      </div>
      <div style={{ background: 'white', paddingTop: "10px" }}>
        <MultiItemCrousel />
        <Cards />
      </div>

      <Footer />
    </>
  );
}

export default Home;
