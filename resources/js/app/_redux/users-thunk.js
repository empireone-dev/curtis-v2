import { get_users_service } from "../services/users-service";
import { usersSlice } from "./users-slice";

export function get_users_thunk() {
    return async function (dispatch, getState) {
        const result = await get_users_service();
        dispatch(usersSlice.actions.setUsers(result));
    };
}
