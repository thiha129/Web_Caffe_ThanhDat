import { INIT_STATE } from '../../contant';
import { getType, getSanPhamsSold, getSanPhamsSoldPage } from '../actions';

export default function SanPhamsReducers(state = INIT_STATE.sanPham, action) {
    switch (action.type) {
        case getType(getSanPhamsSold.getSanPhamsSoldRequest):
            return {
                ...state,
                isLoading: true,
                nextPage: 0
            };
        case getType(getSanPhamsSold.getSanPhamsSoldSuccess):
            return {
                ...state,
                isLoading: false,
                dataSold: action.payload,
            };
        case getType(getSanPhamsSold.getSanPhamsSoldFailure):
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}
