import { INIT_STATE } from "../../contant";
import { addThongKe, getDataThongKe, getType } from "../actions";

export default function notifisReducers(state = INIT_STATE.dataThongKe, action) {
    switch (action.type) {
        case getType(getDataThongKe.getDataThongKeRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getDataThongKe.getDataThongKeSuccess):
            const lables = []
            const id = []
            const data = []

            action.payload.map((a, b) => {
                if (id.indexOf(a.id_SanPham) == -1) {
                    id.push(a.id_SanPham)
                    var count = 0;
                    action.payload.filter(e => {
                        if (e.id_SanPham === a.id_SanPham) {
                            count = count + e.soLuongBan
                        }
                    })
                    data.push(count)
                    lables.push(a.tenSanPham)
                }
            })
            console.log("[addThongKeSuccess_lables]", lables);

            return {
                ...state,
                isLoading: false,
                data: action.payload,
                labels: lables,
                soLuongBan: data
            };
        case getType(getDataThongKe.getDataThongKeFailure):
            return {
                ...state,
                isLoading: false,
            };
        case getType(addThongKe.addThongKeRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(addThongKe.addThongKeSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getType(addThongKe.addThongKeFailure):
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}
