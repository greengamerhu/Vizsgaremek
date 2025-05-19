import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"
import type { CartItem, CartResponse } from "../types/cartitem"



export function CartItem( item : CartItem) {
  const { increaseCartQuantity, decreaseCartQuantity } = useShoppingCart()
  if (item.menuItem == null) return null

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={"http://192.168.1.7:3001/burgers/" + item.menuItem.food_image}
        style={{ width: "125px", height: "75px", objectFit: "fill" }}
      />
      <div className="me-auto">
        <div>
          {item.menuItem.food_name}{" "}  
             <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button size="sm"  variant="outline-danger" onClick={() => decreaseCartQuantity(item)}>-</Button>
                <div>
                  <span className="fs-4">{item.quantity}</span>x
                </div>
                <Button size="sm" variant="outline-success" onClick={() => increaseCartQuantity(item)}>+</Button>
              </div>

        </div>
  
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.menuItem.food_price)}
        </div>
      </div>
      <div> {formatCurrency(item.total)}</div>

    </Stack>
  )
}
