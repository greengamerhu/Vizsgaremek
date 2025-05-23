import { ThemeProvider } from "@emotion/react";
import OrderDisplay from "../components/ordersItem";
import { darkTheme } from "../components/Register";
import { getOrderItems } from "../hooks/useOrders";
import { CircularProgress } from "@mui/material";

import { toast } from "react-toastify";



export function Orders() {
   const {orderItemList, loading, error} = getOrderItems()
  

  
  return (
    <ThemeProvider theme={darkTheme}>
      {
        loading ? (
           <CircularProgress />
        ): error ? toast.warning(error) :
        <OrderDisplay
        activeOrder={orderItemList?.activeOrder}
        orderHistory={orderItemList?.orderHistory}
      />  
      }
      
    </ThemeProvider>
  )
}
