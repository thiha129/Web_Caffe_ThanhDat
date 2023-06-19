import { combineReducers } from "redux";

import posts from "./posts";
import sanPham from "./sanPham";
import sanPhamSold from "./sanPhamSold";
import account from "./account";
import payment from "./payment";
import cart from "./cart";
import dataCart from "./dataCart";
import dataSearch from "./dataSearch";
import registerAccount from "./account.register";
import updateInforUser from "./updateInforUser.js";
import notifis from "./notifis.js"
import forgetPassWord from "./forgetPassWord.js";
import order from "./orderStatus.js";
import thongKe from "./thongKe";

// import buyNow from "./buyNow"
export default combineReducers({

  account,
  registerAccount,
  posts,
  sanPham,
  payment,
  cart,
  dataCart,
  dataSearch,
  updateInforUser,
  sanPhamSold,
  notifis,
  forgetPassWord,
  order,
  thongKe
});
