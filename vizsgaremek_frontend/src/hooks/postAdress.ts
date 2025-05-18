import { useState } from "react"
import { postAddressApi } from "../api/AdressesApi"
import type { addressItem } from "../types/adressItem";


export function ostAdress(addressItem : addressItem) {
    const [postError, setPostError] = useState<null | string>(null)

    postAddressApi(addressItem)
    .then((res) => setPostError(res.data.message))
    .catch((err) => setPostError(err.message))

    return { postError}
  
}