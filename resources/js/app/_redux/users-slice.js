import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
    name: "app",
    initialState: {
        users: false,
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
    },
});
export const { setUsers } = usersSlice.actions;

export default usersSlice.reducer;
