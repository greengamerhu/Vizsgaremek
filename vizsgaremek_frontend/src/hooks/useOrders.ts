import { useEffect, useState } from "react";
import { getOrderApi } from "../api/orderApi";
import type { OrderitemResponse } from "../types/orderItem";

export function getOrderItems(){
    const [orderItemList, setorderItemList] = useState<OrderitemResponse>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null)
    const getOrderItems = async () => {
    getOrderApi()
        .then((res) => {setorderItemList(res);  console.log(res)})
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))

    }
    useEffect(()=> {
        getOrderItems()
    }, [])
   
    const refetch = ()=>{
        getOrderItems()
    }


    return {orderItemList, loading, error, refetch}
}
