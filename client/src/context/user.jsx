import { Token } from "@mui/icons-material";
import React, { createContext, useState } from "react";

// Create a new context
export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    Token: null,
    isAuthenticated: false,
    // Add other states as needed
  });

  const setUser = (user, token) => {
    setState({
      user: user,
      Token: token,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  };

  return (
    <AppContext.Provider value={{ state, setUser, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
