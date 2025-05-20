
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"
import type { CartItem, CartResponse } from "../types/cartitem"
import { Box, IconButton, Stack, Typography } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'


export function CartItem( item : CartItem) {
  const { increaseCartQuantity, decreaseCartQuantity } = useShoppingCart()
  if (item.menuItem == null) return null

  return (
    <Stack direction="row" spacing={2} alignItems="center">
  <Box
    component="img"
    src={`http://192.168.1.7:3001/burgers/${item.menuItem.food_image}`}
    sx={{ width: 100, height: 75, objectFit: 'fill' }}
  />

  <Box flex={1}>
    <Typography variant="subtitle1">{item.menuItem.food_name}</Typography>

    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
      <IconButton
        size="small"
        color="error"
        onClick={() => decreaseCartQuantity(item)}
      >
        <RemoveIcon />
      </IconButton>
      <Typography variant="h6">{item.quantity}x</Typography>
      <IconButton
        size="small"
        color="success"
        onClick={() => increaseCartQuantity(item)}
      >
        <AddIcon />
      </IconButton>
    </Stack>


  </Box>

  <Typography>{formatCurrency(item.total)}</Typography>
</Stack>
  )
}
