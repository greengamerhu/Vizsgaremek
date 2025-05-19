import type { addressItem } from "../types/adressItem";
import http from "./http";


export async function postOrderApi(selectedAddress: addressItem) {
    const response = http.post('/order/placeOrder', {selectedAddress : selectedAddress})
    return response
}