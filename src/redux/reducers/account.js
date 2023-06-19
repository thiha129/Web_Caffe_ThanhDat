import { INIT_STATE } from "../../contant";
import {
  getAccounts,
  getType,
  getAccountsUserName,
  getAccount,
} from "../actions";

export default function AccountsReducers(state = INIT_STATE.accounts, action) {
  switch (action.type) {
    case getType(getAccounts.getAccountsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getAccounts.getAccountsSuccess):
      return {
        ...state,
        isLoading: false,
        dataAccount: action.payload.dataAccount,
        _id: action.payload._id,
        checkUserName: action.payload.checkUserName,
        checkLogin: action.payload.checkLogin,
      };
    case getType(getAccounts.getAccountsFailure):
      return {
        ...state,
        isLoading: false,
      };

    case getType(getAccountsUserName.getAccountsUserNameRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getAccountsUserName.getAccountsUserNameSuccess):
      return {
        ...state,
        isLoading: false,
        dataAccount: action.payload.dataAccount,
        _id: action.payload._id,
        checkUserName: action.payload.checkUserName
      };
    case getType(getAccountsUserName.getAccountsUserNameFailure):
      return {
        ...state,
        isLoading: false,
      };

    case getType(getAccount.getAccountRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getAccount.getAccountSuccess):
      return {
        ...state,
        isLoading: false,
        dataAccount: action.payload.dataAccount,
        _id: action.payload._id,
        checkUserName: action.payload.checkUserName
      };
    case getType(getAccount.getAccountFailure):
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}
