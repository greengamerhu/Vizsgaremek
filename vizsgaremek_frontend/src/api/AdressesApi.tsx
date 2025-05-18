import type { addressItem } from "../types/adressItem"
import http from "./http"

export async function getAddressesListApi() : Promise<addressItem[]> {
    const response = await http.get("/user-address")
    return response.data.address
}
export async function postAddressApi(adressItem: addressItem) {
    const response = await http.post("/user-address", adressItem)
    return response
}