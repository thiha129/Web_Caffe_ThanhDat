import React, { useEffect } from "react";
import "../css/Chitietsanpham.css";
import { Link } from "react-router-dom";

import Footer from "./Footer";
import { Carousel } from "react-carousel-minimal";
import "react-alice-carousel/lib/alice-carousel.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";
import { sanPhamState$, _idAccount$ } from "../redux/selectors";
import { useState } from "react";
import { useParams } from "react-router";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { Box, Fade, MenuItem, Checkbox, Typography } from "@material-ui/core";
import Backdrop from "@mui/material/Backdrop";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Modal from "@mui/material/Modal";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  alignItems: "center",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  borderRadius: "8px",
};

const Chitietsanpham = ({ location }) => {
  const [open2, setOpen2] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [payInput, setPayInput] = useState(1);
  const { id, page } = useParams();
  const dispatch = useDispatch();
  const sanPham = useSelector(sanPhamState$);
  const [data, setData] = useState([]);
  const [dataCart, setdataCart] = useState([]);
  const [dataOder, setDataOder] = useState([]);
  const [sale, setSale] = useState(0);
  const url = window.location.href;
  const getIDAccount = useSelector(_idAccount$);

  const [tenNguoiDung, setTenNguoiDung] = React.useState("Bùi Văn Hải");
  const [sdt, setSDT] = React.useState("84905190166");
  const [xaPhuong, setXaPhuong] = React.useState("Thị trấn Ea Kar");
  const [quanHuyen, setQuanHuyen] = React.useState("Ea Kar");
  const [tinhTP, setTinhTp] = React.useState("Đắk Lắk");
  const [diaChiCuThe, setDiaChiCuThe] = React.useState("Khối 4");
  const [img, setimg] = useState([
    {
      image: "https://thanh-dat-coffee.herokuapp.com/file/1638893166198blob",
    },
  ]);
  var min = 1;
  var max = 100;
  const handleClose = () => {
    setOpen2(false);
  };
  const handelPays = () => {
    // setdataCart(data)
    min = Math.ceil(min);
    max = Math.floor(max);
    let random = Math.floor(Math.random() * (max - min) + min);
    // console.log('[Random]', random);
    let randomst = random.toString();
    // let randomship = parseInt(randomst.concat(zero))
    console.log(dataCart);
    dispatch(
      actions.getAddPay.getAddPayRequest({
        data,
        nameUser: "Bùi Văn Hải",
        address: "Thị trấn Ea Kar, Ea Kar, Đắk Lắk",
        phoneNumber: 84905190166,
        tongThanhToan: data.price,
        ship: String(randomst).replace(/\B(?=(\d{3})+(?!\d))/g, "."),
        type: "1",
        specificaddress: "Khối 4",
        id_Account: "61a59db5f3c3df3ba061be4d",
      })
    );
    dispatch(
      actions.getAddNotifition.getAddNotifitionRequest({
        title: "Đặt hàng thành công",
        body: "Mã đơn hàng của bạn là " + "61ae24a97c5a2a08d87d7c1c",
        id_hoadon: "61ae24a97c5a2a08d87d7c1c",
        id_Account: "61a59db5f3c3df3ba061be4d",
      })
    );
    setOpen2(false);
    alert("Thanh toán thành công <3 admin sẽ sử lý đơn hàng của bạn ngay");
  };
  console.log(url);
  function getData(val) {
    setPayInput(val.target.value);
  }
  function minus(val) {
    if (payInput > 1) {
      setPayInput(payInput - 1);
      console.log(payInput);
    }
  }
  function add(val) {
    setPayInput(payInput + 1);
    console.log(payInput);
  }
  React.useEffect(() => {
    dispatch(
      actions.getSanPhamsPage.getSanPhamsPageRequest({ pagenumber: page })
    );
  }, [dispatch]);
  //Mãng rổng để không lỗi khi lấy lần đầu
  React.useEffect(() => {
    setData(
      sanPham.find(function (element) {
        return element._id === id;
      })
    );
    setDataOder(sanPham);
    try {
      setimg(
        sanPham.find(function (element) {
          return element._id === id;
        }).img
      );
    } catch (error) {}
  }, [sanPham]);

  const addCart = () => {
    if (data.flashSale == 0) {
      dispatch(
        actions.getAddCart.getAddCartRequest({
          id_Account: getIDAccount,
          tenSanPham: data.name,
          _id: data._id,
          giaSanPham: data.price,
          soLuong: parseInt(payInput),
          tongGiaBan: data.priceSale * parseInt(payInput),
          img: data.img[0].image,
          typeProduct: data.type,
          flashSale: data.flashSale,
          price: data.price,
          priceSale: data.priceSale,
        })
      );
      dispatch(actions.getCountCart.getCountCartRequest(getIDAccount));
    } else {
      dispatch(
        actions.getAddCart.getAddCartRequest({
          id_Account: getIDAccount,
          tenSanPham: data.name,
          _id: data._id,
          giaSanPham: data.priceSale,
          soLuong: parseInt(payInput),
          tongGiaBan: data.priceSale * parseInt(payInput),
          img: data.img[0].image,
          typeProduct: data.type,
          flashSale: data.flashSale,
          price: data.price,
          priceSale: data.priceSale,
        })
      );
      dispatch(actions.getCountCart.getCountCartRequest(getIDAccount));
    }
  };
  const captionStyle = {
    fontSize: "2em",
    fontWeight: "bold",
  };
  const slideNumberStyle = {
    fontSize: "20px",
    fontWeight: "bold",
  };
  const thumbnail = {
    display: "flex",
    margintop: "10px",
    alignitems: "center",
    overflow: "scroll",
  };
  const convertPrice = (e) => {
    return String(e).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const initFacebookSDK = () => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID,
        cookie: true, // enable cookies to allow the server to access
        // the session
        xfbml: true, // parse social plugins on this page
        version: "v2.5", // use version 2.1
      });
    };
    // Load the SDK asynchronously
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = `//connect.facebook.net/vi_VN/sdk.js`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  };
  React.useEffect(() => {
    initFacebookSDK();
  });

  const handleCloseAlert = () => {
    setOpenAlert(true);
    window.setTimeout(() => {
      dispatch(actions.getCountCart.getCountCartRequest(getIDAccount));
      setOpenAlert(false);
    }, 1500);
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
        open={openAlert}
        onClose={() => setOpenAlert(false)}
      >
        <Fade in={openAlert}>
          <Box sx={style}>
            <img src="./ok.png" />
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Sản phẩm đã được thêm vào giỏ hàng
            </Typography>
          </Box>
        </Fade>
      </Modal>
      <Dialog
        open={open2}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Địa chỉ mới?"}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description"> */}
          {/* {location.tenSanPham} */}
          {/* </DialogContentText> */}
          <div style={{ display: "flex" }}>
            <TextField
              style={{ width: "100%", marginTop: 10 }}
              id="outlined-basic"
              label="Tên người dùng"
              variant="outlined"
              value={tenNguoiDung}
              onChange={(val) => setTenNguoiDung(val.target.value)}
              // onFocus={onfocusName}
            />
            <div style={{ width: "5px" }} />
            <TextField
              style={{ width: "100%", marginTop: 10 }}
              id="outlined-basic"
              label="Số điện thoại"
              variant="outlined"
              value={sdt}
              onChange={(val) => setSDT(val.target.value)}
              // onFocus={onfocusSDT}
            />
          </div>
          <div style={{ display: "flex" }}>
            <TextField
              style={{ width: "100%", marginTop: 10 }}
              id="outlined-basic"
              label="Tỉnh"
              variant="outlined"
              value={tinhTP}
              onChange={(val) => setTinhTp(val.target.value)}
              // onFocus={onfocusSDT}
            />
            <div style={{ width: "5px" }} />
            <TextField
              style={{ width: "100%", marginTop: 10 }}
              id="outlined-basic"
              label="Huyện"
              variant="outlined"
              value={quanHuyen}
              onChange={(val) => setQuanHuyen(val.target.value)}
              // onFocus={onfocusSDT}
            />
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ marginTop: "10px" }}>
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="Địa chỉ cụ thể"
                variant="outlined"
                value={diaChiCuThe}
                onChange={(val) => setDiaChiCuThe(val.target.value)}
                // onFocus={onfocusAdress}
              />
              {/* {focusInputAddress ? null : (
                                <div
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: 10,
                                        color: "red",
                                    }}
                                >
                                    Không được để trống!
                                </div>
                            )} */}
            </div>
            <div style={{ width: "5px" }} />

            <TextField
              style={{ width: "50%", marginTop: 10 }}
              id="outlined-basic"
              label="Xã"
              variant="outlined"
              value={xaPhuong}
              onChange={(val) => setXaPhuong(val.target.value)}
              // onFocus={onfocusSDT}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Không</Button>
          <Button onClick={handelPays}>Đồng ý</Button>
        </DialogActions>
      </Dialog>
      <div id="fb-root"></div>
      <script
        async
        defer
        crossorigin="anonymous"
        src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v12.0&appId=721913305439216&autoLogAppEvents=1"
        nonce="PO4PuNUn"
      ></script>
      {data != undefined ? (
        <div className="prodil-body">
          <div className="prdil-wrapper">
            <div className="product-content">
              <div class="pdleft-column">
                <div style={{ textAlign: "center" }}>
                  <div>
                    <Carousel
                      data={img}
                      time={9000}
                      width="850px"
                      height="400px"
                      captionStyle={captionStyle}
                      radius="10px"
                      slideNumber={true}
                      slideNumberStyle={slideNumberStyle}
                      captionPosition="bottom"
                      automatic={true}
                      dots={true}
                      pauseIconColor="white"
                      pauseIconSize="40px"
                      slideBackgroundColor="darkgrey"
                      slideImageFit="cover"
                      thumbnails={true}
                      thumbnailWidth="100px"
                      style={{
                        textAlign: "center",
                        maxWidth: "850px",
                        maxHeight: "500px",
                        margin: "40px auto",
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* ----------------------------------------------------- */}
              <div className="pdright-column">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "0 10px 0 10px",
                  }}
                >
                  <div className="titleh1">
                    <h1>{data.name}</h1>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "5px",
                    }}
                  >
                    <div
                      style={{
                        paddingRight: "15px",
                      }}
                    >
                      <a
                        style={{
                          textDecorationLine: "underline",
                          color: "orange",
                          marginRight: "3px",
                        }}
                      >
                        5.0
                      </a>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                    </div>
                    <div
                      style={{
                        borderLeft: "1px solid rgba(0,0,0,.14)",
                        paddingLeft: "15px",
                        color: "rgb(128 128 128)",
                      }}
                    >
                      <a>Đã bán {data.sold} sản phẩm</a>
                    </div>
                  </div>
                  <hr />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      backgroundColor: "rgb(242, 254, 255)",
                    }}
                  >
                    {data.flashSale == 0 ? (
                      <h3
                        style={{
                          height: "50px",
                          display: "flex",
                          alignItems: "center",
                          paddingLeft: "10px",
                          fontSize: "24px",
                        }}
                      >
                        {convertPrice(data.price)}đ
                      </h3>
                    ) : (
                      <h3
                        style={{
                          height: "50px",
                          display: "flex",
                          alignItems: "center",
                          paddingLeft: "10px",
                          textDecorationLine: "line-through",
                          fontSize: "18px",
                        }}
                      >
                        {convertPrice(data.price)}đ
                      </h3>
                    )}
                    {data.flashSale == 1 ? (
                      <h3
                        style={{
                          height: "50px",
                          display: "flex",
                          alignItems: "center",
                          paddingLeft: "10px",
                          color: "red",
                          fontSize: "24px",
                        }}
                      >
                        {convertPrice(data.priceSale)}đ
                      </h3>
                    ) : null}
                  </div>
                  <hr />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-start",
                      color: "rgb(128 128 128)",
                    }}
                  >
                    <h5
                      style={{
                        width: "100px",
                      }}
                    >
                      Địa chỉ:
                    </h5>
                    <img
                      style={{ width: "30px", margin: "0 10px 0 0" }}
                      src="./transit.png"
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        color: "rgb(128 128 128)",
                      }}
                    >
                      <h5 style={{ fontSize: "16px" }}>
                        {" "}
                        Đơn hàng của bạn sẽ được giao tới{" "}
                      </h5>
                      <h5 style={{ fontSize: "16px" }}>
                        {" "}
                        Đơn hàng của bạn sẽ được giao tới{" "}
                      </h5>
                    </div>
                  </div>
                  <br />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      color: "rgb(128 128 128)",
                    }}
                  >
                    <h5
                      style={{
                        width: "100px",
                      }}
                    >
                      Số lượng:
                    </h5>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        height: "70px",
                      }}
                    >
                      <Button
                        style={{
                          width: "25px",
                          minWidth: "20px",
                          height: "25px",
                          minHeight: "25px",
                          backgroundColor: "rgba(242, 254, 255, 0.5)",
                          borderRadius: "12.5px",
                          border: "1px solid rgba(15, 127, 138, 0.3)",
                          padding: 0,
                        }}
                        onClick={minus}
                      >
                        <AiOutlineMinusCircle color="#009387" size={15} />
                      </Button>
                      <input
                        min={1}
                        value={payInput}
                        onChange={getData}
                        type="number"
                      />
                      <Button
                        style={{
                          width: "25px",
                          minWidth: "20px",
                          height: "25px",
                          minHeight: "25px",
                          backgroundColor: "rgba(242, 254, 255, 0.5)",
                          borderRadius: "12.5px",
                          border: "1px solid rgba(15, 127, 138, 0.3)",
                          padding: 0,
                        }}
                        onClick={add}
                      >
                        <AiOutlinePlusCircle color="#009387" size={15} />
                      </Button>
                    </div>
                    <h5
                      style={{
                        paddingLeft: "10px",
                        fontSize: "14px",
                      }}
                    >
                      Kho còn {data.tongKho} sản phẩm.
                    </h5>
                  </div>
                </div>
                <br />
                <br />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <button
                    style={{ margin: "0 10px 0 10px" }}
                    onClick={() => {
                      if (data.flashSale == 0) {
                        setSale(data.price);
                        handleCloseAlert();
                        addCart();
                      } else if (data.flashSale == 1) {
                        setSale(data.pricesale);
                        handleCloseAlert();
                        addCart();
                      }
                    }}
                  >
                    <a style={{ textDecoration: "none", color: "white" }}>
                      Thêm vào giỏ hàng
                    </a>
                  </button>
                  <button
                    style={{
                      margin: "0 10px 0 10px",
                      border: "1px solid #009387",
                      backgroundColor: "white",
                    }}
                    onClick={() => {
                      setOpen2(true);
                    }}
                  >
                    <a style={{ textDecoration: "none", color: "#009387" }}>
                      Mua ngay
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="prdil-wrapper">
            <div className="more-prdil">
              <div className="md-title">
                <span>Mô tả sản phẩm</span>
              </div>
              <div className="md-details">
                <p>{data.details}</p>
              </div>
            </div>
          </div>
          <div className="prdil-wrapper" style={{ height: "100% " }}>
            <div
              class="fb-comments"
              data-href="https://unitop.vn/"
              data-width="1200"
              data-numposts="5"
            ></div>
          </div>
          <div className="prdil-wrapper">
            <div className="related-product">
              <div className="rp-title" style={{ backgroundColor: "#009387" }}>
                <div
                  className="rph2"
                  style={{
                    fontWeight: "bold",
                    fontSize: "24px",
                    padding: "10px 0px",
                    width: "100%",
                  }}
                >
                  Sản phẩm khác
                </div>
              </div>
              <div className="fireman">
                <div className="rp-row">
                  {dataOder.slice(0, 4).map((e) => (
                    <Link
                      style={{
                        width: "24%",
                        marginLeft: "10px",
                        textDecoration: "none",
                      }}
                      to={{
                        pathname: `/chitietsanpham&id=${e._id}&page=${page}`,
                      }}
                    >
                      {console.log("xem thêm", e)}
                      <div className="rp-column ">
                        <div
                          className="rpimg-product"
                          style={{ width: "100%", height: "100%" }}
                        >
                          <img src={e.img[1].image} />
                        </div>

                        <div className="rp-cart-text">
                          <div
                            style={{
                              whiteSpace: "nowrap",
                              width: "100%",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              color: "black",
                              fontWeight: "bold",
                              fontSize: 14,
                            }}
                          >
                            {e.name}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              marginTop: "5px",
                            }}
                          >
                            {e.flashSale == 0 ? (
                              <p
                                style={{
                                  fontSize: "15px",
                                  padding: "5px 0",
                                  color: "black",
                                  color: "red",
                                  fontWeight: "bold",
                                }}
                              >
                                Giá: {convertPrice(e.price)} ₫
                              </p>
                            ) : (
                              <p
                                style={{
                                  fontSize: "15px",
                                  padding: "5px 0",
                                  color: "red",
                                  fontWeight: "bold",
                                }}
                              >
                                Giá:
                                <li
                                  style={{
                                    color: "gray",
                                    textDecorationLine: "line-through",
                                    textDecorationColor: "black ",
                                    display: "inline-block",
                                  }}
                                >
                                  {convertPrice(e.price)} ₫
                                </li>
                              </p>
                            )}

                            {e.flashSale == 1 ? (
                              <p
                                style={{
                                  fontSize: "15px",
                                  padding: "5px 0",
                                  color: "red",
                                  textDecorationLine: "none",
                                  fontWeight: "bold",
                                  marginLeft: "10px",
                                }}
                              >
                                {convertPrice(e.priceSale)} ₫
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <Footer />
    </>
  );
};
export default Chitietsanpham;
