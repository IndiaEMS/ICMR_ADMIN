import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Grid,
  AppBar,
  Box,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { AppContext } from "./context/user";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "./slices/authSlice";
import ICMRLogo from "./assets/ICMR_Logo.png";
import PUIcon from "./assets/PU_Icon.png";
import secondLogo from "./assets/secondLogo.png";
import thirdLogo from "./assets/thirdLogo.png";
import fourthLogo from "./assets/fourthLogo.png";
import fifthLogo from "./assets/fifthLogo.png";

import bgImg from "./assets/bg.jpg";

export default function AdminLogin() {
  // const { setUser } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const url = import.meta.env.VITE_SERVER;

  const theme = useTheme();

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
    <Box
      sx={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        maxWidth: "none",
        minWidth: "100%",
        // display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", padding: "10px" }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            {/* show img */}
            <Box
              component="img"
              src={ICMRLogo}
              alt="logo"
              height="60px"
              sx={{
                height: {
                  xs: "20px", // small screens
                  sm: "40px", // medium screens
                  md: "60px", // large screens and above
                },
              }}
            />
            <Box
              component="img"
              src={secondLogo}
              alt="logo"
              height="60px"
              sx={{
                height: {
                  xs: "20px", // small screens (down(sm))
                  sm: "40px", // medium screens (up(sm), down(md))
                  lg: "60px", // large screens and up
                },
              }}
            />
            <Box
              component="img"
              src={thirdLogo}
              alt="logo"
              height="60px"
              sx={{
                height: {
                  xs: "20px", // small screens (down(sm))
                  sm: "40px", // medium screens (up(sm), down(md))
                  lg: "60px", // large screens and up
                },
              }}
            />
            <Box
              component="img"
              src={fourthLogo}
              alt="logo"
              height="60px"
              sx={{
                height: {
                  xs: "20px", // small screens (down(sm))
                  sm: "40px", // medium screens (up(sm), down(md))
                  lg: "60px", // large screens and up
                },
              }}
            />
            <Box
              component="img"
              src={fifthLogo}
              alt="logo"
              height="60px"
              sx={{
                height: {
                  xs: "20px", // small screens (down(sm))
                  sm: "40px", // medium screens (up(sm), down(md))
                  lg: "60px", // large screens and up
                },
              }}
            />
            <Box
              component="img"
              src={PUIcon}
              alt="logo"
              height="60px"
              sx={{
                height: {
                  xs: "20px", // small screens (down(sm))
                  sm: "40px", // medium screens (up(sm), down(md))
                  lg: "60px", // large screens and up
                },
              }}
            />
          </Box>
        </Container>
      </AppBar>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          // set vertical center
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // set height
          height: "80vh",
        }}
      >
        <Paper
          elevation={3}
          style={{
            padding: "20px",
            // marginTop: "50px",
            backgroundColor: "rgba(0,0,0,0.9)",
          }}
        >
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
            <Grid
              container
              justifyContent="center"
              style={{ marginTop: "20px" }}
            >
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
    </Box>
  );
}
