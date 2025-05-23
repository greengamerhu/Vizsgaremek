import { useEffect, useState } from "react";
import type { addressItem } from "../types/adressItem";
import { getAddressesListApi } from "../api/AdressesApi";

export function getAddresItems(){
    const [AdressItems, setAdressItems] = useState<addressItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null)
    const getaddressList = async () => {
    getAddressesListApi()
        .then((res) => {setAdressItems(res)})
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))

    }
    useEffect(()=> {
        getaddressList()
    }, [])

    const refetch = ()=>{
        getaddressList()
    }

    
  
     

    return {AdressItems, loading, error, refetch}
}

