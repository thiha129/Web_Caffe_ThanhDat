import React, { useCallback, useEffect, useState } from "react";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { checkRegister$ } from "../../redux/selectors";

function Dangky(sdt) {
  const [data, setData] = useState({
    input_Number_validate: true,
    input_phoneNumber: true,
    checkPhoneNumber: true,
  });
  const [phoneOTP, setPhoneOTP] = useState();

  const defaultCodeCountry = "84";
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState();
  const [isChecked, setIsChecked] = React.useState(true);
  const abcx = useSelector(checkRegister$);
  const onChangeFocus = () => {
    setData({
      input_Number_validate: true,
      input_phoneNumber: true,
      checkPhoneNumber: true,
    });
  };

  React.useEffect(() => {
    if (abcx == "0") {
      console.log("đã tồn tại");
      setData({ ...data, checkPhoneNumber: false });
    } else if (abcx == "1") {
      console.log("hợp lệ");
      // navigation.navigate("OtpScreen", { Number: inputNumber });
      // setModalOpen(false);
    }
  }, [abcx, isChecked]);

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
      localStorage.setItem("PhoneNumber", inputNumber);
      setIsChecked(!isChecked);
      dispatch(
        actions.registerAccount.registerAccountRequest({
          phonenumber: inputNumber,
          channel: "sms",
        })
      );
    }
  };

  return (
    <>
      <div className="login-body1">
        <div className="auth-wrapper">
          <div
            className="auth-inner"
            style={{
              width: "45%",
            }}
          >
            <form>
              <h3 className="login-h3">Nhập số điện thoại của bạn</h3>

              <div className="form-group">
                <label>Số điện thoại:</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Nhập số điện thoại của bạn"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  maxLength={10}
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
                    Số điện thoại đã tồn tại, vui lòng kiểm tra lại!
                  </div>
                )}
              </div>

              <div
                type="submit"
                className="btn btn-primary btn-block"
                onClick={updatetypeButtom}
              >
                Đăng ký
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dangky;
