import type { addressItem } from "./adressItem"

export interface OrderitemResponse {
    activeOrder : Order
    orderHistory : Order[]
}
export interface Order {
    id : string,
    status : string,
    total : number,
    orderDate : string,
    orderItems : OrderItem[],
    selectedAddress : addressItem
}
export interface OrderItem  {
  id: string;
  food_name: string;
  food_description: string;
  food_category: string;
  food_price: number;
  quantity: number;
  total: number;
};