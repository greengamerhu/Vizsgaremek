import { Col, Container, Row } from "react-bootstrap"
import { StoreItem } from "../components/StoreItem"
import { getMenuitems } from "../hooks/useMenuItems"
import type { MenuItem } from "../types/menuItem"

export function Store() {
  const {menuItems, loading, error}  = getMenuitems()
  
  if (loading) return <p>Betöltés...</p>;
  if (error) return <p>Hiba történt: {error}</p>;
  return (
    <>
      <Container>
        <h1>Store</h1>
      <Row   md={2} xs={1} lg={3} className="g-3">
        {menuItems.map(item => (
          <Col key={item.food_id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
      </Container>
      
    </>
  )
}
