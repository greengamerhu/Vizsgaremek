import {  } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { CartItem } from "./CartItem"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Button, Drawer, IconButton, Stack, ThemeProvider, Typography } from "@mui/material"
import { darkTheme } from "./Register"
import CloseIcon from '@mui/icons-material/Close'
type ShoppingCartProps = {
  isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems, cartTotal, cartQuantity } = useShoppingCart()
  const navigate = useNavigate()
  useEffect(() => {
    if (cartQuantity == 0 && isOpen) {
      closeCart();
    }
  }, [cartQuantity, isOpen, closeCart]);
  function goToCheckout(): void {
    navigate('/placeOrder')
    closeCart()
  }

  return (
    <ThemeProvider theme={darkTheme}>
<Drawer anchor="right" open={isOpen}  onClose={closeCart}>
  <Box sx={{  p: 2 }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="h6">Cart</Typography>
      <IconButton onClick={closeCart}>
        <CloseIcon />
      </IconButton>
    </Stack>

    {cartQuantity === 0 ? (
      <Typography variant="body1" sx={{ mt: 2 }}>
        A kosarad még üres
      </Typography>
    ) : (
      <Stack spacing={3} mt={2}>
        {cartItems.map(item => (
          <CartItem key={item.id} {...item} />
        ))}

        <Typography variant="h6" align="right">
          Összesen: {cartTotal}
        </Typography>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => goToCheckout()}
        >
          Tovább a pénztárhoz
        </Button>
      </Stack>
    )}
  </Box>
</Drawer>
</ThemeProvider>
  )
}
