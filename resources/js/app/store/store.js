import { configureStore } from "@reduxjs/toolkit";
import appSlice from "../_redux/app-slice";
import analyticsSlice from "../_redux/analytics-slice";
import ticketsSlice from "../_redux/tickets-slice";
import usersSlice from "../_redux/users-slice";
const store = configureStore({
    reducer: {
        app: appSlice,
        analytics: analyticsSlice,
        tickets: ticketsSlice,
        users: usersSlice,
    },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;

export default store;
