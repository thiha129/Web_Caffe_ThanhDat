import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { Link } from 'react-router-dom';
import { sanPhamSoldState$ } from '../redux/selectors';
import * as actions from '../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-elastic-carousel";
const PreviousBtn = (props) => {
  console.log(props);
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIos style={{ color: "orange", fontSize: "30px" }} />
    </div>
  );
};
const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIos style={{ color: "orange", fontSize: "30px" }} />
    </div>
  );
};

const carouselProperties = {
  prevArrow: <PreviousBtn />,
  nextArrow: <NextBtn />,
  slidesToShow: 4,
  // infinite={false}
  // slidesToScroll={3}
  centerMode: true,
  centerPadding: "30px",
  responsive: [
    {
      breakpoint: 426,
      settings: {
        slidesToShow: 1,
        centerMode: false,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 3,
        centerMode: false,
      },
    },
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 4,
        centerMode: false,
        slidesToScroll: 2,
      },
    },
  ],
};

const MultiItemCarousel = ({ multiItemCarousel }) => {
  const dispatch = useDispatch();
  const sanPhamSold = useSelector(sanPhamSoldState$);
  const [dataSP, setdataSP] = React.useState([])

  React.useEffect(() => {
    dispatch(actions.getSanPhamsSold.getSanPhamsSoldRequest());
  }, [dispatch]);

  React.useEffect(() => {
    if (sanPhamSold != undefined) setdataSP(sanPhamSold)
    console.log("[sanPhamSold]", sanPhamSold);
  }, [sanPhamSold]);

  return (
    <div style={{ width: '82%', margin: '0 auto', }} className="carousel">
      <div className="cah1" style={{ borderBottom: '1px black solid', paddingBottom: '4px' }}><h1>Sản phẩm bán chạy</h1></div>
      <Slider   {...carouselProperties}>
        {dataSP.map((data) => (
          <Link to='/'>

            <div href="/sanpham" style={{
              textAlign: "center",
              textDecoration: "underline",
              textDecorationColor: "white",
              minHeight: "100%",
              borderRadius: '10px',
              boxShadow: '0 4px 5px 0 rgba(0, 0, 0, 0.2), 0 4px 6px 0 rgba(0, 0, 0, 0.19)',

              margin: '0px 32px 0px 32px'
            }}>
              <Link to='/sanpham'>
                {
                  data.flashSale == 1 ? <img src="./sale.png" style={{
                    position: 'absolute',
                    zIndex: '1',
                    width: "50px",
                    top: '15px',
                    marginLeft: '5px'
                  }}
                  /> : null
                }
                <img
                  className="multi__image"
                  src={data.img[0].image}
                  alt=""
                  style={{
                    borderRadius: '10px 10px 0px 0px',
                    width: "100%",
                    height: "50%",
                    minHeight: '225px'
                    // objectFit: "contain",
                  }}
                />
                <p href="/sanpham" style={{
                  width: "90%",
                  margin: "0 auto",
                  fontSize: "14px",
                  padding: "5px 0",
                  color: "black",
                  wordBreak: "break-all",
                  textDecoration: "underline",
                  textDecorationColor: "white",
                  height: "50px"
                }}>{data.name}</p>
                <p href="/sanpham"
                  style={{
                    fontSize: "15px",
                    color: "red",
                    textDecoration: "underline",
                    textDecorationColor: "white",
                    fontWeight: 'bold'
                  }}>Chỉ còn ₫{data.priceSale}</p>
                <p href="/sanpham" style={{
                  fontSize: "14px",
                  padding: "10px 0 15px 0",
                  color: "gray",
                  textDecoration: "underline",
                  textDecorationColor: "white",
                }}>Giá gốc ₫{data.price}</p>
              </Link >

            </div >
          </Link >

        ))}
      </Slider >
    </div >
  );
};


export default MultiItemCarousel;
