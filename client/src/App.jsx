import { useEffect, useState } from "react";
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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    // Decode token and check role (you need to implement this based on your backend)
    const user = JSON.parse(atob(token.split(".")[1])); // Basic example
    return (
      user.role === "admin" ||
      user.role === "superadmin" ||
      user.role === "analytics"
    );
  };

  // set the sidebar to false if the screen width is greater than 1300px
  // set the sidebar to true if the screen width is less than 1300px
  // this is to ensure that the sidebar is hidden on larger screens
  // and shown on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1300) {
        setIsSidebar(false);
      } else {
        setIsSidebar(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isAuthenticated() && !isSidebar ? (
            <Sidebar
              isSidebar={isSidebar}
              setIsSidebar={setIsSidebar}
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
          ) : (
            <></>
          )}
          <main className="content">
            {isAuthenticated() && (
              <Topbar
                isSidebar={isSidebar}
                setIsSidebar={setIsSidebar}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
              />
            )}
            <Routes>
              <Route path="/login" element={<AdminLogin />} />
              {/* <Route path="/" element={<AdminLogin />} /> */}

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
                { path: "/ViewData/Autopsy", formName: "Autopsy" },
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
