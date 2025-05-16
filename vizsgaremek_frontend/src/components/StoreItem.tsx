import { Button, Card } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"
import type { MenuItem } from "../types/menuItem"


export function StoreItem({ food_id, food_name, food_price, food_image, food_description, food_category }: MenuItem) {
  const { addToCart } = useShoppingCart()

  

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={food_image}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{food_name}</span>
          <span className="ms-2 text-muted">{formatCurrency(food_price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {(
            <Button className="w-100" onClick={() => addToCart({ food_id, food_name, food_price, food_image, food_description, food_category })}>
              + Add To Cart
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}
