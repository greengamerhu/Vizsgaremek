import { Button, Card } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"
import type { MenuItem } from "../types/menuItem"
import '../main.scss'

export function StoreItem({ food_id, food_name, food_price, food_image, food_description, food_category }: MenuItem) {
  const { addToCart } = useShoppingCart()

  

  return (
    <Card className="h-100 border-purpleprimary" >
      <Card.Img
        variant="top"
        src={"http://192.168.1.7:3001/burgers/"+  food_image}
        height="300px"
        style={{ objectFit: "fill" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{food_name}</span>
          <span className="ms-2 text-muted">{formatCurrency(food_price)}</span>
        </Card.Title>
        <Card.Text className="text-center">
          <span className="fst-italic">{food_description}</span>
         
        </Card.Text>
        <div className="mt-auto">
          {(
            <Button className="w-100 bg-purpleprimary border border-purpleprimary" onClick={() => addToCart({ food_id, food_name, food_price, food_image, food_description, food_category })}>
              + Add To Cart
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  )
} 
