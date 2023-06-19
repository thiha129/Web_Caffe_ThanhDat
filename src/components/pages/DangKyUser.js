import React, { useState, useEffect } from "react";
import "./Modal.css";

//redux
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { format } from "date-fns";

import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const tinh_tp = require("../datapicker/tinh_tp.json");
const quan_huyen = require("../datapicker/quan_huyen.json");
const xa_phuong = require("../datapicker/xa_phuong.json");

function ModalUser({ setOpenModal, Number, code }) {
  const [nameUser, setNameUser] = useState("");
  const [password, setPassWord] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [diaChiCuThe, setDiaChiCuThe] = useState("");

  const [startDate, setStartDate] = useState(new Date());
  const [birthDayData, setBirthDayData] = useState("");
  const dispatch = useDispatch();

  const [xaPhuong, setXaPhuong] = React.useState("");
  const [quanHuyen, setQuanHuyen] = React.useState("");
  const [tinhTP, setTinhTp] = React.useState("");

  const [focusInputName, setfocusInputName] = useState(true);
  const [focusInputPass, setfocusInputPass] = useState(true);
  const [focusInputConfirmPass, setfocusInputConfirmPass] = useState({
    error1: true,
    error2: true,
  });
  const [focusInputTinh, setfocusInputTinh] = useState(true);
  const [focusInputHuyen, setfocusInputHuyen] = useState(true);
  const [focusInputXa, setfocusInputXa] = useState(true);
  const [focusInputAddress, setfocusInputAddress] = useState(true);

  const [data, setData] = useState({
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
  data.dataCities.sort(GetSortOrder("name"));
  data.dataCounties.sort(GetSortOrder("name"));
  data.dataWards.sort(GetSortOrder("name"));

  // ngày sinh
  const onChange = (event, selectdDate) => {
    const currentDate = selectdDate || startDate;
    console.log("ngay sinh", currentDate);
    setStartDate(currentDate);
    let tempDate = new Date(currentDate);

    let fDate =
      tempDate.getDate() +
      "-" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getFullYear();
    let fDateget =
      tempDate.getFullYear() +
      "-" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getDate();
    if (
      tempDate.getDate() > 1 &&
      tempDate.getMonth() + 1 > 1 &&
      tempDate.getFullYear() < 2003
    ) {
      setStartDate(fDate);
      setBirthDayData(fDateget);
    } else {
      console.log("Phải lớn hơn 18 tuổi");
    }
  };
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

  const onfocusName = () => {
    setfocusInputName(true);
  };
  const onChangeBlur = () => {
    setfocusInputName(true);
  };

  const onfocusPassWord = () => {
    setfocusInputPass(true);
  };
  const onfocusConfirmPass = () => {
    setfocusInputConfirmPass({
      ...focusInputConfirmPass,
      error1: true,
      error2: true,
    });
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

  //gửi dữ liệu về data

  const OTP = () => {
    const AddressUser = xaPhuong + ", " + quanHuyen + ", " + tinhTP;

    if (
      nameUser == "" ||
      startDate == "" ||
      password == "" ||
      confirmPass == "" ||
      tinhTP == "" ||
      quanHuyen == "" ||
      xaPhuong == "" ||
      diaChiCuThe == ""
    ) {
      if (nameUser == "") {
        setfocusInputName(false);
      } else if (password == "") {
        setfocusInputPass(false);
      } else if (confirmPass == "") {
        setfocusInputConfirmPass({
          ...focusInputConfirmPass,
          error1: false,
        });
      } else if (tinhTP == "") {
        setfocusInputTinh(false);
      } else if (quanHuyen == "") {
        setfocusInputHuyen(false);
      } else if (xaPhuong == "") {
        setfocusInputXa(false);
      } else if (diaChiCuThe == "") {
        setfocusInputAddress(false);
      }
    } else if (password !== confirmPass) {
      setfocusInputConfirmPass({
        ...focusInputConfirmPass,
        error2: false,
      });
    } else {
      console.log("có");
      const phone = localStorage.getItem("PhoneNumber");
      const OTP = localStorage.getItem("OTP");
      dispatch(
        actions.registerAccountInfor.registerAccountInforRequest({
          phonenumber: phone,
          otp: OTP,
          username: nameUser,
          birthday: startDate,
          password: password,
          address: AddressUser,
          specificaddress: diaChiCuThe,
          tinhTp: tinhTP,
          xaPhuong: xaPhuong,
          quanHuyen: quanHuyen,
        })
      );
      _storeData();
    }
  };
  const _storeData = async () => {
    try {
      // await localStorage.setItem("PhoneNumber", Number);
      await localStorage.setItem("PassWord", password);
      localStorage.removeItem("OTP");
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-body1">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <h3 className="login-h3">Đăng ký thông tin tài khoản</h3>

            {/* ô nhập tên người dùng */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <div>
                <div className="form-group">
                  <label>Tên người dùng</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập tên người dùng"
                    onChange={(e) => setNameUser(e.target.value)}
                    onFocus={onfocusName}
                    onBlur={onChangeBlur}
                  />
                  {focusInputName ? null : (
                    <div
                      style={{ fontWeight: "bold", fontSize: 10, color: "red" }}
                    >
                      Không được để trống!
                    </div>
                  )}
                </div>

                {/* ô nhập ngày tháng năm sinh */}
                <div className="form-group">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      label="Ngày sinh"
                      value={startDate}
                      onChange={(newValue) => {
                        setStartDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>

                {/* ô nhập mật khẩu người dùng */}

                <div className="form-group">
                  <label>Mật khẩu</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Nhập mật khẩu của bạn"
                    onChange={(val) => setPassWord(val.target.value)}
                    onFocus={onfocusPassWord}
                  />
                  {focusInputPass ? null : (
                    <div
                      style={{ fontWeight: "bold", fontSize: 10, color: "red" }}
                    >
                      Không được để trống!
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label>Nhập lại mật khẩu</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Nhập mật khẩu của bạn"
                    onChange={(val) => setConfirmPass(val.target.value)}
                    onFocus={onfocusConfirmPass}
                  />
                  {focusInputConfirmPass.error1 ? null : (
                    <div
                      style={{ fontWeight: "bold", fontSize: 10, color: "red" }}
                    >
                      Không được để trống!
                    </div>
                  )}
                  {focusInputConfirmPass.error2 ? null : (
                    <div
                      style={{ fontWeight: "bold", fontSize: 10, color: "red" }}
                    >
                      Nhập lại mật khẩu không đúng!
                    </div>
                  )}
                </div>
              </div>

              {/* ô nhập lại mật khẩu người dùng */}

              {/* nhập tinh huyện xã */}
              <div
                style={{
                  marginLeft: "50px",
                }}
              >
                <label>Địa chỉ</label>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Box
                    sx={{
                      minWidth: 150,
                      marginBottom: "10px",
                      marginRight: "10px",
                    }}
                  >
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Tỉnh - TP
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
                  <Box
                    sx={{
                      minWidth: 150,
                      marginBottom: "10px",
                      marginRight: "10px",
                      minHeight: "calc(1.5em + .75rem + 2px)",
                    }}
                  >
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Quận - Huyện
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
                  <Box sx={{ minWidth: 150, marginBottom: "10px" }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Xã - Phường
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
                    </FormControl>
                  </Box>
                </div>
                <div className="form-group">
                  <label>Địa chỉ chi tiết</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập địa chỉ cụ thể"
                    onChange={(val) => setDiaChiCuThe(val.target.value)}
                    onFocus={onfocusAdress}
                  />
                  {focusInputAddress ? null : (
                    <div
                      style={{ fontWeight: "bold", fontSize: 10, color: "red" }}
                    >
                      Không được để trống!
                    </div>
                  )}
                </div>

                <div
                  type="submit"
                  className="btn btn-primary btn-block"
                  onClick={OTP}
                >
                  Đăng ký
                </div>
              </div>
            </div>

            {/* Địa chỉ cụ thể của người dùng */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalUser;
