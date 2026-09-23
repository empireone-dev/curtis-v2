import { get_tickets_service } from "../services/tickets-service";
import { ticketsSlice } from "./tickets-slice";

export function get_tickets_thunk(product_id) {
    return async function (dispatch, getState) {
        const result = await get_tickets_service(product_id);
        dispatch(ticketsSlice.actions.setTickets(result));
    };
}
