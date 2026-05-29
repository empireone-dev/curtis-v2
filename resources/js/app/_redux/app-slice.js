import { createSlice } from "@reduxjs/toolkit";

const path = window.location.hash.substring(1); // Get the hash without the first character
const hash = path.split("&")[0];
export const appSlice = createSlice({
    name: "app",
    initialState: {
        setLoading: false,
        product_registration: {},
        products: [],
        common_issues: [],
        ticket: {},
    },
    reducers: {
        setLoading: (state, action) => {
            state.setLoading = action.payload;
        },
        setProductRegistration: (state, action) => {
            state.product_registration = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setCommonIssues: (state, action) => {
            state.common_issues = action.payload;
        },
        setTicket: (state, action) => {
            state.ticket = action.payload;
        },
    },
});
export const {
    setLoading,
    setProductRegistration,
    setProducts,
    setCommonIssues,
    setTicket,
} = appSlice.actions;

export default appSlice.reducer;
