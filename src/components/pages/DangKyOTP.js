import React, { useState, useEffect } from "react";
// import "./Modal.css";

//redux
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { checkOtp$ } from "../../redux/selectors";

function Modal({ setOpenModal, Number }) {
  const phone = localStorage.getItem("PhoneNumber");
  console.log("Số điện thoại đăng kí OTP", phone);

  const [checkOTP, setCheckOTP] = useState({
    check1: true,
    check2: true,
    check3: true,
  });

  const [inputOPT, setInputOTP] = useState("");

  const abcx = useSelector(checkOtp$);

  const dispatch = useDispatch();
  useEffect(() => {
    if (abcx == "1") {
      console.log("Hệ thống đg chuyển tiếp");
      // setModalOpenUser(false);
    } else if (abcx == "0") {
      setCheckOTP({ ...checkOTP, check2: false });
      console.log("Bạn đã nhập mã OTP sai. Vui lòng kiểm tra lại !");
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
      localStorage.setItem("OTP", stringWithoutCommas);
      console.log("Mã OTP : " + stringWithoutCommas);
      // console.log("abcx" + route.params.Number);
      dispatch(
        actions.verifyAccount.verifyAccountRequest({
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
              <h3 className="login-h3">Nhập Mã OTP</h3>

              <div className="form-group">
                <label>Mã OTP:</label>

                <input
                  type="number"
                  className="form-control"
                  placeholder="Nhập mã OTP vừa được gửi"
                  onChange={(e) => setInputOTP(e.target.value)}
                  onFocus={onChangeFocus}
                />
                {checkOTP.check1 ? null : (
                  <div
                    style={{ fontWeight: "bold", fontSize: 10, color: "red" }}
                  >
                    Vui lòng không được để trống.
                  </div>
                )}
                {checkOTP.check2 ? null : (
                  <div
                    style={{ fontWeight: "bold", fontSize: 10, color: "red" }}
                  >
                    Nhập mã OTP sai, vui lòng kiểm tra lại.
                  </div>
                )}
              </div>

              <div
                type="submit"
                className="btn btn-primary btn-block"
                onClick={signin}
              >
                Gửi mã OTP
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
