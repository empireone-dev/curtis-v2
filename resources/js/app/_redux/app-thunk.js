import { get_product_registration_by_id_service } from "../services/product-registration-service";
import { get_products_service } from "../services/products-service";
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
        console.log('resultss',result)
        dispatch(appSlice.actions.setProducts(result));
    };
}
