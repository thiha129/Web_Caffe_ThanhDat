import React, { useEffect, useState } from "react";
import "../../App.css";
import Cards from "../Cards";
import Footer from "../Footer";
import Dangkychitiet from "../Dangkychitiet";
import DangKySDT from "./DangKySDT";
import DangKyOTP from "./DangKyOTP";
import DangKyUser from "./DangKyUser";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { checkRegister$, checkOtp$ } from "../../redux/selectors";
import { connect, useDispatch, useSelector } from "react-redux";

const steps = [
  "Mời nhập số điện thoại",
  "Nhập mã OTP được gửi về máy",
  "Đăng ký thông tin tài khoản",
];

function Dangky() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  // lấy dữ liệu khi kiểm tra sô điện thoại có hợp lệ
  const check_SDT = useSelector(checkRegister$);
  console.log("check_sdt", check_SDT);
  // lấy dữ liệu kiểm tra khi nhập otp chính xác
  const Check_OTP = useSelector(checkOtp$);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    // if (!isStepOptional(activeStep)) {
    //   throw new Error("You can't skip a step that isn't optional.");
    // }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  //chuyển trang khi nhập hợp lệ số điện thoại
  React.useEffect(() => {
    if (check_SDT == "0") {
      console.log("đã tồn tại");
    } else if (check_SDT == "1") {
      handleSkip();
    }
  }, [check_SDT]);

  // chuyển trang khi hợp lệ otp
  useEffect(() => {
    if (Check_OTP == "1") {
      console.log("Hệ thống đg chuyển tiếp");
      // setModalOpenUser(false);
      handleSkip();
    } else if (Check_OTP == "0") {
      // setCheckOTP({ ...checkOTP, check2: false });
      console.log("Bạn đã nhập mã OTP sai. Vui lòng kiểm tra lại !");
    }
  }, [Check_OTP]);

  return (
    <div
      class="dangKyParentRoot"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,1)), url('./backGroundDangKy.png')",
      }}
    >
      <div
        style={{
          width: "1200px",
          border: "1px solid rgb(176 176 176)",
          borderRadius: "10px",
          backgroundColor: "rgba(255,255,255,0.2)",
          margin: "30px 0 30px 0",
        }}
      >
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Xác thực</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 ? <DangKySDT /> : null}
            {activeStep === 1 ? <DangKyOTP /> : null}
            {activeStep === 2 ? <DangKyUser /> : null}
          </React.Fragment>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Dangky;
