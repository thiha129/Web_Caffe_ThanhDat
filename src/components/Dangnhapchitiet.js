import React, { useEffect, useState } from "react";
import "../css/Dangkychitiet.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";
import { checkLogin$ } from "../redux/selectors";

function SignInSection() {
  const [data, setData] = useState({
    phonenumber: "",
    password: "",
    check_textInput: true,
    check_textInput_pass: true,
    // secureTextEntry: true,
    // isValidUser: true,
    // isValidPassword: true,
    _check: true,
  });
  const [phoneNumber, setPhoneNumber] = useState();
  const [inputNumber, setInputNumber] = useState();

  const user = useSelector(checkLogin$);

  const dispatch = useDispatch();

  console.log("user tra ve", user);
  const _storeData = () => {
    try {
      let aa = defaultCodeCountry;
      let a = phoneNumber;
      let b = parseInt(a);
      let c = b.toString();
      let inputNumber = aa.concat(c);
      localStorage.setItem("PhoneNumber", inputNumber);
      localStorage.setItem("PassWord", data.password);
      window.location.replace("/");

      // history.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (user == "0") {
      console.log("Rỗng 1 trong 2");
      setData({
        ...data,
        _check: false,
      });
    } else if (user == "1") {
      console.log("Có");
      _storeData();
      setData({
        ...data,
        _check: true,
      });
    } else if (user == "2") {
      console.log("ko tồn tại");
      setData({
        ...data,
        _check: false,
      });
    } else {
      console.log("erro");
    }
  }, [user]);

  const defaultCodeCountry = "84";

  const Login = React.useCallback(() => {
    if (phoneNumber == undefined || data.password == null) {
      console.log("rỗng 1 trong 2");
      setData({
        ...data,
        check_textInput: false,
        check_textInput_pass: false,
        _check: true,
      });
    } else {
      setData({
        ...data,
        check_textInput: true,
      });
      let aa = defaultCodeCountry;
      let a = phoneNumber;
      let b = parseInt(a);
      let c = b.toString();
      let inputNumber = aa.concat(c);
      console.log(" so gui len data", inputNumber);
      console.log("pass", data.password);
      dispatch(
        actions.getAccounts.getAccountsRequest({
          phonenumber: inputNumber,
          password: data.password,
        })
      );
    }
  }, [phoneNumber, inputNumber, data.password, dispatch]);

  const [focusInput, setFocusInput] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const onChangePhone = (number) => {
    setPhoneNumber(number);
    let rjx = /^0\d[0-9]*$/;
    let validuser = rjx.test(number);
    validuser
      ? setData({
          ...data,
          isValidUser: true,
          check_textInputChange: true,
        })
      : setData({
          ...data,
          isValidUser: false,
          check_textInputChange: false,
        });
  };

  const onChangeFocus = () => {
    setData({ ...data, check_textInput: true });
  };
  const onChangeFocusPass = () => {
    setData({ ...data, check_textInput_pass: true });
  };
  return (
    <div
      className="login-body"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,1)), url('./backGroundDangKy.png')",
      }}
    >
      <div className="auth-wrapper">
        <div className="auth-inner" style={{ width: "45%" }}>
          <form>
            <h3 className="login-h3">Đăng Nhập</h3>
            {data._check ? null : (
              <div
                style={{
                  height: 35,
                  borderWidth: 0.1,
                  borderStyle: "solid",
                  borderColor: "red",
                  position: "relative",
                  backgroundColor: "#fff9fa",
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: 13,
                    color: "red",
                    marginLeft: 10,
                    position: "absolute",
                  }}
                >
                  Tài khoản và mật khẩu không đúng, vui lòng kiểm tra lại tài
                  khoản và mật khẩu!!!
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Nhập số điện thoại:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Số điện thoại"
                onChange={(e) => onChangePhone(e.target.value)}
                onFocus={onChangeFocus}
              />
              {data.check_textInput ? null : (
                <div style={{ fontWeight: "bold", fontSize: 10, color: "red" }}>
                  Vui lòng không bỏ trống!
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Nhập mật Khẩu:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Mật khẩu"
                onChange={(e) =>
                  setData({
                    ...data,
                    password: e.target.value,
                  })
                }
                onFocus={onChangeFocusPass}
              />
              {data.check_textInput_pass ? null : (
                <div style={{ fontWeight: "bold", fontSize: 10, color: "red" }}>
                  Vui lòng không bỏ trống!
                </div>
              )}
            </div>
            <div
              type="submit"
              className="btn btn-primary btn-block"
              onClick={Login}
            >
              Đăng nhập
            </div>
            <p className="forgot-password text-right">
              <a href="/ForgetPass">Quên mật khẩu</a>
            </p>
            <p className="forgot-password text-right">
              Chưa có tài khoản <a href="/dangky"> Đăng ký ngay</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInSection;
