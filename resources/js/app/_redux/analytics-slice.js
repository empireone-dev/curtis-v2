import { createSlice } from "@reduxjs/toolkit";

export const analyticsSlice = createSlice({
    name: "analytics",
    initialState: {
        analytics: false,
    },
    reducers: {
        setAnalytics: (state,action) => {
            state.analytics = action.payload;
        },
    },
});
export const { setAnalytics } = analyticsSlice.actions;

export default analyticsSlice.reducer;
