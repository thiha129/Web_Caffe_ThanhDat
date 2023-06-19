import React from "react";
import Navbar from "./components/Navbar";
import Navbar1 from "./components/Navbar1";
import Home from "./components/pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sanpham from "./components/pages/Sanpham";
import Products from "./components/pages/Products";
import Profile from "./components/pages/Profile";
import Dangky from "./components/pages/Dangky";
import Dangnhap from "./components/pages/Dangnhap";
import dangkySDT from "./components/pages/DangKySDT";
import dangKyUser from "./components/pages/DangKyUser";
import ForgetPass from "./components/pages/Forget_PassWord";
import ForgetPassword from "./components/pages/Forget_ChangePassWord";
import ImageResizeCropComponent from "./components/CropMultiqle"

import Posts from "./components/pages/Posts";
import QuanLyKho from "./components/pages/QuanLyKho";
import Phantrang from "./components/pages/Phantrang";
import Chitietsanpham from "./components/Chitietsanpham";
import Chitietbaiviet from "./components/Chitietbaiviet";
import Giohang from "./components/Giohang";
import Danhsachsanpham from "./components/Danhsachsanpham";
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";
import AppContext from "./components/AppContext";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "./redux/reducers";
import mySaga from "./redux/sagas";
import TimKiemScreen from "./components/TimKiemScreen";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga);

function App() {
  const initialState = { user: null, sanPham: [] };
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/sanpham&search=:search" component={Sanpham} />
          <Route path="/sanpham" component={Sanpham} />
          <Route path="/quanlykho" component={QuanLyKho} />
          <Route path="/posts" component={Posts} />
          <Route path="/products" component={Products} />
          <Route path="/a" component={ImageResizeCropComponent} />
          <Route path="/chitietsanpham&id=:id&page=:page" component={Chitietsanpham} />
          <Route path="/chitietbaiviet&id=:id" component={Chitietbaiviet} />
          <Route path="/giohang" component={Giohang} />
          <Route path="/profile&numtoggle=:numtoggle" component={Profile} />
          <Route path="/profile" component={Profile} />
          <Route path="/dangky" component={Dangky} />
          <Route path="/dangkySDT" component={dangkySDT} />
          <Route path="/dangKyUser" component={dangKyUser} />
          <Route path="/ForgetPass" component={ForgetPass} />
          {/* <Route path="/ForgetPassWord" component={ForgetPassword} /> */}

          <Route path="/dangnhap" component={Dangnhap} />
          <Route path="/Phantrang" component={Phantrang} />
          <Route path="/danhsachsanpham" component={Danhsachsanpham} />
          <Route path="/timkiem" component={TimKiemScreen} />
          {/* <Route path='/testkho' component={Testkho} /> */}
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
