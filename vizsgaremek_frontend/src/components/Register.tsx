import {
  Avatar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  ThemeProvider
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";


export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8e24aa',
      dark: '#8e24aa',
      contrastText: '#fff',
    },
    secondary: {
      main: '#fff'
    }
  },
});
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const { registerUser, isLoggedIn } = useAuth()
  const handleRegister = async () => {
    registerUser(name, email, password, repassword)
  };


  return (  isLoggedIn ? <Navigate to="/" replace></Navigate> :
    <>
    <ThemeProvider theme={darkTheme}>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">Regisztráció</Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid size={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Teljes Név"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Cím"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Jelszó"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  required
                  fullWidth
                  name="repassword"
                  label="Jelszó újra"
                  type="password"
                  id="password"
                  value={repassword}
                  onChange={(e) => setRePassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleRegister}
              
            >
              Regisztráció
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid >
                <Link to="/login">Már van fiókod? Jelentkezz be</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      </ThemeProvider>
    </>
  );
};

export default Register;