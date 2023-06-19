import React, { useState, useEffect } from "react";
import "./Modal.css";
import ChangePass from "./Forget_ChangePassWord";
//redux
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { checkForgetPassword_otp$ } from "../../redux/selectors";

function Modal({ setOpenModal, Number }) {
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(true);
  const [modalOpenUser, setModalOpenUser] = useState(true);

  const [checkOTP, setCheckOTP] = useState({
    check1: true,
    check2: true,
    check3: true,
  });

  const [inputOPT, setInputOTP] = useState("");
  const sdtDangKy = Number;
  console.log("Số điện thoại đăng kí OTP", sdtDangKy);
  const abcx = useSelector(checkForgetPassword_otp$);
  console.log("check trả về của OTP ", abcx);
  useEffect(() => {
    if (abcx == "1") {
      console.log("Hệ thống đg chuyển tiếp");
      // setModalOpenUser(false);
    } else if (abcx == "0") {
      setCheckOTP({ ...checkOTP, check2: false });
      console.log("Bạn đã nhập mã OTP sai. Vui lòng kiểm tra lại !");
    } else {
      console.log("Erro, OTP");
    }
  }, [abcx]);

  const signin = () => {
    const a = inputOPT.toString();
    const stringWithoutCommas = a.replace(/,/g, "");
    console.log(stringWithoutCommas, "áđasa");
    const b = parseInt(stringWithoutCommas);
    if (stringWithoutCommas == "") {
      setCheckOTP({ ...checkOTP, check1: false });
      console.log("Vui lòng không để trống !");
    } else if (stringWithoutCommas.length != 6) {
      setCheckOTP({ ...checkOTP, check2: false });
    } else {
      console.log("Mã OTP : " + stringWithoutCommas);
      // console.log("abcx" + route.params.Number);
      const phone = localStorage.getItem("ForgetPassword");
      dispatch(
        actions.getForgetPasswordVerify.getForgetPasswordVerifyRequest({
          phonenumber: phone,
          code: stringWithoutCommas,
        })
      );
    }
  };
  const onChangeFocus = () => {
    setCheckOTP({
      check1: true,
      check2: true,
    });
  };
  return (
    <div className="login-body1">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form>
            <h3 className="login-h3">Nhập Mã OTP ở điện thoại của bạn </h3>

            <div className="form-group">
              <label>Mã OTP:</label>

              <input
                type="number"
                className="form-control"
                placeholder="Nhập mã OTP"
                onChange={(e) => setInputOTP(e.target.value)}
                onFocus={onChangeFocus}
              />
              {checkOTP.check1 ? null : (
                <div style={{ fontWeight: "bold", fontSize: 10, color: "red" }}>
                  Vui lòng không được để trống.
                </div>
              )}
              {checkOTP.check2 ? null : (
                <div style={{ fontWeight: "bold", fontSize: 10, color: "red" }}>
                  Nhập mã OTP sai, vui lòng kiểm tra lại.
                </div>
              )}
            </div>

            <div
              type="submit"
              className="btn btn-primary btn-block"
              onClick={signin}
            >
              Xác nhận mã OTP
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;
