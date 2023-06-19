import { createActions } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};

export const getAccounts = createActions({
  getAccountsRequest: (payload) => payload,
  getAccountsSuccess: (payload) => payload,
  getAccountsFailure: (err) => err,
});

export const getAccount = createActions({
  getAccountRequest: (payload) => payload,
  getAccountSuccess: (payload) => payload,
  getAccountFailure: (err) => err,
});

// lấy danh sách các bài viết
export const getPosts = createActions({
  getPostsRequest: undefined,
  getPostSuccess: (payload) => payload,
  getPostFailure: (err) => err,
});

//  Tạo bài viết mới (quản lý)
export const createPosts = createActions({
  createPostsRequest: (payload) => payload,
  createPostsSuccess: (payload) => payload
})

// chỉnh sửa bài viết (quản lý)
export const updatePosts = createActions({
  updatePostsRequest: (payload) => payload,
  updatePostsSuccess: (payload) => payload
})

// xóa bài viết (quản lý)
export const delPosts = createActions({
  delPostsRequest: (payload) => payload,
  delPostsSuccess: (payload) => payload
})

export const getNotifis = createActions({
  getNotifisRequest: (payload) => payload,
  getNotifisSuccess: (payload) => payload,
  getNotifisFailure: (err) => err,
});

export const getAccountsUserName = createActions({
  getAccountsUserNameRequest: (payload) => payload,
  getAccountsUserNameSuccess: (payload) => payload,
  getAccountsUserNameFailure: (err) => err,
});

// Lấy toàn bộ sản phẩm
export const getSanPham = createActions({
  getSanPhamRequest: undefined,
  getSanPhamSuccess: (payload) => payload,
  getSanPhamFailure: (err) => err,
});

// tạo sản phẩm mới (quản lý)
export const createSanPham = createActions({
  createSanPhamRequest: (payload) => payload,
  createSanPhamSuccess: (payload) => payload,
});

// chỉnh sửa sản phẩm (quản lý)
export const updateSanPham = createActions({
  updateSanPhamRequest: (payload) => payload,
  updateSanPhamSuccess: (payload) => payload,
});

// xóa sản phẩm (quản lý)
export const deleteSanPham = createActions({
  deleteSanPhamRequest: (payload) => payload,
  deleteSanPhamSuccess: (payload) => payload,
});

// lấy danh sách giỏ hàng
export const getPayment = createActions({
  getPaymentRequest: () => undefined,
  getPaymentSuccess: (payload) => payload,
});

// Thay đổi trạng thái giỏ hàng
export const changeStatusPayment = createActions({
  changeStatusPaymentRequest: (payload) => payload,
  changeStatusPaymentSuccess: (payload) => payload,
});

//thêm vào giỏ hàng
export const getAddCart = createActions({
  getAddCartRequest: (payload) => payload,
  getAddCartSuccess: (payload) => payload,
  getAddCartFailure: (err) => err,
});

//Lấy số lượng hàng
export const getCountCart = createActions({
  getCountCartRequest: (payload) => payload,
  getCountCartSuccess: (payload) => payload,
  getCountCartFailure: (err) => err,
});

export const getSanPhamsPage = createActions({
  getSanPhamsPageRequest: (payload) => payload,
  getSanPhamsPageSuccess: (payload) => payload,
  getSanPhamsPageFailure: (err) => err,
});

//Cập nhật sản phẩm khi sau sửa đổi
export const deleteCart = createActions({
  deleteCartRequest: (payload) => payload,
  deleteCartSuccess: (payload) => payload,
  deleteCartFailure: (err) => err,
});

// Sản phẩm đã bán
export const getSanPhamsSold = createActions({
  getSanPhamsSoldRequest: (payload) => payload,
  getSanPhamsSoldSuccess: (payload) => payload,
  getSanPhamsSoldFailure: (err) => err,
});

//Cập nhật sản phẩm khi sau sửa đổi
export const updateCountCart = createActions({
  updateCountCartRequest: (payload) => payload,
  updateCountCartSuccess: (payload) => payload,
  updateCountCartFailure: (err) => err,
});

export const timKiem = createActions({
  timKiemRequest: (payload) => payload,
  timKiemSuccess: (payload) => payload,
  timKiemFailure: (err) => err,
});
// đăng kí tài khoản
export const registerAccount = createActions({
  registerAccountRequest: (payload) => payload,
  registerAccountSuccess: (payload) => payload,
  registerAccountFailure: (err) => err,
});

export const verifyAccount = createActions({
  verifyAccountRequest: (payload) => payload,
  verifyAccountSuccess: (payload) => payload,
  verifyAccountFailure: (err) => err,
});

export const registerAccountInfor = createActions({
  registerAccountInforRequest: (payload) => payload,
  registerAccountInforSuccess: (payload) => payload,
  registerAccountInforFailure: (err) => err,
});
//update account
export const getUpdateInfor = createActions({
  getUpdateInforRequest: (payload) => payload,
  getUpdateInforSuccess: (payload) => payload,
  getUpdateInforFailure: (err) => err,
});
// ==================================================
// thay đổi mật khẩu

export const getForgetPassword = createActions({
  getForgetPasswordRequest: (payload) => payload,
  getForgetPasswordSuccess: (payload) => payload,
  getForgetPasswordFailure: (err) => err,
});
export const getForgetPasswordVerify = createActions({
  getForgetPasswordVerifyRequest: (payload) => payload,
  getForgetPasswordVerifySuccess: (payload) => payload,
  getForgetPasswordVerifyFailure: (err) => err,
});
export const getChangePassword = createActions({
  getChangePasswordRequest: (payload) => payload,
  getChangePasswordSuccess: (payload) => payload,
  getChangePasswordFailure: (err) => err,
});
// lấy trạng thái đơn hàng
export const getOrderStatus = createActions({
  getOrderStatusRequest: (payload) => payload,
  getOrderStatusSuccess: (payload) => payload,
  getOrderStatusFailure: (err) => err,
});

export const getDeleteOderUser = createActions({
  getDeleteOderUserRequest: (payload) => payload,
  getDeleteOderUserSuccess: (payload) => payload,
  getDeleteOderUserFailure: (err) => err,
});

export const addThongKe = createActions({
  addThongKeRequest: (payload) => payload,
  addThongKeSuccess: (payload) => payload,
  addThongKeFailure: (err) => err,
});

export const getDataThongKe = createActions({
  getDataThongKeRequest: (payload) => payload,
  getDataThongKeSuccess: (payload) => payload,
  getDataThongKeFailure: (err) => err,
});
export const getAddPay = createActions({
  getAddPayRequest: (payload) => payload,
  getAddPaySuccess: (payload) => payload,
  getAddPayFailure: (err) => err
})
export const getBuyNow = createActions({
  getBuyNowRequest: (payload) => undefined,
  getBuyNowSuccess: (payload) => payload,
  getBuyNowFailure: (err) => err
})
export const getAddNotifition = createActions({
  getAddNotifitionRequest: (payload) => payload,
  getAddNotifitionSuccess: (payload) => payload,
  getAddNotifitionFailure: (err) => err
})
