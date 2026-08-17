import { get_analytics_service } from "../services/analytics-service";
import { analyticsSlice } from "./analytics-slice";

export function get_analytics_thunk() {
    return async function (dispatch, getState) {
        const result = await get_analytics_service();
        dispatch(analyticsSlice.actions.setAnalytics(result));
    };
}
