import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { Order } from "../types/orderItem";



type Props = {
  activeOrder?: Order;
  orderHistory?: Order[];
};


const formatDate = (isoDate: string) =>
  new Date(isoDate).toLocaleString("hu-HU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

const OrderAccordion = ({ order }: { order: Order }) => (
  <Accordion>
<AccordionSummary expandIcon={<ExpandMoreIcon />}>
  <Box display="flex" flexDirection="column" width="100%">
    <Typography
      variant="subtitle2"
      sx={{ wordBreak: "break-word", minWidth: 0 }}
    >
      Rendelés ID: {order.id}
    </Typography>
    <Box
      display="flex"
      flexWrap="wrap"
      rowGap={0.5}
      columnGap={2}
      mt={1}
      sx={{ wordBreak: "break-word" }}
    >
      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 0 }}>
        Dátum: {formatDate(order.orderDate)}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 0 }}>
        Állapot: {order.status}
      </Typography>
      <Typography variant="body2" fontWeight="bold" sx={{ minWidth: 0 }}>
        Összeg: {order.total} Ft
      </Typography>
    </Box>
  </Box>
</AccordionSummary> 
    <AccordionDetails>
      <List>
        {order.orderItems.map((item) => (
          <React.Fragment key={item.id}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.food_name}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary" component="span">
                      {item.food_description}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.primary"
                      display="block"
                      mt={0.5}
                      component="span"  
                    >
                      Mennyiség: {item.quantity} db — Összesen: {item.total} Ft
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
    </AccordionDetails>
  </Accordion>
);

const OrderDisplay: React.FC<Props> = ({ activeOrder, orderHistory }) => {
  return (
    <Box  p={2}>
      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Aktív rendelés
        </Typography>
        {activeOrder ? (
          <OrderAccordion order={activeOrder} />
        ) : (
          <Typography variant="body2" color="text.secondary">
            Nincs aktív rendelés.
          </Typography>
        )}
      </Paper>

      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Előző rendelések
        </Typography>
        {((orderHistory ?? []).length === 0) ? (
          <Typography variant="body2" color="text.secondary">
            Még nincs rendelés az előzményekben.
          </Typography>
        ) : (
          (orderHistory ?? []).map((order) => (
            <OrderAccordion key={order.id} order={order} />
          ))
        )}
      </Paper>
    </Box>
  );
};

export default OrderDisplay;
