import type { MenuItem } from "./menuItem";


export interface CartResponse{
    shoppingCart : CartItem[]
    sumTotal: string;
}
export interface CartItem{
    id: string;
    total: number;
    quantity: number;
    menuItem: MenuItem;
}