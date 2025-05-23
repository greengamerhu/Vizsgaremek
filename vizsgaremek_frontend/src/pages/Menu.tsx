import { Container,  Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { StoreItem } from "../components/StoreItem"
import { getMenuitems } from "../hooks/useMenuItems"

export function Store() {
  const {menuItems, loading, error}  = getMenuitems()
  
  if (loading) return <p>Betöltés...</p>;
  if (error) return <p>Hiba történt: {error}</p>;
  return (
    <>
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Étlap
      </Typography>
      <Grid container spacing={3}>
        {menuItems.map((item) => (
          <Grid  size={{xs:12, sm:6, md: 4}} key={item.food_id}>
            <StoreItem {...item} />
          </Grid>
        ))}
      </Grid>
    </Container>
      
    </>
  )
}
