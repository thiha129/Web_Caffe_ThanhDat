import React, { useState, useEffect, useRef } from "react";

import { Button1 } from "./Button1";
import { Button2 } from "./Button2";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";
import {
  dataAccount$,
  cartData$,
  timKiemChecking$,
  timKiemData$,
  notiState$,
  allNumberCountCart$,
  _idAccount$,
} from "../redux/selectors";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

import "../css/Navbar.css";
import "../css/thongbao.css";
import "../css/Phantrang.css";
import "../css/Hovermenu.css";
import Tag from "./Tag";

import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BadgeUnstyled from "@mui/core/BadgeUnstyled";
import { CSSTransition } from "react-transition-group";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

// popup
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};

const StyledBadge = styled(BadgeUnstyled)`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 12px;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: "tnum";
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  position: relative;
  display: inline-block;
  line-height: 1;

  & .MuiBadge-badge {
    z-index: auto;
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    color: #009387;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    white-space: nowrap;
    text-align: center;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 0 2px #009387;
  }

  & .MuiBadge-dot {
    padding: 0;
    z-index: auto;
    min-width: 6px;
    width: 6px;
    height: 6px;
    background: #ff4d4f;
    border-radius: 100%;
    box-shadow: 0 0 0 1px #fff;
  }

  & .MuiBadge-anchorOriginTopRightCircular {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    transform-origin: 100% 0;
  }
`;

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const [count, setCount] = useState(0);

  const [tenNguoiDung, setTenNguoiDung] = useState("");
  const [checkAccount, setCheckAccount] = useState(true);

  const dispatch = useDispatch();
  const dataTimKiem = useSelector(timKiemData$);
  const checkingTimKiem = useSelector(timKiemChecking$);
  const allNumberCountCart = useSelector(allNumberCountCart$);
  const cartData = useSelector(cartData$);
  const dataUser = useSelector(dataAccount$);
  const getIDAccount = useSelector(_idAccount$);
  const phone = localStorage.getItem("PhoneNumber");
  const pass = localStorage.getItem("PassWord");
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  // lấy user

  useEffect(() => {
    if (phone != "" || pass != "") {
      dispatch(
        actions.getAccountsUserName.getAccountsUserNameRequest({
          phonenumber: phone,
        }),
        actions.getAccount.getAccountRequest({
          phonenumber: phone,
        })
      );
      dispatch(actions.getCountCart.getCountCartRequest(getIDAccount));
    }
  }, [phone]);

  React.useEffect(() => {
    dispatch(actions.getSanPhamsPage.getSanPhamsPageRequest({ pagenumber: 0 }));
  }, [dispatch]);

  useEffect(() => {
    setCount(allNumberCountCart);
  }, [allNumberCountCart, cartData]);

  const [avatar, setAvatar] = React.useState("");
  React.useEffect(() => {
    try {
      if (dataUser.length != 0) {
        localStorage.setItem("idUser", dataUser._id);
        setAvatar(dataUser.avatar);
        setTenNguoiDung(dataUser.nameUser);
        dispatch(actions.getCountCart.getCountCartRequest(getIDAccount));
        setCheckAccount(false);
        console.log("[nameUser]", dataUser);
      } else {
        setCheckAccount(true);
      }
    } catch (error) {}
  }, [dataUser]);

  const ProfileUser = () => {
    window.location.replace("/profile");
  };

  const LogOutUser = async () => {
    const phone = localStorage.getItem("PhoneNumber");
    const pass = localStorage.getItem("PassWord");
    localStorage.removeItem("PhoneNumber");
    localStorage.removeItem("PassWord");
    localStorage.removeItem("idUser");
    window.location.replace("/");
  };

  const testKey = (e) => {
    if (e.code === "Enter") {
      dispatch(actions.timKiem.timKiemRequest({ text: e.target.value }));
      const pathnameSearch = "sanpham";
      if (
        String(window.location.pathname).slice(
          1,
          String(pathnameSearch).length + 1
        ) !== pathnameSearch &&
        String(e.target.value).trim() !== ""
      ) {
        window.location.replace(`/sanpham&search=${e.target.value}`);
      }
    }
  };
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {};
  const handleClose = () => {
    setOpen(false);
  };
  const clickProfile = () => {
    if (getIDAccount !== "") {
      window.location.replace("/profile");
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-menucongcu">
          <div className="menucongcu">
            <div className="congcutrai">
              <div>
                <Link to="/">
                  <img className="header__logo" src="./logo.png" alt="" />
                </Link>
              </div>
            </div>
            <div className="congcuphai">
              <div>
                {checkAccount ? (
                  <Link
                    to="/"
                    className="buttoncongcu"
                    onClick={closeMobileMenu}
                  >
                    <Button1 to="/" buttonStyle="btn btn--primary ">
                      <>Đăng nhập</>
                    </Button1>
                  </Link>
                ) : (
                  <div className="buttoncongcu">
                    <div buttonStyle="btn btn--primary ">
                      <Stack direction="row" spacing={2}>
                        <Avatar src={avatar} sx={{ width: 22, height: 22 }} />
                        <div
                          style={{
                            marginLeft: 3,
                            marginTop: 2,
                            cursor: "pointer",
                          }}
                        >
                          {tenNguoiDung}
                        </div>
                      </Stack>
                      {/* <img src={avatar} style={{ width: 50, height: 50 }} /> */}
                    </div>
                  </div>
                )}
              </div>
              <div>
                {checkAccount ? (
                  <Link
                    to="/"
                    className="buttoncongcu"
                    onClick={closeMobileMenu}
                  >
                    <div>
                      <Button2 to="/" buttonStyle="btn--nooutline">
                        Đăng ký
                      </Button2>
                    </div>
                  </Link>
                ) : (
                  <div className="buttoncongcu ">
                    <div>
                      <div
                        className="Logout"
                        style={{
                          marginTop: 2,
                          cursor: "pointer",
                          padding: "2px",
                        }}
                        buttonStyle="btn--nooutline"
                        onClick={() => LogOutUser()}
                      >
                        Đăng xuất
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* -------------------------------------------------- */}
        <div className="maumenu">
          <div className="containermenu">
            <div>
              <Link to="/">
                <img
                  className="header__logomobile"
                  src="https://lehoangdiepthao.com/wp-content/uploads/2020/09/kingcoffe-logo.png"
                  alt=""
                />
              </Link>
              <Link to="/" className="congcuan" onClick={closeMobileMenu}>
                Trang chủ
              </Link>
            </div>
            <div>
              <Link
                to="/sanpham"
                className="congcuan"
                onClick={closeMobileMenu}
              >
                Sản phẩm
              </Link>
            </div>
            <div>
              <Link to="/posts" className="congcuan" onClick={closeMobileMenu}>
                Bài viết
              </Link>
            </div>
            <div className="header_search">
              <Paper
                style={{
                  width: "50%",
                  display: "flex",
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Tìm kiếm ..."
                  inputProps={{ "aria-label": "search google maps" }}
                  onKeyPress={testKey}
                />
                <IconButton
                  style={{ padding: "0px 5px 0px 0px" }}
                  onClick={() => console.log(123)}
                  aria-label="search"
                ></IconButton>
              </Paper>
            </div>

            <div>
              <IconButton aria-label="cart" className="congcuan">
                <Link to="/giohang">
                  <StyledBadge badgeContent={count} showZero overlap="circular">
                    <ShoppingCartIcon
                      style={{
                        color: "white",
                      }}
                    />
                  </StyledBadge>
                </Link>
              </IconButton>
            </div>
            <div>
              <NavItem>
                <DropdownMenu></DropdownMenu>
              </NavItem>
            </div>
            <div>
              <div to="" className="congcuan" onClick={() => clickProfile()}>
                <PersonOutlineOutlinedIcon style={{ color: "white" }} />
              </div>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle style={{ fontSize: "20px", fontWeight: "bold" }}>
                  Thông báo!!!
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Bạn cần đăng nhập để xem thông tin cá nhân
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    style={{ color: "red" }}
                    onClick={() => window.location.replace("/dangnhap")}
                  >
                    Đăng nhập
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            <IconContext.Provider value={{ color: "#fff" }}>
              <div className="navbar1">
                <Link to="/" className="menu-bars1">
                  <FaIcons.FaBars onClick={showSidebar} />
                </Link>
              </div>
              <nav className={sidebar ? "nav-menu1 active" : "nav-menu1"}>
                <ul className="nav-menu1-items" onClick={showSidebar}>
                  <li className="navbar-toggle1">
                    <Link to="/" className="menu-bars1">
                      <AiIcons.AiOutlineClose />
                    </Link>
                  </li>
                  {SidebarData.map((item, index) => {
                    return (
                      <li key={index} className={item.cName}>
                        <Link to={item.path}>
                          {item.icon}
                          <span className="nav-text1">{item.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </IconContext.Provider>
          </div>
        </div>
      </nav>
    </>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  let domNode = useClickOutside(() => {
    setOpen(false);
  });
  return (
    <div className="" ref={domNode}>
      <div className="congcuan" onClick={() => setOpen(!open)}>
        <NotificationsNoneOutlinedIcon style={{ color: "white" }} />
      </div>
      {open && props.children}
    </div>
  );
}

function NavItem1(props) {
  const [open, setOpen] = useState(false);
  let domNode = useClickOutside(() => {
    setOpen(false);
  });
  return (
    <li className="nav-item" ref={domNode}>
      <li class="nav-links" onClick={() => setOpen(!open)}>
        <div class="wrappermenu">
          <div class="icon menu">
            <div>
              <div class="text-nav">Thông tin</div>
            </div>
          </div>
        </div>
      </li>
      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    const notis = useSelector(notiState$);

    const dispatch = useDispatch();
    const data = [];
    const Mainid = "61a59db5f3c3df3ba061be4d";
    React.useEffect(() => {
      dispatch(actions.getNotifis.getNotifisRequest(Mainid));
    }, [dispatch]);
    console.log("[NotiList-notifis]", notis);
    data.push.apply(data, notis);
    const listItems = data.slice(0, 4).map((item) => (
      <div className="notis-size">
        <li class="notify-item ">
          <a class="notify_link">
            <img
              className="notify_img"
              src="https://dacsanbanme.com/wp-content/uploads/2018/01/c1-300x300.png"
            ></img>

            <div class="notify_info">
              <div class="title-link">{item.title}</div>
              <div class="sub_title">{item.content}</div>
            </div>
          </a>
        </li>
      </div>
    ));
    return <div>{listItems}</div>;
  }

  return (
    <ul class="notification_ul">
      <header class="header__notify">
        <h2>Thông báo</h2>
      </header>
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menun">
          <DropdownItem></DropdownItem>
          <div class="show_all">
            <p class="show_all-title">Hiện tất cả thông báo</p>
          </div>
        </div>
      </CSSTransition>
    </ul>
  );
}

export default Navbar;
