import { useState } from "react";
import { Routes, Route } from "react-router-dom";
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
// import CalendarComponent from "./scenes/calendar/calendar";
import ViewData from "./scenes/ViewData/ViewData";

function App() {
  document.title = "Super Admin | INDIA EMS";
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              {/* <Route
                path="/ViewData/HFAT-1"
                element={<ViewData formName={"HFAT-1"} />}
              />
              <Route
                path="/ViewData/HFAT-2"
                element={<ViewData formName={"HFAT-2"} />}
              />
              <Route
                path="/ViewData/HFAT-3"
                element={<ViewData formName={"HFAT-3"} />}
              />
              <Route
                path="/ViewData/AMBULANCE"
                element={<ViewData formName={"AMBULANCE"} />}
              /> */}
              {[
                { path: "/ViewData/HFAT-1", formName: "HFAT-1" },
                { path: "/ViewData/HFAT-2", formName: "HFAT-2" },
                { path: "/ViewData/HFAT-3", formName: "HFAT-3" },
                { path: "/ViewData/HFAT-1WithAMB", formName: "HFAT-1WithAMB" },
                { path: "/ViewData/HFAT-2WithAMB", formName: "HFAT-2WithAMB" },
                { path: "/ViewData/HFAT-3WithAMB", formName: "HFAT-3WithAMB" },
                { path: "/ViewData/AMBULANCE", formName: "AMBULANCE" },
              ].map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<ViewData formName={route.formName} />}
                />
              ))}
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />

              {/* <Route path="/calendar" element={<CalendarComponent />} /> */}
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
