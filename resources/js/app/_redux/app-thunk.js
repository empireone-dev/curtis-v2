import { get_product_registration_by_id_service } from "../services/product-registration-service";
import { get_products_service } from "../services/products-service";
import { get_ticket_by_ticket_id_service } from "../services/tickets-service";
import { appSlice } from "./app-slice";

export function get_product_registration_by_id_thunk(product_id) {
    return async function (dispatch, getState) {
        const result = await get_product_registration_by_id_service(product_id);
        dispatch(appSlice.actions.setProductRegistration(result));
    };
}

export function get_products_thunk() {
    return async function (dispatch, getState) {
        const result = await get_products_service();
        dispatch(appSlice.actions.setProducts(result));
    };
}

export function get_ticket_by_ticket_id_thunk(ticket_id) {
    return async function (dispatch, getState) {
        const result = await get_ticket_by_ticket_id_service(ticket_id);
        dispatch(appSlice.actions.setTicket(result.data));
    };
}
