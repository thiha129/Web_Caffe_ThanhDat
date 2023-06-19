import axios from "axios";
// const URL = "https://thanh-dat-coffee.herokuapp.com";
const URL = "http://localhost:3030";
// const URL = "http://103.75.185.148:3030";

export const fetchAccounts = (payload) =>
  axios.post(
    `${URL}/account/login?phonenumber=${payload.phonenumber}&password=${payload.password}`
  );
export const fetchAccountsUserName = (payload) =>
  axios.post(`${URL}/account/?phonenumber=${payload.phonenumber}`);
export const fetchAccount = (payload) =>
  axios.post(`${URL}/account/?phonenumber=${payload.phonenumber}`);
export const fetchRegister = (payload) =>
  axios.post(
    `${URL}/account/register?phonenumber=${payload.phonenumber}&channel=${payload.channel}&otp=${payload.otp}&username=${payload.username}&birthday=${payload.birthday}&password=${payload.password}`
  );
export const fetchVerify = (payload) =>
  axios.post(
    `${URL}/account/verify?phonenumber=${payload.phonenumber}&code=${payload.code}`
  );
export const fetchRegisterInfor = (payload) =>
  axios.post(
    `${URL}/account/registerinfor?phonenumber=${payload.phonenumber}&otp=${payload.otp}&username=${payload.username}&birthday=${payload.birthday}&password=${payload.password}&address=${payload.address}&specificaddress=${payload.specificaddress}&tinhTp=${payload.tinhTp}&xaPhuong=${payload.xaPhuong}&quanHuyen=${payload.quanHuyen}`
  );
export const fetchUpdateInfor = (payload) =>
  axios.post(`${URL}/account/editinforuser`, payload);
export const fetchPosts = () => axios.get(`${URL}/posts`);
export const fetchCreatePosts = (payload) =>
  axios.post(`${URL}/posts/newpost`, payload);
export const fetchUpdatePosts = (payload) =>
  axios.post(`${URL}/posts/update`, payload);
export const fetchDelPosts = (payload) =>
  axios.get(`${URL}/posts/delete?_id=${payload._id}`);
export const fetchNotifis = (payload) =>
  axios.get(`${URL}/notifi?id_Account=${payload}`);
export const fetchAddNoti = (payload) =>
  axios.post(
    `${URL}/notifi/add?title=${payload.title}&body=${payload.body}&id_hoadon=${payload.id_hoadon}&id_Account=${payload.id_Account}`
  );

export const fetchSanPham = () => axios.get(`${URL}/san-pham`);
export const fetchSanPhamPage = (payload) =>
  axios.get(`${URL}/san-pham?pagenumber=${payload.pagenumber}&perPage=8`);
export const fetchUpdateSP = (payload) =>
  axios.post(`${URL}/san-pham/update`, payload);
export const fetchDelSanPham = (payload) =>
  axios.get(`${URL}/san-pham/delete?_id=${payload._id}`);
export const fetchCreatSP = (payload) =>
  axios.post(`${URL}/san-pham/new`, payload);
export const fetchTimKiem = (payload) =>
  axios.get(`${URL}/san-pham/search?text=${payload.text}&perPage=8`);
export const fetchDataSanPhamSold = () => axios.get(`${URL}/san-pham/sold`);

export const fetchGetPayment = () => axios.get(`${URL}/thanh-toan/all`);
export const fetchChangeStatus = (payload) =>
  axios.post(`${URL}/thanh-toan/change`, payload);

export const fetchAddCart = (payload) =>
  axios.get(
    `${URL}/gio-hang?id_Account=${payload.id_Account}&_id=${payload._id}&tenSanPham=${payload.tenSanPham}&giaSanPham=${payload.giaSanPham}&soLuong=${payload.soLuong}&tongGiaBan=${payload.tongGiaBan}&img=${payload.img}&typeProduct=${payload.typeProduct}&flashSale=${payload.flashSale}&price=${payload.price}&priceSale=${payload.priceSale}`
  );

export const fetchDataCart = (payload) =>
  axios.get(`${URL}/gio-hang/data?id_Account=${payload}`);
export const fetchDelCart = (payload) =>
  axios.post(`${URL}/gio-hang/delete`, payload);
export const fetchUpdateCart = (payload) =>
  axios.post(`${URL}/gio-hang/update`, payload);

export const fetchAddPayment = (payload) =>
  axios.post(`${URL}/thanh-toan`, payload);

// thay đổi mk
export const fetchForgetPassword = (payload) =>
  axios.post(
    `${URL}/account/forgetpassword?phonenumber=${payload.phonenumber}&channel=${payload.channel}`
  );
export const fetchForgetPasswordVerify = (payload) =>
  axios.post(
    `${URL}/account/verifyforgetpassword?phonenumber=${payload.phonenumber}&code=${payload.code}`
  );
export const fetchChangePassword = (payload) =>
  axios.post(
    `${URL}/account/changepassword?phonenumber=${payload.phonenumber}&password=${payload.password}`
  );
// tình trạng đơn hàng
export const fetchOrderStatus = (payload) =>
  axios.post(`${URL}/thanh-toan/orderstatus?iduser=${payload.iduser}`);

export const fetchDeleteOrderStatus = (payload) =>
  axios.post(`${URL}/thanh-toan/deleteorderuser`, payload);

export const fetchAddThongKe = (payload) =>
  axios.post(`${URL}/thongke/add`, payload);
export const fetchDataThongKe = () => axios.get(`${URL}/thongke/data`);
