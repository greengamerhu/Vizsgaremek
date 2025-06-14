import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  ThemeProvider,
} from "@mui/material";
import {  useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { darkTheme } from "./Register";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {loginUser, isLoggedIn} = useAuth()
  const handleLogin = () => {
    loginUser(email, password)
  };

  return (
    
    isLoggedIn ?  <Navigate to="/" replace></Navigate> :
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
          <Typography variant="h5">Bejelentkezés</Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Cím"
              name="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)} />

            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Jelszó"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              } } />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Bejelentkezés
            </Button>
            <Grid container justifyContent={"flex-end"}>
              <Grid>
                <Link to="/register">Nincs még fiókod? Regisztrálj</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      </ThemeProvider>
  );
};

export default Login;