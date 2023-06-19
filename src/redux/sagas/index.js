import { takeLatest, call, put, takeEvery } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../../api";

function* fetchAccountsSaga(action) {
  try {
    const Accounts = yield call(api.fetchAccounts, action.payload);
    yield put(actions.getAccounts.getAccountsSuccess(Accounts.data));
    // console.log("[ACCOUNTS_CHECK_LOGIN]", Accounts.data.checkLogin);
  } catch (err) {
    console.error("[fetchAccountsSaga]");
  }
}
function* fetchAccountsUserNameSaga(action) {
  try {
    const Accounts = yield call(api.fetchAccountsUserName, action.payload);
    yield put(
      actions.getAccountsUserName.getAccountsUserNameSuccess(Accounts.data)
    );
    console.log("[ACCOUNTS_CHECK_USER]", Accounts.data.checkUsername);
  } catch (err) {
    console.error("[fetchAccountsUserNameSagaError]");
  }
}
function* fetchAccount(action) {
  try {
    const Accounts = yield call(api.fetchAccount, action.payload);
    yield put(actions.getAccount.getAccountSuccess(Accounts.data));
  } catch (err) {
    console.error("[fetchAccountError]");
  }
}

function* registerAccountsaga(action) {
  try {
    const post = yield call(api.fetchRegister, action.payload);
    yield put(actions.registerAccount.registerAccountSuccess(post.data));
  } catch (err) {
    console.error("[registerAccountsagaError]");
  }
}
function* fetchVerifiSaga(action) {
  try {
    const Accounts = yield call(api.fetchVerify, action.payload);
    yield put(actions.verifyAccount.verifyAccountSuccess(Accounts.data));
  } catch (err) {
    console.error("[fetchVerifiSagaError]");
  }
}

function* registerAccountInforsaga(action) {
  try {
    const acc = yield call(api.fetchRegisterInfor, action.payload);
    yield put(
      actions.registerAccountInfor.registerAccountInforSuccess(acc.data)
    );
  } catch (err) {
    console.error("[registerAccountInforsagaError]");
  }
}

function* fetchForgetPasswordrsaga(action) {
  try {
    const forget = yield call(api.fetchForgetPassword, action.payload);
    yield put(actions.getForgetPassword.getForgetPasswordSuccess(forget.data));
  } catch (err) {
    console.error("fetchForgetPasswordrsagaError");
    // yield put(actions.createPost.createPostFailure(err));
  }
}
function* fetchForgetPasswordVerifiSaga(action) {
  try {
    const forget = yield call(api.fetchForgetPasswordVerify, action.payload);
    yield put(
      actions.getForgetPasswordVerify.getForgetPasswordVerifySuccess(
        forget.data
      )
    );
  } catch (err) { }
}
function* fetchChangePasswordSaga(action) {
  try {
    const change = yield call(api.fetchChangePassword, action.payload);
    yield put(actions.getChangePassword.getChangePasswordSuccess(change.data));
  } catch (err) {
    console.error("fetchChangePasswordSagaError");
  }
}

function* fetchUpdateInforSaga(action) {
  try {
    const update = yield call(api.fetchUpdateInfor, action.payload);
    yield put(actions.getUpdateInfor.getUpdateInforSuccess(update.data));
  } catch (err) {
    console.error("[fetchUpdateInforSagaError]");
  }
}

function* fetchPostSaga(action) {
  try {
    const posts = yield call(api.fetchPosts);
    yield put(actions.getPosts.getPostSuccess(posts.data));
  } catch (error) {
    console.error("[fetchPostSagaError]");
  }
}

function* fetchCreatePostsSaga(action) {
  try {
    const data = yield call(api.fetchCreatePosts, action.payload);
    yield put(actions.createPosts.createPostsSuccess(data.data));
  } catch (error) {
    console.error("[fetchCreatePostsSagaError]");
  }
}

function* fetchUpdatePostsSaga(action) {
  try {
    const data = yield call(api.fetchUpdatePosts, action.payload);
    yield put(actions.updatePosts.updatePostsSuccess(data.data));
    console.log("[fetchUpdatePostsSaga]", data.data);
  } catch (error) {
    console.error("[fetchUpdatePostsSagaError]");
  }
}

function* fetchDelPostsSaga(action) {
  try {
    const data = yield call(api.fetchDelPosts, action.payload);
    yield put(actions.delPosts.delPostsSuccess(data.data));
    console.log("[fetchDelPostsSaga]", data.data);
  } catch (error) {
    console.error("[fetchDelPostsSagaError]");
  }
}

function* fetchNotiSaga(action) {
  try {
    const notifi = yield call(api.fetchNotifis, action.payload);
    console.log("NotiSaga");
    console.log(notifi.data);
    yield put(actions.getNotifis.getNotifisSuccess(notifi.data));
  } catch (error) {
    console.error("[fetchNotiSagaError]");
  }
}

function* fetchSanPhamSaga() {
  try {
    const sanPham = yield call(api.fetchSanPham);
    console.log("[sanPham]", sanPham);
    yield put(actions.getSanPham.getSanPhamSuccess(sanPham.data));
  } catch (error) {
    console.error("[fetchSanPhamSagaError]", error);
  }
}

