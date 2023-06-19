import { INIT_STATE } from "../../contant";
import { getType, getAddPay, getDeleteOderUser, getPayment, changeStatusPayment } from "../actions";

export default function PaymentReducers(state = INIT_STATE.payment, action) {
    switch (action.type) {

        case getType(getPayment.getPaymentRequest):
            return {
                ...state,
                isLoading: false,
            };

        case getType(getPayment.getPaymentSuccess):
            return {
                ...state,
                isLoading: false,
                dataAdmin: action.payload,
            };

        case getType(changeStatusPayment.changeStatusPaymentRequest):
            return {
                ...state,
                isLoading: false,
            };

        case getType(changeStatusPayment.changeStatusPaymentSuccess):

            return {
                ...state,
                isLoading: false,
                checking: action.payload.checked
            };
        case getType(getAddPay.getAddPayRequest):
            return {
                ...state,
                isLoading: true,
                data: action.payload,
                checkpayment: action.payload.checkpayment,
            };

        case getType(getAddPay.getAddPaySuccess):

            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(getAddPay.getAddPayFailure):
            return {
                ...state,
                isLoading: false,
            };


        case getType(getDeleteOderUser.getDeleteOderUserRequest):
            return {
                ...state,
                isLoading: true,
                deleteOrder: action.payload,
            };

        case getType(getDeleteOderUser.getDeleteOderUserSuccess):
            return {
                ...state,
                isLoading: false,
                deleteOrder: action.payload,
            };
        case getType(getDeleteOderUser.getDeleteOderUserFailure):
            return {
                ...state,
                isLoading: false,
            };

        default:
            return state;
    }
}
