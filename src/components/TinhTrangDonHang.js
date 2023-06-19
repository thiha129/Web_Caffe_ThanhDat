import React, { useState, useEffect } from "react";
import "../css/ProfileScreen1.css";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";
import {
  checkUser$,
  dataSelectXacNhan$,
  dataSelectDaXacNhan$,
  dataSelectDangGiao$,
  dataSelectDaGiao$,
  dataSelectDaHuy$,
} from "../redux/selectors";

//box tab

//đơn hàng
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";

const TinhTrangDonHang = () => {
  const dispatch = useDispatch();
  const dataSelectXacNhan = useSelector(dataSelectXacNhan$);
  const dataSelectDaXacNhan = useSelector(dataSelectDaXacNhan$);
  const dataSelectDangGiao = useSelector(dataSelectDangGiao$);
  const dataSelectDaGiao = useSelector(dataSelectDaGiao$);
  const dataSelectDaHuy = useSelector(dataSelectDaHuy$);
  //   console.log("dataSelectDaXacNhan", dataSelectDaXacNhan);
  //   console.log("dataSelectDangGiao", dataSelectDangGiao);
  //   console.log("dataSelectDaGiao", dataSelectDaGiao);
  //   console.log("dataSelectDaHuy", dataSelectDaHuy);
  React.useEffect(() => {
    console.log("idUser", localStorage.getItem("idUser"));
    const id_User = localStorage.getItem("idUser");
    try {
      dispatch(
        actions.getOrderStatus.getOrderStatusRequest({
          iduser: id_User,
        })
      );
    } catch (error) {}
  }, [dispatch]);

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        height: "320px",
        "& ul": { padding: 0 },
      }}
      subheader={<li />}
    >
      {/* {[dataSelectXacNhan].map((sectionId) =>
          // <li key={`section-${sectionId}`}>{sectionId}</li>
          console.log(sectionId, "section")
        )} */}
      {console.log("dataSelectXacNhan")}
      {[1, 2, 3, 45, 6, 7, 8, 9, 32, 4].map((index) => (
        <li>{index}</li>
      ))}
    </List>
  );
};
export default TinhTrangDonHang;
