import type { addressItem } from "../types/adressItem";
import type { OrderitemResponse } from "../types/orderItem";
import http from "./http";


export async function postOrderApi(selectedAddress: addressItem) {
    const response = http.post('/order/placeOrder', {selectedAddress : selectedAddress})
    return response
}
export async function getOrderApi(): Promise<OrderitemResponse> {
    const response = await http.get('/order/getOrders')
    console.log(response)

    return response.data
}