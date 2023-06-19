import React from "react";
import { useState, useEffect } from "react";
import "../css/ProfileScreen1.css";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";
import {
  dataAccount$,
  dataSelectXacNhan$,
  dataSelectDaXacNhan$,
  dataSelectDangGiao$,
  dataSelectDaGiao$,
  dataSelectDaHuy$,
  notiState$,
} from "../redux/selectors";

//box tab
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
//đơn hàng
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
// open popup
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
//datapicker

import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

import "react-datepicker/dist/react-datepicker.css";
import FileBase64 from "react-file-base64";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
// import { Alert, getTypographyUtilityClass, TextField } from "@mui/material";

import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import { set } from "date-fns";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

//địa chỉ
const tinh_tp = require("./datapicker/tinh_tp.json");
const quan_huyen = require("./datapicker/quan_huyen.json");
const xa_phuong = require("./datapicker/xa_phuong.json");

const formatDate = (value) => {
  var date = new Date(value);
  var d;
  var m;
  var minus;
  var h;

  parseInt(date.getMinutes()) < 10
    ? (minus = "0" + date.getMinutes())
    : (minus = date.getMinutes());
  parseInt(date.getHours()) < 10
    ? (h = "0" + date.getHours())
    : (h = date.getHours());

  parseInt(date.getDate()) < 10
    ? (d = "0" + date.getDate())
    : (d = date.getDate());
  parseInt(date.getMonth()) < 9
    ? (m = "0" + (date.getMonth() + 1))
    : (m = date.getMonth() + 1);

  return (
    <a>
      {value
        ? d + "-" + m + "-" + date.getFullYear() + " " + h + "h:" + minus + "'"
        : ""}
    </a>
  );
};

const ItemSucces = ({ props }) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (index) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const convertString = (value) => {
    return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
  };
  return (
    <div>
      <div>
        <div
          style={{
            width: "400px",
            fontWeight: "bold",
          }}
        >
          Mã đơn hàng: {props.maDonHang}
        </div>
        {props.product.map((index) => (
          <div
            style={{
              margin: "10px 0px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <img
                style={{ width: 100, height: 100, border: "1px solid gray" }}
                src={index.img}
              ></img>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "100px",
                  height: "auto",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    marginLeft: "5px",
                  }}
                >
                  {index.tenSanPham}
                </div>
                {index.flashSale == 0 ? (
                  <div
                    style={{
                      fontSize: "14px",
                      marginLeft: "5px",
                    }}
                  >
                    Giá: {convertString(index.price)}
                  </div>
                ) : (
                  <div
                    style={{
                      fontSize: "14px",
                      marginLeft: "5px",
                    }}
                  >
                    Giá sale: {convertString(index.priceSale)}
                  </div>
                )}
                <div
                  style={{
                    fontSize: "14px",
                    marginLeft: "5px",
                  }}
                >
                  Số lượng: {index.soLuong}
                </div>
              </div>
            </div>
            <Button
              variant="outlined"
              color="success"
              size="small"
              onClick={() =>
                window.location.replace(
                  `/chitietsanpham&id=${index.id_SanPham}&page=0`
                )
              }
            >
              Xem sản phẩm
            </Button>
          </div>
        ))}
        <div
          style={{
            marginTop: "5px",
            color: "#000",
            fontSize: "12px",
            width: "400px",
          }}
        >
          Giờ đặt: {formatDate(props.createdAt)}
        </div>

        <div
          style={{
            marginTop: "5px",
            color: "#000",
            fontSize: "12px",
            width: "400px",
          }}
        >
          Tổng giá sản phẩm:
          <a
            style={{
              color: "red",
              fontWeight: "bold",
              padding: "0 5px",
            }}
          >
            {convertString(props.tongThanhToan)}
          </a>
        </div>
        <div
          style={{
            marginTop: "5px",
            color: "#000",
            fontSize: "12px",
            width: "400px",
          }}
        >
          Phí vận chuyển:
          <a
            style={{
              color: "red",
              fontWeight: "bold",
              padding: "0 5px",
            }}
          >
            {convertString(props.ship)}
          </a>
          (Nhân viên gọi xác nhận)
        </div>
        <div
          style={{
            marginTop: "5px",
            color: "#000",
            fontSize: "12px",
            width: "400px",
          }}
        >
          Tổng thanh toán (tạm tính):
          <a
            style={{
              color: "red",
              fontWeight: "bold",
              padding: "0 5px",
              fontSize: 16,
            }}
          >
            {convertString(props.tongThanhToan)}
          </a>
        </div>
      </div>
    </div>
  );
};

