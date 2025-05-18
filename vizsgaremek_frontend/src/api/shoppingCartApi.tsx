import type { CartResponse } from "../types/cartitem"
import type { MenuItem } from "../types/menuItem"
import http from "./http"

export async function getCartItemsAPi(): Promise<CartResponse> {
    const response = await http.get("/cart")
    return response.data
 
}
export async function updateCartItemsApi(quantity : number, menuItem : MenuItem) {
    const response = await http.patch("/cart", {
        "quantity": quantity,
        "menuItem": menuItem
    })
    console.log(response)
    return response
}
export async function deleteCartItemsApi(cartid : string) {
        const response = await http.delete("/cart/" + cartid )
        return response
}
export async function addToCartApi(menuItem : MenuItem) {
        const response = await http.post("/cart", {
        "quantity": 1,
        "menuItem": menuItem
    })
    return response
    
}