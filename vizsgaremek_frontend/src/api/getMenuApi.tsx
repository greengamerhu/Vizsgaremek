import type { MenuItem } from "../types/menuItem";
import http from "./http";


export async function getMenuItemsAPi(): Promise<MenuItem[]> {
    const response = await http.get("/menu")
    return response.data.menu
    
}