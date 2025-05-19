import { toast, ToastContainer } from "react-toastify";
import { Box, Button, Divider, FormControl, FormHelperText, InputLabel, MenuItem, Paper, Select, Stack, styled, ThemeProvider, Typography, type SelectChangeEvent,  } from "@mui/material";
import { useState, type ReactNode } from "react";
import { darkTheme } from "../components/Register";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "../components/CartItem";
import { getAddresItems } from "../hooks/useAddress";
import type { addressItem } from "../types/adressItem";
import { postOrderApi } from "../api/orderApi";
import { formatErrorMessage } from "../utilities/formatErrorMessage";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";


export function Order() {
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [selectedAddress, setSelectedAddress] = useState<addressItem>();
  const {isLoggedIn} = useAuth()
  const {cartItems, cartTotal} = useShoppingCart()
  const {AdressItems, loading, error} = getAddresItems()
  
  function handleChange(event: SelectChangeEvent): void {
    const selected = AdressItems.find(item => item.id === parseInt(event.target.value)) || null;
    setSelectedAddressId(event.target.value);
    
    if(selected) {
      setSelectedAddress(selected)
    }
    console.log(selectedAddress)
  }


  function handleSubmitOrder(): void {
    if(selectedAddress) {
      postOrderApi(selectedAddress).then((res) => {if (res.status == 201) {
               toast.success("Sikeres rendelés leadás")
            }
             })
            .catch((err) =>  {
              formatErrorMessage(err.response.data.message).map( err => {
                  toast.warning(err) } )})
            .finally()
    }else{
      toast.warning("Válassz ki egy rendelési címet")
    }

   
  }
  const Item = styled(Paper)(({ theme }) => ({
    padding: 30,
    width : '100%',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));
  return ( !isLoggedIn ? <Navigate to="/" replace></Navigate> : <div>
    <ThemeProvider theme={darkTheme}>
   <Stack spacing={2}>
    <Box  sx={{   border : '1px solid purple', p:4}}>
      <Typography sx={{ml : 4, }} variant="h5" gutterBottom>Válasszon ki szállítási címet</Typography>
            <FormControl fullWidth sx={{ }} >
        <InputLabel id="demo-simple-select-helper-label">Szállítási cím</InputLabel>
        <Select
        
          labelId="demo-simple-select-helper-label"
           
          id="demo-simple-select-helper"
          value={selectedAddressId ?? ''}
          label="Age"
          onChange={handleChange}
        >
          {
            AdressItems.map((item) => (
              <MenuItem value={item?.id ?? ''}>{item.postalCode + ' ' + item.city + ' ' + item.address}</MenuItem>
            ))
          }
     
        </Select>
      </FormControl>
    </Box>
    <Box  sx={{width : '100%', borderColor : 'purple', border : '1px solid purple'}}>
      <Typography sx={{ml : 4, mt: 2}} variant="h5" gutterBottom>Rendelés Összesítő</Typography>
        <Stack    sx={{m:4, }}  spacing={3} >
            {cartItems.map(item => (
              <Item>
        <Stack  sx={{justifyContent: "space-between",alignItems: "start"}} direction={{ sm: 'row' } }
            spacing={{ xs: 1, sm: 2, md: 12 }}>   
            <Stack>
                 <span>{item.menuItem.food_name}</span>
        <span>{item.quantity}db</span>
              </Stack>  
     
        <span>{item.total} Ft</span>
        </Stack>
        </Item>
            ))}
        </Stack>
    </Box>
       <Box  sx={{   border : '1px solid purple', p:4}}>
        <Stack >
          <Typography  variant="h5" gutterBottom>Összesen: {cartTotal} Ft</Typography>
            <Button
              fullWidth
              variant="contained"
              sx={{  }}
              onClick={handleSubmitOrder}
            >Rendelés Leadása</Button>
        </Stack>

    </Box>
</Stack>
</ThemeProvider>
  </div>)
}
