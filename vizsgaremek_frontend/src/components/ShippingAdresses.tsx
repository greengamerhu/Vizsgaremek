import React, {  useState, type FormEvent } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  ThemeProvider,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import type { addressItem} from '../types/adressItem';
import { getAddresItems } from '../hooks/useAddress';
import { darkTheme } from './Register';
import { deleteAddressApi, postAddressApi } from '../api/AdressesApi';
import { formatErrorMessage } from '../utilities/formatErrorMessage';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';



const ShippingAddressList: React.FC = () => {
    const {AdressItems, loading, error, refetch} = getAddresItems()
    const [errorMessage] = useState('')
    const [open, setOpen] = useState(false);
    const {isLoggedIn} = useAuth()
    
    const [formData, setFormData] = useState<addressItem>({
        id: 0,
        postalCode :'',
        city : '',
        address : '',
        mobileNumber : ''
    }) ;
  
    



  const handleOpen = () => {
    setFormData({ id: 0, city: '', postalCode: '', address : '', mobileNumber : '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };


 function handleSubmit(event : FormEvent)  {
    event.preventDefault()
    

    console.log(formData)
    postAddressApi(formData)
        .then((res) => {if (res.status == 201) {
           toast.success("Sikeres Cím felvétel")
           refetch()
           handleClose()
        }
         })
        .catch((err) =>  {
          formatErrorMessage(err.response.data.message).map( err => {
              toast.warning(err) } )})
        .finally()
    
 }
 function deleteAddress(id : number) {
    deleteAddressApi(id)
    .then((res) => {
        if(res.status == 200) {
          console.log(res)
          refetch()  
        }
    }

    )
    .catch((err) => {
       formatErrorMessage(err.response.data.message).map( err => {
          toast.warning(err) } )
    })
 }

  return (  !isLoggedIn ? <Navigate to="/" replace></Navigate> :
    <ThemeProvider theme={darkTheme}>
    <Box>
      <Typography variant="h5" gutterBottom>
        Szállítási címek
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <List >
          {AdressItems.map(addr => (
            <Box key={addr.id } border={1} borderColor={'#672e71'} borderRadius={'16px'}>
            <ListItem   >
              <ListItemText
                primary={`${addr.postalCode} ${addr.city}, ${addr.address} ${addr.mobileNumber}`}
              />
            <IconButton onClick={() => deleteAddress(addr.id)} edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>

            </ListItem>
            </Box>
          ))}
        </List>
      )}

      <Button variant="contained" color="primary" onClick={handleOpen}>
        Új cím hozzáadása
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Új szállítási cím</DialogTitle>
        <form onSubmit={handleSubmit}>
        <DialogContent>
            <TextField
            required
            margin="dense"
            name="postalCode"
            label="Irányítószám"
            fullWidth
            variant="standard"
            value={formData.postalCode}
            onChange={handleChange}
          />
            <TextField
            required
            margin="dense"
            name="city"
            label="Város"
            fullWidth
            variant="standard"
            value={formData.city}
            onChange={handleChange}
            />
            <TextField
            required
            autoFocus
            margin="dense"
            name="address"
            label="Utca, házszám"
            fullWidth
            variant="standard"
            value={formData.address}
            onChange={handleChange}
            />
            <TextField
            autoFocus
            margin="dense"
            name="mobileNumber"
            label="Telefonszám"
            fullWidth
            variant="standard"
            value={formData.mobileNumber}
            onChange={handleChange}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Mégse</Button>
          <Button type='submit'  variant="contained">
            Mentés
          </Button>
            <p>{errorMessage}</p>
        </DialogActions>
        </form>
      </Dialog>
    </Box>
    </ThemeProvider>
  );
};

export default ShippingAddressList;
