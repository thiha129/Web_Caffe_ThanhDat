import { INIT_STATE } from "../../contant";
import { getType, getCountCart, updateCountCart, deleteCart } from "../actions";

export default function dataCartReducer(state = INIT_STATE.dataCart, action) {
    switch (action.type) {
        case getType(getCountCart.getCountCartRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getCountCart.getCountCartSuccess):
            var tongGia = 0;
            action.payload.data.map(e =>
                tongGia = parseInt(parseInt(e.soLuong) * parseInt(e.giaSanPham))
            )
            return {
                ...state,
                data: action.payload.data,
                totals: action.payload.totals,
                tongGia: tongGia,
                isLoading: false,
            };
        case getType(getCountCart.getCountCartFailure):
            return {
                ...state,
                isLoading: false,
            };
        case getType(updateCountCart.updateCountCartRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(updateCountCart.updateCountCartSuccess):
            return {
                ...state,
                check: action.payload.check,
                isLoading: false,
            };
        case getType(updateCountCart.updateCountCartFailure):
            return {
                ...state,
                isLoading: false,
            };
        case getType(deleteCart.deleteCartRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(deleteCart.deleteCartSuccess):
            return {
                ...state,
                check: action.payload.check,
                isLoading: false,
            };
        case getType(deleteCart.deleteCartFailure):
            return {
                ...state,
                isLoading: false,
            };

        default:
            return state;
    }
}
