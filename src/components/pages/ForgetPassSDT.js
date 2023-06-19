import React, { useState } from "react";
import "../../App.css";
import Footer from "../Footer";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import {
  checkForgetPassword_phone$,
  checkRegister$,
} from "../../redux/selectors";
import { useHistory, Link } from "react-router-dom";
import { Redirect } from "react-router";
import ForgetPassOTP from "./ForgetPassOTP";
import DangKyUser from "./DangKyUser";

function ForgetPass() {
  const history = useHistory();
  const [data, setData] = useState({
    input_Number_validate: true,
    input_phoneNumber: true,
    checkPhoneNumber: true,
  });
  const [phoneOTP, setPhoneOTP] = useState();
  console.log("inputnumber", phoneOTP);

  const [modalOpen, setModalOpen] = useState(true);
  const defaultCodeCountry = "84";
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState();
  const [isChecked, setIsChecked] = React.useState(true);

  const abcx = useSelector(checkForgetPassword_phone$);
  console.log("tranng thái sô đt", abcx);

  const onChangeFocus = () => {
    setData({
      input_Number_validate: true,
      input_phoneNumber: true,
      checkPhoneNumber: true,
    });
  };
  console.log("trạng thái", modalOpen);

  React.useEffect(() => {
    if (abcx == "0") {
      console.log("rỗng 1 trong 2");
      setData({ ...data, checkPhoneNumber: false });
    } else if (abcx == "1") {
      console.log("hợp lệ");
      // navigation.navigate("OtpScreen", { Number: inputNumber });
      setModalOpen(false);
    } else if (abcx == "2") {
      console.log("Không tồn tại ");
    }
  }, [abcx, isChecked]);

  // var vnf_regex = /^0\d[0-9]*$/;
  var vnf_regex = /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/;

  const updatetypeButtom = () => {
    if (phoneNumber == null || phoneNumber == "") {
      setData({ ...data, input_Number_validate: false });
    } else if (vnf_regex.test(phoneNumber) == false) {
      setData({ ...data, input_phoneNumber: false });
    } else {
      let inputNumber = defaultCodeCountry.concat(
        parseInt(phoneNumber).toString()
      );
      setPhoneOTP(inputNumber);
      setIsChecked(!isChecked);
      localStorage.setItem("ForgetPassword", inputNumber);
      dispatch(
        actions.getForgetPassword.getForgetPasswordRequest({
          phonenumber: inputNumber,
          channel: data.country,
        })
      );
    }
  };

  return (
    <>
      <div className="login-body1">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form>
              <h3 className="login-h3">
                Nhập số điện thoại để thay đổi mật khẩu
              </h3>

              <div className="form-group">
                <label>Số điện thoại:</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Nhập số điện thoại của bạn"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onFocus={onChangeFocus}
                />
                {data.input_Number_validate ? null : (
                  <div
                    style={{ fontWeight: "bold", fontSize: 10, color: "red" }}
                  >
                    Không được để trống!
                  </div>
                )}
                {data.input_phoneNumber ? null : (
                  <div
                    style={{ fontWeight: "bold", fontSize: 10, color: "red" }}
                  >
                    Số điện thoại không đúng định dạng, vui lòng kiểm tra lại!
                  </div>
                )}

                {data.checkPhoneNumber ? null : (
                  <div
                    style={{ fontWeight: "bold", fontSize: 10, color: "red" }}
                  >
                    Số điện thoại không tồn tại, vui lòng kiểm tra lại!
                  </div>
                )}
              </div>

              <div
                type="submit"
                className="btn btn-primary btn-block"
                onClick={updatetypeButtom}
              >
                Gửi mã OTP
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ForgetPass;
