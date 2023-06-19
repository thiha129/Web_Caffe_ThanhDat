import React, { useState, useEffect } from "react";
import { MenuItemsNB } from "./MenuItemsNB";
import "../css/Dropdown.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { notiState$, checkUsername$ } from "../redux/selectors";
import { useHistory } from "react-router-dom";
import * as actions from "../redux/actions";
import { dividerClasses } from "@mui/material";

function Dropdown() {
  const dispatch = useDispatch();
  const abcx = useSelector(checkUsername$);
  const history = useHistory();

  // const notis = useSelector(notiState$);
  // console.log("[NotiList-notifis]", notis);

  // lấy tên người dùng khi đăng nhập
  console.log("[Check]", abcx);
  useEffect(() => {
    a();
    if (abcx == "0") {
      setData({
        ...data,
        typelove: true,
        user: "Tài khoản",
        profile: false,
      });
    } else {
      setData({
        ...data,
        typelove: false,
        user: abcx,
        profile: true,
      });
    }
  }, []);

  const [data, setData] = useState({
    typelove: true,
    user: abcx,
    profile: true,
  });
  // đăng xuất
  const remuteKey = () => {
    try {
      localStorage.removeItem("PhoneNumber");
      localStorage.removeItem("PassWord");
      history.useHistory("/dangnhap");
    } catch {
      console.log("Lỗi đăng xuất");
    }
  };

  const a = async () => {
    try {
      const phone = await localStorage.getItem("PhoneNumber");
      const pass = await localStorage.getItem("PassWord");
      if (phone !== null && pass !== null) {
        console.log(phone);
        dispatch(
          actions.getAccountsUserName.getAccountsUserNameRequest({
            phonenumber: phone,
          })
        );
        setData({
          ...data,
          typelove: false,
          user: abcx,
        });
      } else {
        setData({
          ...data,
          typelove: true,
          user: "Tài khoản",
        });
      }
    } catch (error) {
      // Error retrieving data
      console.log("[Error] " + error);
    }
  };

  return (
    <div>
      {data.typelove ? (
        <ul>
          <li>
            <Link to="/dangnhap">ĐN</Link>
          </li>
          <li>
            <Link to="/dangky">ĐK </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/profile">{abcx}</Link>
          </li>
          <li>
            <Link to="/dangnhap" onClick={remuteKey}>
              Đx
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
