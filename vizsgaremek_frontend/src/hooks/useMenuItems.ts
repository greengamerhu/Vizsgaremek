import { useEffect, useState } from "react";
import type { MenuItem } from "../types/menuItem";
import { getMenuItemsAPi } from "../api/getMenuApi";


export function getMenuitems(){
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null)
    useEffect(() =>   {
        getMenuItemsAPi()
        .then(setMenuItems)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))

    }, [])
     

    return {menuItems, loading, error}
}