function* fetchDelSanPhamSaga(action) {
  try {
    const data = yield call(api.fetchDelSanPham, action.payload);
    yield put(actions.deleteSanPham.deleteSanPhamSuccess(data.data));
  } catch (error) {
    console.log("[fetchDelSanPhamSagaERROR]", error);
  }
}

function* fetchCreateSPSaga(action) {
  try {
    const data = yield call(api.fetchCreatSP, action.payload);
    yield put(actions.createSanPham.createSanPhamSuccess(data.data));
  } catch (error) {
    console.log("[fetchCreateSPSagaERROR]", error);
  }
}

function* fetchUpdateSPSage(action) {
  try {
    const data = yield call(api.fetchUpdateSP, action.payload);
    yield put(actions.updateSanPham.updateSanPhamSuccess(data.data));
  } catch (error) {
    console.log("[fetchUpdateSPSage]", error);
  }
}

function* fetchDataPayment() {
  try {
    const data = yield call(api.fetchGetPayment);
    yield put(actions.getPayment.getPaymentSuccess(data.data));
  } catch (error) {
    console.log("[fetchDataPaymentError]", error);
  }
}

function* fetchChangeStatusSaga(action) {
  try {
    const data = yield call(api.fetchChangeStatus, action.payload);
    yield put(
      actions.changeStatusPayment.changeStatusPaymentSuccess(data.data)
    );
  } catch (error) {
    console.log("[fetchDataPaymentError]", error);
  }
}

function* fetchSanPhamPageSaga(action) {
  try {
    const data = yield call(api.fetchSanPhamPage, action.payload);
    yield put(actions.getSanPhamsPage.getSanPhamsPageSuccess(data.data));
  } catch (error) {
    console.log("[fetchSanPhamPageSagaError]");
  }
}

function* fetchSanPhamSoldSaga(action) {
  try {
    const data = yield call(api.fetchDataSanPhamSold, action.payload);
    yield put(actions.getSanPhamsSold.getSanPhamsSoldSuccess(data.data));
    console.log("[fetchSanPhamSoldSaga]", data.data);
  } catch (error) {
    console.log("[fetchSanPhamSoldSagaError]", error);
  }
}

function* fetchAddCartSaga(action) {
  try {
    const add = yield call(api.fetchAddCart, action.payload);
    yield put(actions.getAddCart.getAddCartSuccess(add.data));
  } catch (err) {
    console.error("[fetchAddCartSagaError]");
  }
}
function* fetchDataCartSaga(action) {
  try {
    const data = yield call(api.fetchDataCart, action.payload);
    yield put(actions.getCountCart.getCountCartSuccess(data.data));
    yield put(actions.getBuyNow.getBuyNowSuccess(data.data))
  } catch (err) {
    console.error("[fetchDataCartSagaError]");
  }
}
function* fetchDelCartSaga(action) {
  try {
    const data = yield call(api.fetchDelCart, action.payload);
    yield put(actions.deleteCart.deleteCartSuccess(data.data));
  } catch (err) {
    console.error("[fetchDelCartSagaError]");
  }
}
function* fetchUpdateCartSaga(action) {
  try {
    const data = yield call(api.fetchUpdateCart, action.payload);
    yield put(actions.updateCountCart.updateCountCartSuccess(data.data));
  } catch (err) {
    console.error("[fetchUpdateCartSagaError]");
  }
}
function* fetchTimKiemSaga(action) {
  try {
    const data = yield call(api.fetchTimKiem, action.payload);
    yield put(actions.timKiem.timKiemSuccess(data.data));
  } catch (error) {
    console.error("[fetchTimKiemSagaError]");
  }
}

// lấy trạng thái đơn hàng
function* fetchOrderStatusSaga(action) {
  try {
    const order = yield call(api.fetchOrderStatus, action.payload);
    yield put(actions.getOrderStatus.getOrderStatusSuccess(order.data));
    // console.log("[order]", order.data);
  } catch (error) {
    console.error("[fetchOrderStatusSagaErr]");
  }
}
function* fetchDeleteOrderUserSaga(action) {
  try {
    const deleteO = yield call(api.fetchDeleteOrderStatus, action.payload);
    yield put(
      actions.getDeleteOderUser.getDeleteOderUserSuccess(deleteO.deleteOrder)
    );
    // console.log('[address]',address.data);
  } catch (error) {
    console.error("[fetchDeleteOrderUserSagaErr]");
  }
}
function* fetchAddThongKeSaga(action) {
  try {
    const value = yield call(api.fetchAddThongKe, action.payload);
  } catch (error) {
    console.error("[fetchAddThongKeSagaErr]");

  }
}
function* fetchDataThongKeSaga() {
  try {
    const value = yield call(api.fetchDataThongKe)
    console.log("[fetchDataThongKeSaga_Success]", value);
    yield put(
      actions.getDataThongKe.getDataThongKeSuccess(value.data)
    );
  } catch (error) {
    console.error("[fetchDataThongKeSagaErr]");
  }
}

