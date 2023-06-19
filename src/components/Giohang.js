import React from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import "../css/Giohang.css";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../redux/actions";
import {
  cartData$,
  sanPhamState$,
  checkPay$,
  checkCart$,
  sumCart$,
  dataAccount$,
} from "../redux/selectors";
import { useState } from "react";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import Button from "@mui/material/Button";
import Cards from "./Cards";
import MultiItemCrousel from "./MultiItemCrousel";
import { _idAccount$, isLoadingCart$ } from "../redux/selectors";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

import Alert from "./controls/Alert";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//địa chỉ
const tinh_tp = require("./datapicker/tinh_tp.json");
const quan_huyen = require("./datapicker/quan_huyen.json");
const xa_phuong = require("./datapicker/xa_phuong.json");
const CartScreen = () => {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [number, setNumber] = React.useState(0);
  const dispatch = useDispatch();
  const dataCart = useSelector(cartData$);
  const [isCheckedDel, setIsCheckedDel] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [list, updateList] = useState(dataCart);
  const [tongChiPhi, setTongChiPhi] = React.useState("");
  const getIDAccount = useSelector(_idAccount$);

  const [isCheckedPay, setIsCheckedPay] = React.useState(false);
  const checkPayment = useSelector(checkPay$);
  const sumCart = useSelector(sumCart$);
  const checkCart = useSelector(checkCart$);
  const dataAccount = useSelector(dataAccount$);
  const isLoadingCart = useSelector(isLoadingCart$);
  const [isLoading, setIsLoading] = useState(true);
  const [tenNguoiDung, setTenNguoiDung] = React.useState("Bùi Văn Hải");
  const [sdt, setSDT] = React.useState("84905190166");
  const [xaPhuong, setXaPhuong] = React.useState("Thị trấn Ea Kar");
  const [quanHuyen, setQuanHuyen] = React.useState("Ea Kar");
  const [tinhTP, setTinhTp] = React.useState("Đắk Lắk");
  const [diaChiCuThe, setDiaChiCuThe] = React.useState("Khối 4");

  const [location, setLocation] = useState({
    codeCountries: "VN",
    dataCities: [],
    dataCounties: [],
    dataWards: [],
  });
  const GetSortOrder = (prop) => {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    };
  };
  location.dataCities.sort(GetSortOrder("name"));
  location.dataCounties.sort(GetSortOrder("name"));
  location.dataWards.sort(GetSortOrder("name"));

  React.useEffect(() => {
    dispatch(action.getCountCart.getCountCartRequest(getIDAccount));
    setData(dataCart);
    console.log("[Thanh_Toan]", 1);
  }, [dispatch, checkCart, isCheckedDel, isCheckedPay]);

  React.useEffect(() => {
    setData(dataCart);
    console.log("[Thanh_Toan]", 2);
  }, [dataCart]);

  const delItem = (a) => {
    setIsCheckedDel(!isCheckedDel);
    dispatch(
      action.deleteCart.deleteCartRequest({
        _id: a._id,
      })
    );
    dispatch(action.getCountCart.getCountCartRequest(getIDAccount));
  };
  const minusItem = (a) => {
    dispatch(
      action.updateCountCart.updateCountCartRequest({
        _id: a._id,
        giaSanPham: a.giaSanPham,
        soLuong: a.soLuong - 1,
      })
    );
    dispatch(action.getCountCart.getCountCartRequest(getIDAccount));
  };
  const addItem = (a) => {
    dispatch(
      action.updateCountCart.updateCountCartRequest({
        _id: a._id,
        giaSanPham: a.giaSanPham,
        soLuong: a.soLuong + 1,
      })
    );
    dispatch(action.getCountCart.getCountCartRequest(getIDAccount));
  };
  const handleClose = () => {
    setOpen(false);
    setOpen2(false);
  };

  const handleAgreeClose = (item) => {
    setIsCheckedDel(true);
    console.log(number);
    dispatch(
      action.deleteCart.deleteCartRequest(
        {
          _id: number,
        },
        [dispatch]
      )
    );
    setOpen(false);
  };

  const convertPrice = (e) => {
    return String(e).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Bạn có muốn xóa sản phẩm này?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {/* {location.tenSanPham} */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Không</Button>
          <Button onClick={handleAgreeClose}>Đồng ý</Button>
        </DialogActions>
      </Dialog>

      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,1)), url('./backGroundDangKy.png')",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          alignContent: "center",
        }}
      >
        <div
          style={{
            width: "1200px",
            height: "auto",
            margin: "50px 0 50px 0",
          }}
        >
          <div className="cart-inner">
            <div className="left_cart ccart">
              <div className="cart-inner">
                <div className="cart_col">
                  <h4>
                    <b>Giỏ hàng</b>
                  </h4>
                </div>
                <div className="ctext-muted">{dataCart.length} sản phẩm</div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "flex-end",
                  marginTop: "20px",
                }}
              >
                <a
                  style={{
                    width: "30%",
                    textAlign: "left",
                    borderRight: "1px solid gray",
                  }}
                >
                  Sản phẩm
                </a>
                <a
                  style={{
                    width: "15%",
                    textAlign: "center",
                    borderRight: "1px solid gray",
                  }}
                >
                  Loại
                </a>

                <a
                  style={{
                    width: "15%",
                    textAlign: "center",
                    borderRight: "1px solid gray",
                  }}
                >
                  Đơn giá
                </a>
                <a
                  style={{
                    width: "15%",
                    textAlign: "center",
                    borderRight: "1px solid gray",
                  }}
                >
                  Số lượng
                </a>
                <a
                  style={{
                    width: "15%",
                    textAlign: "center",
                    borderRight: "1px solid gray",
                  }}
                >
                  Tổng giá
                </a>
                <a
                  style={{
                    width: "10%",
                    textAlign: "center",
                  }}
                >
                  Thao tác
                </a>
              </div>
              {data.length == 0 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "50px",
                  }}
                >
                  <Link
                    to="/sanpham"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Button
                      variant="outlined"
                      style={{
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      <span>Tiếp tục mua hàng</span>
                    </Button>
                  </Link>
                </div>
              ) : (
                data.map((item) => (
                  <div className="cart-inner crow-border">
                    <div className="cart-inner cmain crow-items">
                      <div className="cart_col2" style={{ width: "10%" }}>
                        <img class="img-fluid" src={item.img} />
                      </div>
                      <div
                        style={{
                          width: "15%",
                          margin: "2.5%",
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "center",
                        }}
                        className="cart_col"
                      >
                        <div
                          style={{ textAlign: "center" }}
                          className="cart-inner"
                        >
                          {item.tenSanPham}
                        </div>
                      </div>
                      <div
                        style={{
                          width: "15%",
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "center",
                        }}
                        className="cart_col"
                      >
                        <div
                          style={{ textAlign: "center" }}
                          className="cart-inner"
                        >
                          {item.typeProduct}
                        </div>
                      </div>
                      {item.flashSale == 0 ? (
                        <div
                          style={{
                            width: "15%",
                            alignItems: "center",
                            display: "flex",
                            justifyContent: "center",
                          }}
                          className="cart_col"
                        >
                          <div
                            style={{ textAlign: "center" }}
                            className="cart-inner"
                          >
                            {convertPrice(item.price)} đ
                          </div>
                        </div>
                      ) : (
                        <div
                          style={{
                            width: "15%",
                            alignItems: "center",
                            display: "flex",
                            justifyContent: "center",
                          }}
                          className="cart_col"
                        >
                          <div
                            style={{ textAlign: "center" }}
                            className="cart-inner"
                          >
                            {convertPrice(item.priceSale)} đ
                          </div>
                        </div>
                      )}

                      <div
                        style={{ width: "15%", textAlign: "center" }}
                        className="cart_col"
                      >
                        <Button
                          style={{
                            width: "10px",
                            minWidth: "35px",
                            minHeight: "35px",
                            borderRadius: "12.5px",
                          }}
                          onClick={() => {
                            if (item.soLuong < 2) {
                              setOpen(true);
                              setNumber(item._id);
                            } else {
                              minusItem(item);
                            }
                          }}
                        >
                          <AiOutlineMinusCircle />
                        </Button>
                        <a style={{ fontSize: "15px" }} href="#" class="border">
                          {item.soLuong}
                        </a>
                        <Button
                          style={{
                            width: "10px",
                            minWidth: "35px",
                            minHeight: "35px",
                            borderRadius: "12.5px",
                          }}
                          onClick={() => {
                            addItem(item);
                          }}
                        >
                          <AiOutlinePlusCircle />
                        </Button>
                      </div>
                      <div
                        style={{ width: "15%", textAlign: "center" }}
                        className="cart_col"
                      >
                        {convertPrice(item.soLuong * item.giaSanPham)} đ
                      </div>
                      <Button
                        style={{
                          width: "10%",
                          textAlign: "center",
                          backgroundColor: "transparent",
                          border: "1px solid transparent",
                        }}
                        class="closec"
                        onClick={() => {
                          delItem(item);
                        }}
                      >
                        <a
                          style={{
                            color: "black",
                            fontWeight: "bold",
                            fontSize: "14px",
                          }}
                        >
                          Xóa
                        </a>
                      </Button>
                    </div>
                  </div>
                ))
              )}
              {data.length == 0 ? null : (
                <div className="totals-rows">
                  <div className="back-to-shop">
                    <Link
                      to="/sanpham"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div class="back-to-shop" style={{ minWidth: "200px" }}>
                        <a>← </a>
                        <span class="text-muted">Quay lại cửa hàng</span>
                      </div>
                    </Link>
                  </div>
                  <div className="pay_form">
                    <div className="r_pay">
                      <div className="pay_text">
                        <div className="payt_items">
                          Tổng thanh toán(
                          <a style={{ color: "#009387" }}>{data.length}</a> sản
                          phẩm):
                        </div>
                        <div className="payt_totals">
                          {" "}
                          {convertPrice(sumCart)} đồng
                        </div>
                        <button
                          className="pay_btn"
                          onClick={() => {
                            setIsCheckedPay(!isCheckedPay);
                            dispatch(
                              action.getAddPay.getAddPayRequest({
                                data: data,
                                nameUser: dataAccount.nameUser,
                                address: dataAccount.address,
                                phoneNumber: dataAccount.phoneNumber,
                                tongThanhToan: sumCart,
                                ship: 0,
                                type: "1",
                                specificaddress: dataAccount.specificaddress,
                                id_Account: getIDAccount,
                              })
                            );
                            dispatch(
                              action.getCountCart.getCountCartRequest(
                                getIDAccount
                              )
                            );
                          }}
                        >
                          <span>Thanh toán</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="left_cart cart" style={{ marginTop: "20px" }}>
              <MultiItemCrousel />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default CartScreen;
