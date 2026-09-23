import { createSlice } from "@reduxjs/toolkit";

export const ticketsSlice = createSlice({
    name: "app",
    initialState: {
        tickets: false,
    },
    reducers: {
        setTickets: (state, action) => {
            state.tickets = action.payload;
        },
    },
});
export const { setTickets } = ticketsSlice.actions;

export default ticketsSlice.reducer;
