import { toast} from "react-toastify";
import { Box, Button, Card, CardContent, CircularProgress,  FormControl, InputLabel, MenuItem, Paper, Select, Stack,  ThemeProvider, Typography, type SelectChangeEvent,  } from "@mui/material";
import { useState,  } from "react";
import { darkTheme } from "../components/Register";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { getAddresItems } from "../hooks/useAddress";
import type { addressItem } from "../types/adressItem";
import { postOrderApi } from "../api/orderApi";
import { formatErrorMessage } from "../utilities/formatErrorMessage";
import { useAuth } from "../context/authContext";
import { Navigate, useNavigate } from "react-router-dom";


export function PlaceOrder() {
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [selectedAddress, setSelectedAddress] = useState<addressItem>();
  const {isLoggedIn} = useAuth()
  const {cartItems, cartTotal} = useShoppingCart()
  const {AdressItems, loading} = getAddresItems()
  const navigate = useNavigate()
  
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
               navigate('/orders')
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
//   const Item = styled(Paper)(({ theme }) => ({
//     padding: 30,
//     width : '100%',
//   color: (theme.vars ?? theme).palette.text.secondary,
//   ...theme.applyStyles('dark', {
//     backgroundColor: '#1A2027',
//   }),
// }));
  return ( !isLoggedIn ? (<Navigate to="/" replace></Navigate> ): 
  loading ? (
               <CircularProgress />
  ) :
  (<div>
    
    <ThemeProvider theme={darkTheme}>
    <Box  sx={{  p:2}}> 

   <Stack spacing={2}>
      <Paper  elevation={3} sx={{ p: 4, mb: 4 }}>
      <Typography sx={{mb : 5 }} variant="h5" gutterBottom>Válasszon ki szállítási címet</Typography>
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
      </Paper>
        <Paper sx={{p:4}} elevation={3}>
      <Typography sx={{mb: 4}} variant="h5" gutterBottom>Rendelés Összesítő</Typography>
        <Stack    sx={{ }}  spacing={3} >
            {cartItems.map(item => (
              <Card key={item.id} variant="outlined" sx={{ backgroundColor: "#1A2027", color: "#fff"}}>
                <CardContent>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                    spacing={2}
                  >
                    <Stack>
                      <Typography variant="h6">{item.menuItem.food_name}</Typography>
                      <Typography variant="body2">{item.quantity} db × {item.menuItem.food_price} Ft / db</Typography>
                    </Stack>
                    <Typography variant="body1" fontWeight="bold">
                      {item.total} Ft
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            ))}
        </Stack>
        </Paper>
            <Paper sx={{ p: 4, backgroundColor: '#1A2027', color: '#fff' }} elevation={4}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems="center"
                spacing={3}
              >
                <Box>
                  <Typography variant="h6" gutterBottom>Rendelés végösszeg: </Typography>
                  <Typography variant="h4" fontWeight="bold" color="secondary.main">
                    {cartTotal} Ft
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  sx={{ px: 4, py: 1.5, fontWeight: 'bold', fontSize: '1rem' }}
                  onClick={handleSubmitOrder}
                >
                  Rendelés Leadása
                </Button>
              </Stack>
            </Paper>
</Stack>
    </Box>

</ThemeProvider>
  </div>))
}
