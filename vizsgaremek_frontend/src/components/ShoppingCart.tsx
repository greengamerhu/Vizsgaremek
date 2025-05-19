import {  Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { CartItem } from "./CartItem"
import { formatCurrency } from "../utilities/formatCurrency"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button, ThemeProvider } from "@mui/material"
import { darkTheme } from "./Register"

type ShoppingCartProps = {
  isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems, cartTotal, cartQuantity } = useShoppingCart()
  const navigate = useNavigate()
  useEffect(() => {
    if (cartQuantity === 0 && isOpen) {
      closeCart();
    }
  }, [cartQuantity, isOpen, closeCart]);

  function goToCheckout(): void {
    navigate('/placeOrder')
    closeCart()
  }

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {
          cartQuantity == 0 ? <h2>A kosarad még üres</h2> :      
          <Stack gap={3}>
          {cartItems.map(item => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Összesen: {" "}
            {(cartTotal)}
          </div>
          <ThemeProvider theme={darkTheme}>
          <Button  variant="contained" onClick={()=> goToCheckout()}>Tovább a pénztárhoz</Button>
          </ThemeProvider>
        </Stack>
        }
        
  
      </Offcanvas.Body>
    </Offcanvas>
  )
}
