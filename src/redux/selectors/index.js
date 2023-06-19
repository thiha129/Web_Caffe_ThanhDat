export const dataAccount$ = (state) => state.account.dataAccount;
export const _idAccount$ = (state) => state.account._id;
export const checkUpdate$ = (state) => state.updateInforUser.data.checkUpdate;
export const checkUsername$ = (state) => state.account.checkUsername;
export const checkLogin$ = (state) => state.account.checkLogin;

export const dataThongKe$ = (state) => state.thongKe.data;
export const labelsThongKe$ = (state) => state.thongKe.labels;
export const soLuongBanThongKe$ = (state) => state.thongKe.soLuongBan;

export const checkOtp$ = (state) => state.registerAccount.checkOtp;
export const checkRegister$ = (state) => state.registerAccount.checkVerify;
export const notiState$ = (state) => state.notifis.data.datanoti;
export const postsState$ = (state) => state.posts.data;
export const postsCheckedState$ = (state) => state.posts.isChecking;

export const sanPhamState$ = (state) => state.sanPham.data;
export const sanPhamAllstate$ = (state) => state.sanPham.dataAll;
export const countPage$ = (state) => state.sanPham.countPage;
export const sanPhamCheckedState$ = (state) => state.sanPham.checking;
export const sanPhamSoldState$ = (state) => state.sanPhamSold.dataSold;

export const timKiemData$ = (state) => state.dataSearch.data;
export const timKiemChecking$ = (state) => state.dataSearch.checkTimKiem;
export const timKiemCountPage$ = (state) => state.dataSearch.countPage;
export const textTimKiem$ = (state) => state.dataSearch.text;

export const paymentState$ = (state) => state.payment.dataAdmin;
export const paymentStateChecking$ = (state) => state.payment.checking;
export const checkPay$ = (state) => state.payment.checkpayment;
export const cartOrder$ = (state) => state.cart.data;

export const cartData$ = (state) => state.dataCart.data;
export const allNumberCountCart$ = (state) => state.dataCart.totals;
export const sumCart$ = (state) => state.dataCart.tongGia;
export const checkCart$ = (state) => state.dataCart.check;
export const isLoadingCart$ = (state) => state.dataCart.isLoading;

export const checkForgetPassword_phone$ = (state) =>
  state.forgetPassWord.checkForgetPassword_phone;
export const checkForgetPassword_otp$ = (state) =>
  state.forgetPassWord.checkOtp;

// tình trạng đơn hàng
export const checkOrder$ = (state) => state.order.data;
export const checkAddress$ = (state) => state.address.data;
export const dataSelectXacNhan$ = (state) => state.order.xacnhan;
export const dataSelectDaXacNhan$ = (state) => state.order.daxacnhan;
export const dataSelectDangGiao$ = (state) => state.order.danggiao;
export const dataSelectDaGiao$ = (state) => state.order.dagiao;
export const dataSelectDaHuy$ = (state) => state.order.dahuy;
export const buyNow$ = (state) => state.buyNow;
