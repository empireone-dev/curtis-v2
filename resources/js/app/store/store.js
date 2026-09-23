import { configureStore } from "@reduxjs/toolkit";
import appSlice from "../_redux/app-slice";
import analyticsSlice from "../_redux/analytics-slice";
import ticketsSlice from "../_redux/tickets-slice";
const store = configureStore({
    reducer: {
        app: appSlice,
        analytics: analyticsSlice,
        tickets: ticketsSlice,
    },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;

export default store;
