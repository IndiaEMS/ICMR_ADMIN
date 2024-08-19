import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import ViewData from "./scenes/ViewData/ViewData";
import AdminLogin from "./Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  document.title = "Super Admin | INDIA EMS";
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    // Decode token and check role (you need to implement this based on your backend)
    const user = JSON.parse(atob(token.split(".")[1])); // Basic example
    return user.role === "admin" || user.role === "superadmin";
  };
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isAuthenticated() && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {isAuthenticated() && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route path="/login" element={<AdminLogin />} />

              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/team"
                element={
                  <PrivateRoute>
                    <Team />
                  </PrivateRoute>
                }
              />

              {[
                { path: "/ViewData/HFAT-1", formName: "HFAT-1" },
                { path: "/ViewData/HFAT-2", formName: "HFAT-2" },
                { path: "/ViewData/HFAT-3", formName: "HFAT-3" },
                { path: "/ViewData/HFAT-1WithAMB", formName: "HFAT-1WithAMB" },
                { path: "/ViewData/HFAT-2WithAMB", formName: "HFAT-2WithAMB" },
                { path: "/ViewData/HFAT-3WithAMB", formName: "HFAT-3WithAMB" },
                { path: "/ViewData/AMBULANCE", formName: "AMBULANCE" },
                { path: "/ViewData/CST", formName: "CST" },
              ].map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <PrivateRoute>
                      <ViewData formName={route.formName} />
                    </PrivateRoute>
                  }
                />
              ))}

              <Route
                path="/contacts"
                element={
                  <PrivateRoute>
                    <Contacts />
                  </PrivateRoute>
                }
              />
              <Route
                path="/invoices"
                element={
                  <PrivateRoute>
                    <Invoices />
                  </PrivateRoute>
                }
              />
              <Route
                path="/form"
                element={
                  <PrivateRoute>
                    <Form />
                  </PrivateRoute>
                }
              />
              <Route
                path="/bar"
                element={
                  <PrivateRoute>
                    <Bar />
                  </PrivateRoute>
                }
              />
              <Route
                path="/pie"
                element={
                  <PrivateRoute>
                    <Pie />
                  </PrivateRoute>
                }
              />
              <Route
                path="/line"
                element={
                  <PrivateRoute>
                    <Line />
                  </PrivateRoute>
                }
              />
              <Route
                path="/geography"
                element={
                  <PrivateRoute>
                    <Geography />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
