import { INIT_STATE } from "../../contant";
import { getSanPham, getType, deleteSanPham, updateSanPham, createSanPham, getSanPhamsPage } from "../actions";

export default function sanPhamReducers(state = INIT_STATE.sanPham, action) {
    switch (action.type) {
        case getType(getSanPham.getSanPhamRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getSanPham.getSanPhamSuccess):
            return {
                ...state,
                isLoading: false,
                dataAll: action.payload.dataPhanTrang,
            };
        case getType(getSanPham.getSanPhamFailure):
            return {
                ...state,
                isLoading: false,
            };
        case getType(createSanPham.createSanPhamRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getSanPhamsPage.getSanPhamsPageRequest):

            return {
                ...state,
                isLoading: true,
            };
        case getType(createSanPham.createSanPhamSuccess):
            return {
                ...state,
                isLoading: false,
                checking: action.payload,
            };
        case getType(updateSanPham.updateSanPhamRequest):
            return {
                ...state,
                isLoading: true
            };
        case getType(updateSanPham.updateSanPhamSuccess):
            return {
                ...state,
                isLoading: false,
                checking: action.payload,
            };
        case getType(deleteSanPham.deleteSanPhamRequest):
            return {
                ...state,
                isLoading: true
            };
        case getType(deleteSanPham.deleteSanPhamSuccess):
            return {
                ...state,
                isLoading: false,
                checking: action.payload,
            };
        case getType(getSanPhamsPage.getSanPhamsPageSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload.dataPhanTrang,
                countPage: action.payload.countPage,
            };
        case getType(getSanPhamsPage.getSanPhamsPageFailure):
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}
