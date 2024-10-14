import React, { useContext, useEffect, useState } from "react";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const url = import.meta.env.VITE_SERVER;

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     navigate("/");
  //   }
  // }, []);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    // console.log(username, password);

    try {
      const response = await axios.post(`${url}/login`, {
        username: username.toLowerCase().trim(),
        password: password.trim(),
      });

      // console.log("RESPONSE",response);
      const { user, token } = response.data;

      if (
        user.role === "admin" ||
        user.role === "superadmin" ||
        user.role === "analytics"
      ) {
        dispatch(setUser(user));
        dispatch(setToken(token));
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } else {
        setError("Access Denied: Only Admins can log in");
      }
    } catch (err) {
      setError("Invalid credentials");
    }
    setIsLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "50px" }}>
        <Typography component="h1" variant="h5" align="center">
          Admin Portal
        </Typography>
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <TextField
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "white" },
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& label.Mui-focused": { color: "white" },
            }}
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
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "white" },
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& label.Mui-focused": { color: "white" },
            }}
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
            >
              {isLoading ? "Loading" : "Login"}
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
