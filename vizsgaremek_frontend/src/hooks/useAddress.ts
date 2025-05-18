import { useEffect, useState } from "react";
import type { addressItem } from "../types/adressItem";
import { getAddressesListApi, postAddressApi } from "../api/AdressesApi";

export function getAddresItems(){
    const [AdressItems, setAdressItems] = useState<addressItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null)
    useEffect(() =>   {
        getAddressesListApi()
        .then(setAdressItems)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))

    }, [])
     

    return {AdressItems, loading, error}
}
