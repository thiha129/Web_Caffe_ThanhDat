import React from "react";
import { Link } from "react-router-dom";

import "../css/Danhsachsanpham.css";
import { useState } from "react";
import * as actions from "../redux/actions";
import Button from "@mui/material/Button";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { cartData$, sanPhamState$, _idAccount$ } from "../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import Alert from "./controls/Alert";
import Modal from "@mui/material/Modal";
import { Box, ClickAwayListener, Fade, Typography } from "@material-ui/core";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { el } from "date-fns/locale";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "3px solid red",
  boxShadow: 24,
  p: 4,
  display: "flex",
  borderRadius: "30px",
  flexDirection: "column",
};
function Danhsachsanpham({ danhsachsanpham, page }) {
  const dispatch = useDispatch();
  const getIDAccount = useSelector(_idAccount$);
  console.log("getIdAccount", getIDAccount);
  const sanPham = useSelector(sanPhamState$);
  const [payInput, setPayInput] = useState("1");
  const [openModal, setOpenModal] = useState(false);

  const [open, setOpen] = useState(false);
  const handleCloseAlert = () => {
    setOpen(true);
    dispatch(actions.getCountCart.getCountCartRequest(getIDAccount));
    window.setTimeout(() => {
      dispatch(actions.getCountCart.getCountCartRequest(getIDAccount));
      setOpen(false);
    }, 1500);
  };
  //popup
  const [open1, setOpen1] = React.useState(false);
  const handleClickOpen = () => {};
  const handleClose = () => {
    setOpen1(false);
  };
  const Click = () => {
    if (getIDAccount !== "") {
      _AddCart();
    } else {
      setOpen1(true);
    }
  };

  const _AddCart = () => {
    console.log("[_AddCart]", parseInt(payInput) != 0 ? parseInt(payInput) : 0);
    if (parseInt(payInput) > 0 && parseInt(payInput) < 15) {
      if (danhsachsanpham.flashSale == 0) {
        handleCloseAlert();
        dispatch(
          actions.getAddCart.getAddCartRequest({
            id_Account: getIDAccount,
            tenSanPham: danhsachsanpham.name,
            _id: danhsachsanpham._id,
            giaSanPham: danhsachsanpham.price,
            soLuong: parseInt(payInput) != 0 ? parseInt(payInput) : 0,
            tongGiaBan: danhsachsanpham.price * parseInt(payInput),
            img: danhsachsanpham.img[0].image,
            typeProduct: danhsachsanpham.type,
            flashSale: danhsachsanpham.flashSale,
            price: danhsachsanpham.price,
            priceSale: 0,
          })
        );
      } else {
        handleCloseAlert();
        dispatch(
          actions.getAddCart.getAddCartRequest({
            id_Account: getIDAccount,
            tenSanPham: danhsachsanpham.name,
            _id: danhsachsanpham._id,
            giaSanPham: danhsachsanpham.priceSale,
            soLuong: parseInt(payInput) != 0 ? parseInt(payInput) : 0,
            tongGiaBan: danhsachsanpham.priceSale * parseInt(payInput),
            img: danhsachsanpham.img[0].image,
            typeProduct: danhsachsanpham.type,
            flashSale: danhsachsanpham.flashSale,
            price: danhsachsanpham.price,
            priceSale: danhsachsanpham.priceSale,
          })
        );
      }
    } else {
      setOpenModal(true);
    }
  };

  const convertPrice = (e) => {
    return String(e).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const onClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div
        class="boxsanpham1"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,1)), url('./backGroundDangKy.png')",
        }}
      >
        <Link
          onClick={() =>
            window.location.replace(
              `/chitietsanpham&id=${danhsachsanpham._id}&page=${page}`
            )
          }
          style={{ textDecoration: "none", color: "black" }}
        >
          {danhsachsanpham.flashSale == 1 ? (
            <img
              src="./saleSP.png"
              style={{
                position: "absolute",
                zIndex: "1",
                width: "60px",
                top: "10px",
                marginLeft: "10px",
              }}
            />
          ) : null}
          <div class="imagesanpham1">
            <img src={danhsachsanpham.img[0].image}></img>
          </div>
          <div class="infosanpham1">
            <div
              style={{
                minHeight: "50px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h3>{danhsachsanpham.name}</h3>
            </div>
            <div class="subInfosanpham1">
              <strong class="pricesanpham1">
                Giá:{" "}
                {danhsachsanpham.flashSale == 0 ? (
                  convertPrice(danhsachsanpham.price) + "₫"
                ) : (
                  <span>{convertPrice(danhsachsanpham.price)} ₫</span>
                )}
                {danhsachsanpham.flashSale == 1
                  ? convertPrice(danhsachsanpham.priceSale) + "₫"
                  : null}
              </strong>
              <div class="starssanpham1">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>
            </div>
          </div>
        </Link>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "-webkit-fill-available",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <h3
            style={{
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
            }}
          >
            Đã bán: {danhsachsanpham.sold}
          </h3>
          <div
            style={{
              width: "auto",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() =>
                parseInt(payInput) > 1
                  ? setPayInput(parseInt(payInput) - 1)
                  : null
              }
              style={{
                width: "10px",
                minWidth: "25px",
                minHeight: "25px",
                borderRadius: "12.5px",
              }}
            >
              <AiOutlineMinusCircle />
            </Button>
            <input
              defaultValue={1}
              value={payInput}
              onChange={(e) => setPayInput(e.target.value)}
              min={1}
              max={10}
              step={1}
              style={{
                width: "50%",
                border: "2px solid transparent",
                textAlign: "center",
                WebkitAppearance: "none",
              }}
              type="number"
            />
            <Button
              onClick={() =>
                parseInt(payInput) < 15
                  ? setPayInput(parseInt(payInput) + 1)
                  : setOpenModal(true)
              }
              style={{
                width: "10px",
                minWidth: "25px",
                minHeight: "25px",
                borderRadius: "12.5px",
              }}
            >
              <AiOutlinePlusCircle />
            </Button>
          </div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            closeAfterTransition
            BackdropProps={{
              timeout: 500,
            }}
            open={openModal}
            onClose={onClose}
          >
            <Fade in={openModal}>
              <Box sx={style}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "-webkit-fill-available",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignContent: "center",
                  }}
                >
                  <img style={{ width: 70 }} src="./saleSi.png" />
                  <Typography
                    style={{
                      fontWeight: "bold",
                      color: "red",
                    }}
                    id="transition-modal-title"
                    variant="h5"
                    component="h5"
                  >
                    MUA SỈ GIÁ ƯU ĐÃI!!!!
                  </Typography>
                  <img style={{ width: 70 }} src="./saleSi.png" />
                </div>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Bạn muốn mua sỉ sản phầm này?
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "-webkit-fill-available",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography
                    id="transition-modal-title"
                    variant="h7"
                    component="h7"
                  >
                    Vui lòng liên hệ với chúng tôi qua:
                  </Typography>
                  <Typography
                    id="transition-modal-title"
                    variant="h7"
                    component="h7"
                  >
                    SĐT: 0905.190.166
                  </Typography>
                  <Typography
                    id="transition-modal-title"
                    variant="h7"
                    component="h7"
                  >
                    Fanpage:{" "}
                    <a href="https://www.facebook.com/Ca%CC%80-phe%CC%82-Tha%CC%80nh-%C4%90a%CC%A3t-BMT-111574381364265/?ref=pages_you_manage">
                      Cà phê Thành Đạt BMT
                    </a>
                  </Typography>
                </div>
              </Box>
            </Fade>
          </Modal>
          <div class="overlaysanpham1">
            <Button
              onClick={() => Click()}
              style={{
                width: "20px",
                height: "40px",
                borderRadius: "20px",
                backgroundColor: "transparent",
              }}
            >
              <img
                style={{
                  width: "60px",
                  padding: "5px",
                  borderRadius: "5px",
                }}
                src="./addCart.png"
                class="fas fa-shopping-cart"
              />
            </Button>
            <Dialog open={open1} onClose={handleClose}>
              <DialogTitle style={{ fontSize: "20px", fontWeight: "bold" }}>
                Thông báo!!!
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  style={{ color: "red" }}
                  onClick={() => window.location.replace("/dangnhap")}
                >
                  Đăng nhập
                </Button>
                <Button onClick={() => handleClose()}>Đóng</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
        <Alert
          open={open}
          onClose={() => setOpen(false)}
          title="Đơn hàng đã được thêm vào giỏ hàng!"
        />
      </div>
    </>
  );
}

export default Danhsachsanpham;
