export const INIT_STATE = {
  accounts: {
    isLoading: false,
    userName: "",
    _id: "",
    dataAccount: [],
    checkUserName: "",
    checkUpdate: "",
    checkLogin: "",
  },

  registerAccount: {
    isLoading: false,
    data: [],
    checkVerify: "",
    checkOtp: "",
  },
  posts: {
    isLoading: false,
    data: [],
    isChecking: [],
  },
  notifis: {
    isLoading: false,
    data: [],
  },
  sanPham: {
    isLoading: false,
    data: [],
    countPage: 0,
    dataSold: [],
    dataAll: [],
  },
  cart: {
    isLoading: false,
    data: [],
  },
  dataCart: {
    isLoading: false,
    data: [],
    totals: 0,
    checkDel: 0,
    tongGia: 0,
  },
  timKiem: {
    isLoading: false,
    data: [],
    checkTimKiem: -1,
    countPage: 0,
    text: "",
  },
  payment: {
    isLoading: false,
    data: [],
    checking: 0,
    dataAdmin: [],
    checkpayment: "",
  },
  uploadimg: {
    isLoading: false,
    data: [],
  },
  order: {
    isLoading: false,
    data: [],
    xacnhan: [],
    daxacnhan: [],
    danggiao: [],
    dagiao: [],
    dahuy: [],
    dataThongKe: [],
  },
  dataThongKe: {
    data: [],
    labels: [],
    soLuongBan: [],
  },
};
