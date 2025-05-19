
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"
import type { MenuItem } from "../types/menuItem"
import '../main.scss'
import { Box, Button, Card, CardActions, CardContent, CardMedia, ThemeProvider, Typography } from "@mui/material"
import { darkTheme } from "./Register"

export function StoreItem({ food_id, food_name, food_price, food_image, food_description, food_category }: MenuItem) {
  const { addToCart } = useShoppingCart()

  

  return (
   <ThemeProvider theme={darkTheme}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          border: "1px solid #672e71",
          borderRadius: 3,
          bgcolor: "#1A2027",
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={`http://192.168.1.7:3001/burgers/${food_image}`}
          alt={food_name}
          sx={{ objectFit: "contain" }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="baseline"
            mb={2}
          >
            <Typography variant="h6" color="white">
              {food_name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {formatCurrency(food_price)}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            fontStyle="italic"
            textAlign="center"
            color="text.secondary"
          >
            {food_description}
          </Typography>
        </CardContent>
        <CardActions sx={{ mt: "auto", p: 2 }}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#672e71",
              "&:hover": {
                backgroundColor: "#87458e",
              },
              fontWeight: "bold",
            }}
            onClick={()=>
              addToCart({
                food_id,
                food_name,
                food_price,
                food_image,
                food_description,
                food_category,
              })
            }
          >
            + Kosárba
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  )
} 
