import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Grid,
} from "@mui/material";
import axios from "axios";
import { AppContext } from "./context/user";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "./slices/authSlice";

export default function AdminLogin() {
  // const { setUser } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate();
  

  const url = import.meta.env.VITE_SERVER;
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);

    try {
      const response = await axios.post(`${url}/login`, {
        username,
        password,
      });
      const { user, token } = response.data;
      
      if (user.role === "admin" || user.role === "superadmin") {
        dispatch(setUser(user));
        dispatch(setToken(token))
        localStorage.setItem("token", token);
        // localStorage.setItem("user", user);
        navigate("/");
      } else {
        setError("Access Denied: Only Admins can log in");
      }
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "50px" }}>
        <Typography component="h1" variant="h5" align="center">
          Admin Login
        </Typography>
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
