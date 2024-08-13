import React from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    if (!payload.role) {
      return false;
    }

    return payload.role === "admin" || payload.role === "superadmin";
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
};

const PrivateRoute = ({ children }) => {
  const isAuth = isAuthenticated();

  return isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