const Item = ({ props }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [open1, setOpen1] = React.useState(false);
  const handleClickOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };

  const deleteOrder = () => {
    try {
      dispatch(
        actions.getDeleteOderUser.getDeleteOderUserRequest({
          _id: props._id,
          typeOrder: "0",
        })
      );
      window.location.replace("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const convertString = (value) => {
    return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
  };

  return (
    <div>
      <div>
        <div
          style={{
            fontWeight: "bold",
          }}
        >
          Mã đơn hàng: {props.maDonHang}
        </div>
        {props.product.map((index) => (
          <div
            style={{
              margin: "10px 0px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <img
                style={{ width: 100, height: 100, border: "1px solid gray" }}
                src={index.img}
              ></img>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "100px",
                  height: "auto",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    marginLeft: "5px",
                  }}
                >
                  {index.tenSanPham}
                </div>
                {index.flashSale == 0 ? (
                  <div
                    style={{
                      fontSize: "14px",
                      marginLeft: "5px",
                    }}
                  >
                    Giá: {convertString(index.price)}
                  </div>
                ) : (
                  <div
                    style={{
                      fontSize: "14px",
                      marginLeft: "5px",
                    }}
                  >
                    Giá sale: {convertString(index.priceSale)}
                  </div>
                )}
                <div
                  style={{
                    fontSize: "14px",
                    marginLeft: "5px",
                  }}
                >
                  Số lượng: {index.soLuong}
                </div>
              </div>
            </div>
            <Button
              onClick={() =>
                window.location.replace(
                  `/chitietsanpham&id=${index.id_SanPham}&page=0`
                )
              }
              variant="outlined"
              color="success"
              size="small"
            >
              Xem sản phẩm
            </Button>
          </div>
        ))}
        <div
          style={{
            marginTop: "5px",
            color: "#000",
            fontSize: "12px",
          }}
        >
          Giờ đặt: {formatDate(props.createdAt)}
        </div>

        <div
          style={{
            marginTop: "5px",
            color: "#000",
            fontSize: "12px",
          }}
        >
          Tổng giá sản phẩm:
          <a
            style={{
              color: "red",
              fontWeight: "bold",
              padding: "0 5px",
            }}
          >
            {convertString(props.tongThanhToan)}
          </a>
        </div>
        <div
          style={{
            marginTop: "5px",
            color: "#000",
            fontSize: "12px",
            width: "400px",
          }}
        >
          Phí vận chuyển:
          <a
            style={{
              color: "red",
              fontWeight: "bold",
              padding: "0 5px",
            }}
          >
            {convertString(props.ship)}
          </a>
          (Nhân viên gọi xác nhận)
        </div>
        <div
          style={{
            marginTop: "5px",
            color: "#000",
            fontSize: "12px",
          }}
        >
          Tổng thanh toán (tạm tính):
          <a
            style={{
              color: "red",
              fontWeight: "bold",
              padding: "0 5px",
              fontSize: 16,
            }}
          >
            {convertString(props.tongThanhToan)}
          </a>
        </div>
      </div>

      <Button
        style={{
          float: "right",
          margin: "-40px 10px",
        }}
        variant="outlined"
        color="error"
        size="small"
        onClick={handleClickOpen1}
      >
        Hủy đơn
      </Button>
      <Dialog open={open1} onClose={handleClose1}>
        <DialogTitle style={{ fontSize: "20px", fontWeight: "bold" }}>
          Bạn có muốn hủy đơn này không ?
        </DialogTitle>
        <DialogActions>
          <Button onClick={deleteOrder} style={{ color: "red" }}>
            Hủy đơn
          </Button>
          <Button onClick={handleClose1}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

function ProfileScreen1() {
  const [username, setUserName] = React.useState("");
  const [AddressUser, setAddressUser] = React.useState("");

  const { numtoggle } = useParams();

  const [idUser, setidUser] = React.useState("");
  const [tenNguoiDung, setTenNguoiDung] = React.useState("");
  const [sdt, setSDT] = React.useState("");
  const [ngaySinh, setNgaySinh] = React.useState("");
  const [xaPhuong, setXaPhuong] = React.useState("");
  const [quanHuyen, setQuanHuyen] = React.useState("");
  const [tinhTP, setTinhTp] = React.useState("");
  const [diaChiCuThe, setDiaChiCuThe] = React.useState("");

  const [focusInputName, setfocusInputName] = useState(true);
  const [focusSDT, setfocusSDT] = useState(true);
  const [focusInputTinh, setfocusInputTinh] = useState(true);
  const [focusInputHuyen, setfocusInputHuyen] = useState(true);
  const [focusInputXa, setfocusInputXa] = useState(true);
  const [focusInputAddress, setfocusInputAddress] = useState(true);

  const [avatar, setAvatar] = useState("");

  const [data, setData] = useState({
    codeCountries: "VN",
    dataCities: [],
    dataCounties: [],
    dataWards: [],
  });
  //popup

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (index) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
  data.dataCities.sort(GetSortOrder("name"));
  data.dataCounties.sort(GetSortOrder("name"));
  data.dataWards.sort(GetSortOrder("name"));
  const dispatch = useDispatch();
  const dataUser = useSelector(dataAccount$);
  React.useEffect(() => {
    const getData = async () => {
      try {
        const phone = await localStorage.getItem("PhoneNumber");
        const pass = await localStorage.getItem("PassWord");
        if (phone !== null && pass !== null) {
          console.log(phone);
          dispatch(
            actions.getAccountsUserName.getAccountsUserNameRequest({
              phonenumber: phone,
            }),
            actions.getAccount.getAccountRequest({
              phonenumber: phone,
            })
          );
        }
      } catch (error) {}
    };
    return () => getData;
  }, [dispatch]);

  React.useEffect(() => {
    if (dataUser.length != 0) {
      setidUser(dataUser._id);
      //lấy tên người dùng
      setTenNguoiDung(dataUser.nameUser);
      setUserName(dataUser.nameUser);
      // lấy ảnh người dùng
      setAvatar(dataUser.avatar);
      //lấy số điện thoại
      const getSDTUser = dataUser.phoneNumber;
      setSDT("0".concat(getSDTUser.toString().slice(2, 11)));
      setNgaySinh(dataUser.birthDay);
      // lấy địa chỉ cụ thể
      setXaPhuong(dataUser.xa_phuong);
      setQuanHuyen(dataUser.quan_huyen);
      setTinhTp(dataUser.tinh_tp);
      setDiaChiCuThe(dataUser.specificaddress);
      // lấy địa chỉ cụ thể
      setAddressUser(
        dataUser.specificaddress +
          ", " +
          dataUser.xa_phuong +
          ", " +
          dataUser.quan_huyen +
          ", " +
          dataUser.tinh_tp
      );
    } else {
      console.log("====================================");
      console.log("[dataUserERROR]", dataUser.check_Account);
      console.log("====================================");
    }
  }, [dataUser]);
  //get sdt

  // get tinh thanh
  useEffect(() => {
    setData({
      ...data,
      dataCities: Object.values(tinh_tp),
      dataCounties: Object.values(quan_huyen),
      dataWards: Object.values(xa_phuong),
      nameCities: "",
    });
  }, []);

  function renderlistCities() {
    if (data.codeCountries == "VN") {
      return data.dataCities.map((item, key) => (
        <MenuItem label={item.name} value={item.code} key={key}>
          {item.name}
        </MenuItem>
      ));
    }
    return <MenuItem label={"Không có dữ liệu"} value={"noData"} />;
  }

  function renderlistCounties() {
    if (data.codeCountries == "VN") {
      const filteredDataCounties = data.dataCounties.filter((item) => {
        return item.parent_code == tinhTP;
      });
      return filteredDataCounties.map((item, key) => (
        <MenuItem label={item.name} value={item.code} key={key}>
          {item.name}
        </MenuItem>
      ));
    }
    return <MenuItem label={"Không có dữ liệu"} value={"noData"} />;
  }
  function renderlistWards() {
    if (data.codeCountries == "VN") {
      const filteredDataWards = data.dataWards.filter((item) => {
        return item.parent_code == quanHuyen;
      });
      return filteredDataWards.map((item, key) => (
        <MenuItem label={item.name} value={item.name_with_type} key={key}>
          {item.name}
        </MenuItem>
      ));
    }
    return <MenuItem label={"Không có dữ liệu"} value={"noData"} />;
  }
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    if (numtoggle != undefined) {
      setToggleState(parseInt(numtoggle));
    }
    console.log("[toggleState]", toggleState);
  }, []);

  let tempDate = new Date(ngaySinh);
  let fDate =
    tempDate.getDate() +
    "/" +
    (tempDate.getMonth() + 1) +
    "/" +
    tempDate.getFullYear();
  // console.log("ngày sinh", fDate);

  const getUpdateInfor = () => {
    if (
      tenNguoiDung == "" ||
      sdt == "" ||
      ngaySinh == "" ||
      xaPhuong == "" ||
      quanHuyen == "" ||
      tinhTP == "" ||
      diaChiCuThe == ""
    ) {
      if (tenNguoiDung == "") {
        setfocusInputName(false);
      } else if (sdt == "") {
        setfocusSDT(false);
      } else if (tinhTP == "") {
        setfocusInputTinh(false);
      } else if (quanHuyen == "") {
        setfocusInputHuyen(false);
      } else if (xaPhuong == "") {
        setfocusInputXa(false);
      } else if (diaChiCuThe == "") {
        setfocusInputAddress(false);
      }
    } else {
      let aa = "84";
      let a = sdt;
      let b = parseInt(a);
      let c = b.toString();
      let inputNumber = aa.concat(c);

      let addressUser = xaPhuong + ", " + quanHuyen + ", " + tinhTP;
      // console.log("[cụ thể]", inputNumber);
      try {
        dispatch(
          actions.getUpdateInfor.getUpdateInforRequest({
            nameU: tenNguoiDung,
            phoneN: inputNumber,
            avatarprofile: avatar,
            birthD: ngaySinh,
            idU: idUser,
            addressU: addressUser,
            specificaddressU: diaChiCuThe,
            tinhTp: tinhTP,
            xaPhuong: xaPhuong,
            quanHuyen: quanHuyen,
          })
        );
        window.location.reload("/profile");
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const onfocusName = () => {
    setfocusInputName(true);
  };

  const onfocusSDT = () => {
    setfocusSDT(true);
  };

  const onfocusTinh = () => {
    setfocusInputTinh(true);
  };
  const onfocusHuyen = () => {
    setfocusInputHuyen(true);
  };
  const onfocusXa = () => {
    setfocusInputXa(true);
  };
  const onfocusAdress = () => {
    setfocusInputAddress(true);
  };
  const notis = useSelector(notiState$);
  const dataNoti = [];
  const Mainid = "6166994051daf7cad40fc4e4";
  React.useEffect(() => {
    dispatch(actions.getNotifis.getNotifisRequest(Mainid));
  }, [dispatch]);

  dataNoti.push.apply(dataNoti, notis);
  const listItems = dataNoti.slice(0, 4).map((item) => (
    <li class="notify-item ">
      <a class="notify_link">
        <img
          className="notify_img"
          src="https://img.pixers.pics/pho_wat(s3:700/FO/69/01/68/62/700_FO69016862_e5029fe1e933011e11e5645ba7f13c6b.jpg,700,366,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,480,316,jpg)/stickers-cup-of-black-coffee-with-roasted-coffe-beans.jpg.jpg"
        ></img>
        <div class="notify_info">
          <div class="title-link" style={{ color: "#756f6e" }}>
            {item.title}
          </div>
          <div class="sub_title" style={{ fontSize: "20px", color: "#0a0a0a" }}>
            {item.content}
          </div>
          <div className="notify_date">{item.updatedAt}</div>
        </div>
        <div className="notify_button">
          <button className="notibtn">Xem chi tiết</button>
        </div>
      </a>
    </li>
  ));

  // cập nhật mật khẩu
  const [inputPass, setInputPass] = useState("");
  const [newPass, setPassNew] = useState("");
  const [confirmPassNew, setComfirmPassNew] = useState("");

  const [checkPass, setCheckPass] = useState({
    check1: true,
    check2: true,
  });
  const [checkNewPass, setCheckNewPass] = useState(true);
  const [checkConfirmPassNew, setCheckConfirmPassNew] = useState({
    check1: true,
    check2: true,
  });

  const onfocusInputPass = () => {
    setCheckPass({ ...checkPass, check1: true, check2: true });
  };
  const onFocusNewPass = () => {
    setCheckNewPass(true);
  };
  const onfocusConfirmPassNew = () => {
    setCheckConfirmPassNew({
      ...checkConfirmPassNew,
      check1: true,
      check2: true,
    });
  };
  const updatePass = () => {
    const phoneNumber = localStorage.getItem("PhoneNumber");
    const pass = localStorage.getItem("PassWord");
    if (inputPass == "") {
      setCheckPass({ ...checkPass, check1: false });
    } else if (newPass == "") {
      setCheckNewPass(false);
    } else if (confirmPassNew == "") {
      setCheckConfirmPassNew({ ...checkConfirmPassNew, check1: false });
    } else if (pass !== inputPass) {
      setCheckPass({ ...checkPass, check2: false });
    } else if (newPass !== confirmPassNew) {
      setCheckConfirmPassNew({ ...checkConfirmPassNew, check2: false });
    } else {
      dispatch(
        actions.getChangePassword.getChangePasswordRequest({
          phonenumber: phoneNumber,
          password: newPass,
        })
      );
      localStorage.setItem("PassWord", newPass);
      window.location.replace("/");
    }
  };

  // trạng thái đơn hàng

  const dataSelectXacNhan = useSelector(dataSelectXacNhan$);
  const dataSelectDaXacNhan = useSelector(dataSelectDaXacNhan$);
  const dataSelectDangGiao = useSelector(dataSelectDangGiao$);
  const dataSelectDaGiao = useSelector(dataSelectDaGiao$);
  const dataSelectDaHuy = useSelector(dataSelectDaHuy$);

  React.useEffect(() => {
    // setchoXacNhanPag(1);
    setchoXacNhanPag(1);
    const id_User = localStorage.getItem("idUser");
    try {
      dispatch(
        actions.getOrderStatus.getOrderStatusRequest({
          iduser: id_User,
        })
      );
    } catch (error) {}
  }, [dispatch]);

  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [choXacNhanPag, setchoXacNhanPag] = useState(1);
  const [choXacNhanPag1, setchoXacNhanPag1] = useState(1);
  const [choXacNhanPag2, setchoXacNhanPag2] = useState(1);
  const [choXacNhanPag3, setchoXacNhanPag3] = useState(1);
  const [choXacNhanPag4, setchoXacNhanPag4] = useState(1);

  const [check_xemthem, setXemThem] = useState(true);
  const [check_xemthem1, setXemThem1] = useState(true);
  const [check_xemthem2, setXemThem2] = useState(true);
  const [check_xemthem3, setXemThem3] = useState(true);
  const [check_xemthem4, setXemThem4] = useState(true);

  console.log("check_xem thêm", check_xemthem);
  const xemThemDon = () => {
    setchoXacNhanPag(choXacNhanPag + 1);
    if (
      dataSelectXacNhan.slice(0, (choXacNhanPag + 1) * 2).length ===
      dataSelectXacNhan.length
    ) {
      setXemThem(false);
    }
  };
  const xemThemDon1 = () => {
    setchoXacNhanPag1(choXacNhanPag1 + 1);
    if (
      dataSelectDaXacNhan.slice(0, (choXacNhanPag1 + 1) * 2).length ===
      dataSelectDaXacNhan.length
    ) {
      setXemThem1(false);
    }
  };
  const xemThemDon2 = () => {
    setchoXacNhanPag2(choXacNhanPag2 + 1);
    if (
      dataSelectDangGiao.slice(0, (choXacNhanPag2 + 1) * 2).length ===
      dataSelectDangGiao.length
    ) {
      setXemThem2(false);
    }
  };
  const xemThemDon3 = () => {
    setchoXacNhanPag3(choXacNhanPag3 + 1);
    if (
      dataSelectDaGiao.slice(0, (choXacNhanPag3 + 1) * 2).length ===
      dataSelectDaGiao.length
    ) {
      setXemThem3(false);
    }
  };
  const xemThemDon4 = () => {
    setchoXacNhanPag4(choXacNhanPag4 + 1);
    if (
      dataSelectDaHuy.slice(0, (choXacNhanPag4 + 1) * 2).length ===
      dataSelectDaHuy.length
    ) {
      setXemThem4(false);
    }
  };

  function choXacNhan() {
    return (
      <div
        style={{
          backgroundColor: "rgba(242, 254, 255, 0)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {dataSelectXacNhan.slice(0, choXacNhanPag * 2).map((index) => (
          <div
            style={{
              width: "100%",
              position: "relative",
              overflow: "auto",
              height: "auto",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: "99%",
                height: "auto",
                padding: "10px 16px",
                margin: "0.5%",
                boxShadow:
                  "0 2px 4px 0 rgb(0 0 0 / 20%), 0 3px 5px 0 rgb(0 0 0 / 19%)",
                borderRadius: "5px 5px 5px 5px",
                backgroundColor: "#fff",
              }}
            >
              <Item props={index} />
            </div>
          </div>
        ))}
        {check_xemthem ? (
          <button className="xemThem" onClick={() => xemThemDon()}>
            Xem Thêm
          </button>
        ) : null}
      </div>
    );
  }

  function daXacNhan() {
    return (
      <div
        style={{
          backgroundColor: "rgba(242, 254, 255, 0)",
          padding: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {dataSelectDaXacNhan.slice(0, choXacNhanPag1 * 2).map((index) => (
          <div
            style={{
              width: "100%",
              position: "relative",
              overflow: "auto",
              height: "auto",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: "99%",
                height: "auto",
                padding: "10px 16px",
                margin: "0.5%",
                boxShadow:
                  "0 2px 4px 0 rgb(0 0 0 / 20%), 0 3px 5px 0 rgb(0 0 0 / 19%)",
                borderRadius: "5px 5px 5px 5px",
                backgroundColor: "#fff",
              }}
            >
              <Item props={index} />
            </div>
          </div>
        ))}
        {check_xemthem1 ? (
          <button className="xemThem" onClick={() => xemThemDon1()}>
            Xem Thêm
          </button>
        ) : null}
      </div>
    );
  }

  function dangGiao() {
    return (
      <div
        style={{
          backgroundColor: "rgba(242, 254, 255, 0)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {dataSelectDangGiao.slice(0, choXacNhanPag2 * 2).map((index) => (
          <div
            style={{
              width: "100%",
              position: "relative",
              overflow: "auto",
              height: "auto",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: "99%",
                height: "auto",
                padding: "10px 16px",
                margin: "0.5%",
                boxShadow:
                  "0 2px 4px 0 rgb(0 0 0 / 20%), 0 3px 5px 0 rgb(0 0 0 / 19%)",
                borderRadius: "5px 5px 5px 5px",
                backgroundColor: "#fff",
              }}
            >
              <ItemSucces props={index} />
            </div>
          </div>
        ))}
        {check_xemthem2 ? (
          <button className="xemThem" onClick={() => xemThemDon2()}>
            Xem Thêm
          </button>
        ) : null}
      </div>
    );
  }

  function daGiao() {
    return (
      <div
        style={{
          backgroundColor: "rgba(242, 254, 255, 0)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {dataSelectDaGiao.slice(0, choXacNhanPag3 * 2).map((index) => (
          <div
            style={{
              width: "100%",
              position: "relative",
              overflow: "auto",
              height: "auto",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: "99%",
                height: "auto",
                padding: "10px 16px",
                margin: "0.5%",
                boxShadow:
                  "0 2px 4px 0 rgb(0 0 0 / 20%), 0 3px 5px 0 rgb(0 0 0 / 19%)",
                borderRadius: "5px 5px 5px 5px",
                backgroundColor: "#fff",
              }}
            >
              <ItemSucces props={index} />
            </div>
          </div>
        ))}
        {check_xemthem3 ? (
          <button className="xemThem" onClick={() => xemThemDon3()}>
            Xem Thêm
          </button>
        ) : null}
      </div>
    );
  }

  function daHuy() {
    return (
      <div
        style={{
          backgroundColor: "rgba(242, 254, 255, 0)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {dataSelectDaHuy.slice(0, choXacNhanPag4 * 2).map((index) => (
          <div
            style={{
              width: "100%",
              position: "relative",
              overflow: "auto",
              height: "auto",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: "99%",
                height: "auto",
                padding: "10px 16px",
                margin: "0.5%",
                boxShadow:
                  "0 2px 4px 0 rgb(0 0 0 / 20%), 0 3px 5px 0 rgb(0 0 0 / 19%)",
                borderRadius: "5px 5px 5px 5px",
                backgroundColor: "#fff",
              }}
            >
              <ItemSucces props={index} />
            </div>
          </div>
        ))}
        {check_xemthem4 ? (
          <button className="xemThem" onClick={() => xemThemDon4()}>
            Xem Thêm
          </button>
        ) : null}
      </div>
    );
  }

  function dataNull() {
    return (
      <div
        style={{
          width: "100%",
          position: "relative",
          overflow: "auto",
          height: 300,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid #c9c8c8",
          borderTop: "1px solid transparent",
        }}
      >
        <img
          src="./images/khongcodulieu.png"
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "50px",
          }}
        />
        <h3 style={{ color: "gray", marginTop: "5px" }}>
          Bạn không có đơn hàng nào
        </h3>
      </div>
    );
  }

  return (
    <div className="App" style={{ paddingTop: "50px", paddingBottom: "35px" }}>
      <div className="row">
        <div className="pleft">
          <div>
            <div className="pname-img">
              <img className="p-avatar" src={avatar}></img>

              <h2 style={{ fontWeight: "bold" }}>{username} </h2>

              <span className="padr">{AddressUser}</span>
            </div>
            <hr />

            <div className="pchoice">
              <Link
                to="/profile&numtoggle=1"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div
                  className={toggleState === 1 ? "poption" : "optian_tabs"}
                  onClick={() => toggleTab(1)}
                >
                  <PersonOutlineOutlinedIcon className="poption-img" />
                  <div className="poption-text">
                    <span>Chỉnh sửa Thông Tin</span>
                  </div>
                </div>
              </Link>

              <Link
                to="/profile&numtoggle=2"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div
                  className={toggleState === 2 ? "poption" : "optian_tabs"}
                  onClick={() => toggleTab(2)}
                >
                  <ReceiptOutlinedIcon className="poption-img" />
                  <div className="poption-text">
                    <span>Trạng thái đơn hàng</span>
                  </div>
                </div>
              </Link>

              <Link
                to="/profile&numtoggle=3"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div
                  className={toggleState === 3 ? "poption" : "optian_tabs"}
                  onClick={() => toggleTab(3)}
                >
                  <NotificationsNoneOutlinedIcon className="poption-img" />
                  <div className="poption-text">
                    <span>Thông Báo Gửi Tới</span>
                  </div>
                </div>
              </Link>

              <Link
                to="/profile&numtoggle=4"
                style={{ textDecoration: "none", color: "black" }}
              >
                <div
                  className={toggleState === 4 ? "poption" : "optian_tabs"}
                  onClick={() => toggleTab(4)}
                >
                  <VpnKeyOutlinedIcon className="poption-img" />
                  <div className="poption-text">
                    <span>Thay đổi mật khẩu</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="pright">
          <div className="acc-detail">
            <div
              className={
                toggleState === 1 ? "content  active-content" : "pcontent"
              }
            >
              <div className="acc-header">
                <h6 className="m-0">Chỉnh sửa thông tin</h6>
              </div>

              <div className="acc-row">
                <div className="profile-row">
                  <div className="left-profile">
                    <TextField
                      style={{ width: "100%", marginTop: 10 }}
                      id="outlined-basic"
                      label="Tên người dùng"
                      variant="outlined"
                      value={tenNguoiDung}
                      onChange={(val) => setTenNguoiDung(val.target.value)}
                      onFocus={onfocusName}
                    />
                    {focusInputName ? null : (
                      <div
                        style={{
                          fontWeight: "bold",
                          fontSize: 10,
                          color: "red",
                        }}
                      >
                        Không được để trống!
                      </div>
                    )}
                    {/* số điện thoại */}
                    <div>
                      <TextField
                        style={{ width: "100%", marginTop: 10 }}
                        id="outlined-basic"
                        label="Số điện thoại"
                        variant="outlined"
                        value={sdt}
                        onChange={(val) => setSDT(val.target.value)}
                        onFocus={onfocusSDT}
                      />
                      {focusSDT ? null : (
                        <div
                          style={{
                            fontWeight: "bold",
                            fontSize: 10,
                            color: "red",
                          }}
                        >
                          Không được để trống!
                        </div>
                      )}
                    </div>
                    {/* Địa chỉ cụ thể */}
                    {/* input địa chỉ cụ thể */}
                    <div style={{ marginTop: "10px" }}>
                      <TextField
                        style={{ width: "100%" }}
                        id="outlined-basic"
                        label="Địa chỉ cụ thể"
                        variant="outlined"
                        value={diaChiCuThe}
                        onChange={(val) => setDiaChiCuThe(val.target.value)}
                        onFocus={onfocusAdress}
                      />
                      {focusInputAddress ? null : (
                        <div
                          style={{
                            fontWeight: "bold",
                            fontSize: 10,
                            color: "red",
                          }}
                        >
                          Không được để trống!
                        </div>
                      )}
                    </div>

                    {/* Ngày tháng năm sinh */}
                    <div style={{ marginTop: "10px" }}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          dateFormat="dd/MM/yyyy"
                          label="Ngày sinh"
                          value={tempDate}
                          onChange={(newValue) => {
                            setNgaySinh(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
                  <div className="right-profile">
                    <Box sx={{ minWidth: 120, marginTop: "10px" }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Tỉnh
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={tinhTP}
                          label="Age"
                          onChange={(val) => setTinhTp(val.target.value)}
                          onFocus={onfocusTinh}
                        >
                          {renderlistCities()}
                        </Select>
                        {focusInputTinh ? null : (
                          <div
                            style={{
                              fontWeight: "bold",
                              fontSize: 10,
                              color: "red",
                            }}
                          >
                            Không được để trống!
                          </div>
                        )}
                      </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120, marginTop: "10px" }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Huyện
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={quanHuyen}
                          label="Age"
                          onChange={(val) => setQuanHuyen(val.target.value)}
                          onFocus={onfocusHuyen}
                        >
                          {renderlistCounties()}
                        </Select>
                        {focusInputHuyen ? null : (
                          <div
                            style={{
                              fontWeight: "bold",
                              fontSize: 10,
                              color: "red",
                            }}
                          >
                            Không được để trống!
                          </div>
                        )}
                      </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120, marginTop: "10px" }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Xã
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={xaPhuong}
                          label="Age"
                          onChange={(val) => setXaPhuong(val.target.value)}
                          onFocus={onfocusXa}
                        >
                          {renderlistWards()}
                        </Select>
                      </FormControl>
                      {focusInputXa ? null : (
                        <div
                          style={{
                            fontWeight: "bold",
                            fontSize: 10,
                            color: "red",
                          }}
                        >
                          Không được để trống!
                        </div>
                      )}
                    </Box>
                    <div style={{ marginTop: "10px" }}>
                      <label style={{ display: "block" }}>
                        Thay đổi ảnh Avartar:
                      </label>
                      <FileBase64
                        className="base-64"
                        multiple={false}
                        type="file"
                        value={avatar}
                        onDone={({ base64 }) => setAvatar(base64)}
                      />
                    </div>
                  </div>
                </div>

                <div className="address-row">
                  <br />
                  <Button
                    style={{ background: "#009387" }}
                    variant="contained"
                    color="success"
                    onClick={handleClickOpen}
                  >
                    Cập nhật
                  </Button>
                </div>
                <hr />
              </div>

              <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{ fontSize: "20px", fontWeight: "bold" }}>
                  Bạn có muốn thay đổi thông tin của mình ?
                </DialogTitle>
                <DialogActions>
                  <Button
                    onClick={() => getUpdateInfor()}
                    style={{ color: "red" }}
                  >
                    Cập nhật
                  </Button>
                  <Button onClick={handleClose}>Đóng</Button>
                </DialogActions>
              </Dialog>
            </div>
            {/* Tình trạng đơn hàng */}
            <div
              className={
                toggleState === 2 ? "content  active-content" : "pcontent"
              }
            >
              <div className="acc-header">
                <h6 className="m-0">Tình trạng đơn hơn hàng</h6>
              </div>

              <Box
                sx={{
                  width: "100%",
                  typography: "body1",
                  backgroundColor: "rgba(242, 254, 255, 0)",
                }}
              >
                <TabContext value={value}>
                  <Box sx={{ backgroundColor: "#0093870f" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="Chờ xác nhận " value="1" />
                      <Tab label="Đã xác nhận" value="2" />
                      <Tab label="Đang giao" value="3" />
                      <Tab label="Đã giao" value="4" />
                      <Tab label="Hủy" value="5" />
                    </TabList>
                  </Box>
                  <TabPanel
                    style={{
                      padding: 0,
                      margin: 0,
                    }}
                    value="1"
                  >
                    {dataSelectXacNhan == "" ? dataNull() : choXacNhan()}
                  </TabPanel>
                  <TabPanel
                    style={{
                      padding: 0,
                      margin: 0,
                    }}
                    value="2"
                  >
                    {dataSelectDaXacNhan == "" ? dataNull() : daXacNhan()}
                  </TabPanel>
                  <TabPanel
                    style={{
                      padding: 0,
                      margin: 0,
                    }}
                    value="3"
                  >
                    {dataSelectDangGiao == "" ? dataNull() : dangGiao()}
                  </TabPanel>
                  <TabPanel
                    style={{
                      padding: 0,
                      margin: 0,
                    }}
                    value="4"
                  >
                    {dataSelectDaGiao == "" ? dataNull() : daGiao()}
                  </TabPanel>
                  <TabPanel
                    style={{
                      padding: 0,
                      margin: 0,
                    }}
                    value="5"
                  >
                    {dataSelectDaHuy == "" ? dataNull() : daHuy()}
                  </TabPanel>
                </TabContext>
              </Box>
            </div>
            <div
              className={
                toggleState === 3 ? "content  active-content" : "pcontent"
              }
            >
              <div className="acc-header">
                <h6 className="m-0">Thông báo</h6>
              </div>
              <div style={{ maxHeight: "410px" }}>{listItems}</div>
            </div>

            {/* Thay đổi mk */}
            <div
              className={
                toggleState === 4 ? "content  active-content" : "pcontent"
              }
            >
              <div className="acc-header">
                <h6 className="m-0">Thay đổi mât khẩu</h6>
              </div>
              <div className="acc-row">
                <div className="profile-row">
                  <div className="left-profile">
                    <label>Nhập mật hiện tại:</label>
                    <br />
                    <input
                      type="password"
                      id="feFirstName"
                      className="form-control"
                      onChange={(val) => setInputPass(val.target.value)}
                      onFocus={onfocusInputPass}
                    />
                    {checkPass.check1 ? null : (
                      <div
                        style={{
                          fontWeight: "bold",
                          fontSize: 10,
                          color: "red",
                        }}
                      >
                        Không được để trống
                      </div>
                    )}
                    {checkPass.check2 ? null : (
                      <div
                        style={{
                          fontWeight: "bold",
                          fontSize: 10,
                          color: "red",
                        }}
                      >
                        Mật khẩu cũ không đúng.
                      </div>
                    )}
                    <label style={{ marginTop: "10px" }}>Mật khẩu mới:</label>
                    <br />
                    <input
                      type="password"
                      id="feFirstName"
                      className="form-control"
                      onChange={(val) => setPassNew(val.target.value)}
                      onFocus={onFocusNewPass}
                    />
                    {checkNewPass ? null : (
                      <div
                        style={{
                          fontWeight: "bold",
                          fontSize: 10,
                          color: "red",
                        }}
                      >
                        Không được để trống
                      </div>
                    )}
                    <label style={{ marginTop: "10px" }}>
                      Xác nhận mật khẩu:
                    </label>
                    <br />
                    <input
                      type="password"
                      id="feFirstName"
                      className="form-control"
                      onChange={(val) => setComfirmPassNew(val.target.value)}
                      onFocus={onfocusConfirmPassNew}
                    />
                    {checkConfirmPassNew.check1 ? null : (
                      <div
                        style={{
                          fontWeight: "bold",
                          fontSize: 10,
                          color: "red",
                        }}
                      >
                        Không được để trống
                      </div>
                    )}
                    {checkConfirmPassNew.check2 ? null : (
                      <div
                        style={{
                          fontWeight: "bold",
                          fontSize: 10,
                          color: "red",
                        }}
                      >
                        Nhập lại mật khẩu không đúng.
                      </div>
                    )}
                    <Button
                      style={{ background: "#009387", marginTop: "20px" }}
                      variant="contained"
                      color="success"
                      onClick={() => updatePass()}
                    >
                      Cập nhật mật khẩu
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}

export default ProfileScreen1;
