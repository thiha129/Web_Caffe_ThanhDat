import React, { useState } from "react";
import "./Modal.css";

import "react-datepicker/dist/react-datepicker.css";
//redux
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";

function ModalUser({ setOpenModal, Number, code }) {
  const dispatch = useDispatch();

  const [password, setPassWord] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [focusInputPass, setfocusInputPass] = useState(true);
  const [focusInputConfirmPass, setfocusInputConfirmPass] = useState({
    error1: true,
    error2: true,
  });

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

  //gửi dữ liệu về data

  const OTP = () => {
    if (password == "") {
      setfocusInputPass(false);
    } else if (confirmPass == "") {
      setfocusInputConfirmPass({
        ...focusInputConfirmPass,
        error1: false,
      });
    } else if (confirmPass != password) {
      setfocusInputConfirmPass({
        ...focusInputConfirmPass,
        error2: false,
      });
    } else {
      console.log("có");
      const phone = localStorage.getItem("ForgetPassword");
      dispatch(
        actions.getChangePassword.getChangePasswordRequest({
          phonenumber: phone,
          password: password,
        })
      );
      localStorage.removeItem("ForgetPassword");
      window.location.replace("/dangnhap");
    }
  };

  return (
    <div className="login-body1">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <h3 className="login-h3">Thay đổi mật khẩu </h3>
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
                <div style={{ fontWeight: "bold", fontSize: 10, color: "red" }}>
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
                <div style={{ fontWeight: "bold", fontSize: 10, color: "red" }}>
                  Không được để trống!
                </div>
              )}
              {focusInputConfirmPass.error2 ? null : (
                <div style={{ fontWeight: "bold", fontSize: 10, color: "red" }}>
                  Nhập lại mật khẩu không đúng!
                </div>
              )}
            </div>
            <div
              type="submit"
              className="btn btn-primary btn-block"
              onClick={OTP}
            >
              Đổi mật khẩu
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalUser;