function* fetchAddPaymentSaga(action) {

  try {
    const add = yield call(api.fetchAddPayment, action.payload);
    yield put(actions.getAddPay.getAddPaySuccess(add.data));
    // console.log('[ad]',all.data);
  } catch (err) {
    console.error("fetchAddPaymentSaga");
  }
}
function* fetchAddNotiSaga(action) {
  try {
    const add = yield call(api.fetchAddNoti, action.payload);
    yield put(actions.getAddNotifition.getAddNotifitionSuccess(add.data));
  } catch (err) {
    console.error("fetchAddNotiSagaError");
  }
}

function* mySaga() {
  yield takeLatest(actions.getAccounts.getAccountsRequest, fetchAccountsSaga);
  yield takeLatest(
    actions.getAccountsUserName.getAccountsUserNameRequest,
    fetchAccountsUserNameSaga
  );
  // lấy thông tin account
  yield takeLatest(actions.getAccount.getAccountRequest, fetchAccount);
  //đăng kí tài khoản
  yield takeLatest(
    actions.registerAccount.registerAccountRequest,
    registerAccountsaga
  );
  yield takeLatest(actions.verifyAccount.verifyAccountRequest, fetchVerifiSaga);
  yield takeLatest(
    actions.registerAccountInfor.registerAccountInforRequest,
    registerAccountInforsaga
  );
  // sửa user
  yield takeLatest(
    actions.getUpdateInfor.getUpdateInforRequest,
    fetchUpdateInforSaga
  );
  // thay đổi pass
  yield takeLatest(
    actions.getForgetPassword.getForgetPasswordRequest,
    fetchForgetPasswordrsaga
  );
  yield takeLatest(
    actions.getForgetPasswordVerify.getForgetPasswordVerifyRequest,
    fetchForgetPasswordVerifiSaga
  );
  yield takeLatest(
    actions.getChangePassword.getChangePasswordRequest,
    fetchChangePasswordSaga
  );
  // =================================================================================================
  yield takeLatest(actions.getPosts.getPostsRequest, fetchPostSaga);
  yield takeLatest(
    actions.updatePosts.updatePostsRequest,
    fetchUpdatePostsSaga
  );
  yield takeLatest(actions.delPosts.delPostsRequest, fetchDelPostsSaga);
  yield takeLatest(
    actions.createPosts.createPostsRequest,
    fetchCreatePostsSaga
  );

  yield takeLatest(actions.getNotifis.getNotifisRequest, fetchNotiSaga);
  yield takeLatest(actions.getSanPham.getSanPhamRequest, fetchSanPhamSaga);
  yield takeLatest(
    actions.getSanPhamsPage.getSanPhamsPageRequest,
    fetchSanPhamPageSaga
  );
  yield takeLatest(
    actions.deleteSanPham.deleteSanPhamRequest,
    fetchDelSanPhamSaga
  );
  yield takeLatest(
    actions.createSanPham.createSanPhamRequest,
    fetchCreateSPSaga
  );
  yield takeLatest(
    actions.updateSanPham.updateSanPhamRequest,
    fetchUpdateSPSage
  );
  yield takeLatest(actions.getPayment.getPaymentRequest, fetchDataPayment);
  yield takeLatest(
    actions.changeStatusPayment.changeStatusPaymentRequest,
    fetchChangeStatusSaga
  );
  yield takeLatest(actions.getAddPay.getAddPayRequest, fetchAddPaymentSaga);
  // yield takeLatest(actions.getSanPham.getSanPhamRequest, fetchSanPhamSaga);
  // yield takeLatest(actions.getSanPhamsPage.getSanPhamsPageRequest, fetchSanPhamPageSaga);
  yield takeLatest(actions.getAddCart.getAddCartRequest, fetchAddCartSaga);
  yield takeLatest(actions.getCountCart.getCountCartRequest, fetchDataCartSaga);
  yield takeLatest(actions.deleteCart.deleteCartRequest, fetchDelCartSaga);
  yield takeLatest(actions.getAddNotifition.getAddNotifitionRequest, fetchAddNotiSaga);

  yield takeLatest(
    actions.updateCountCart.updateCountCartRequest,
    fetchUpdateCartSaga
  );
  yield takeLatest(actions.timKiem.timKiemRequest, fetchTimKiemSaga);
  //lam torng nay
  yield takeLatest(
    actions.getSanPhamsSold.getSanPhamsSoldRequest,
    fetchSanPhamSoldSaga
  );

  // lấy trạng thái đơn hàng
  yield takeLatest(
    actions.getOrderStatus.getOrderStatusRequest,
    fetchOrderStatusSaga
  );
  yield takeLatest(
    actions.getDeleteOderUser.getDeleteOderUserRequest,
    fetchDeleteOrderUserSaga
  );
  yield takeLatest(actions.addThongKe.addThongKeRequest, fetchAddThongKeSaga);
  yield takeLatest(actions.getDataThongKe.getDataThongKeRequest, fetchDataThongKeSaga);
}

export default mySaga;
