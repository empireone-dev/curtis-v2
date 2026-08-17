import { configureStore } from "@reduxjs/toolkit";
import appSlice from "../_redux/app-slice";
import analyticsSlice from "../_redux/analytics-slice";
const store = configureStore({
    reducer: {
        app: appSlice,
        analytics: analyticsSlice,
    },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;

export default store;
