import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useSelector } from "react-redux";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ isSideBar, setIsSidebar, isCollapsed, setIsCollapsed }) => {
  // const { state } = useContext(AppContext);
  const { user } = useSelector((state) => state.auth);
  const userRole = user?.role ?? "";
  const siteName = user?.sitename ?? "";
  // Pass userRole as a prop or fetch it from context
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selected, setSelected] = useState("Dashboard");
  const [isHfatOpen, setIsHfatOpen] = useState(false);
  const [isHfatAMBOpen, setIsHfatAMBOpen] = useState(false);
  const [isHfatfinalOpen, setIsHfatfinalOpen] = useState(false);
  const [isHfatAMBfinalOpen, setIsHfatAMBfinalOpen] = useState(false);

  return (
    <Box
      sx={{
        overflowY: "scroll", // Enable scrolling
        "&::-webkit-scrollbar": {
          display: "none", // Hide scrollbar for Chrome, Safari, and Opera
        },
        "-ms-overflow-style": "none", // Hide scrollbar for IE and Edge
        "scrollbar-width": "none", // Hide scrollbar for Firefox
        width: isCollapsed ? "80px" : "320px",
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 15px !important",
        },
      }}
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          // height: "100vh",
          // overflowY: "scroll", // Enable scrolling
          // overflowX: "hidden",
          position: "fixed",
          // zIndex: 1,
          // top: 0,
          // left: 0,
          // backgroundColor: colors.primary[400],
          // width: isCollapsed ? "70px" : "300px",
          // transition: "width 0.5s",
        }}
      >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={
              () => {
                if (window.innerWidth > 1300) {
                  setIsCollapsed(!isCollapsed);
                  setIsSidebar(false);
                } else {
                  setIsSidebar(!isSideBar);
                  setIsCollapsed(false);
                }
              }

              // setIsSidebar(!isSideBar) ?? setIsCollapsed(!isCollapsed)
            }
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  className="font-bold"
                >
                  INDIA EMS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box
            paddingLeft={isCollapsed ? undefined : "10%"}
            sx={{
              transition: "padding-left 0.5s",
              width: "100%",
            }}
          >
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {userRole != "analytics" && (
              <>
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  View
                </Typography>
                {userRole === "superadmin" && (
                  <Item
                    title="Manage Team"
                    to="/team"
                    icon={<PeopleOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                )}
                {(userRole === "superadmin") &&
                <>
                  <MenuItem
                    icon={<ViewListIcon />}
                    onClick={() => setIsHfatOpen(!isHfatOpen)}
                    active={selected.startsWith("HFAT")}
                    style={{ color: colors.grey[100] }}
                    suffix={
                      !isCollapsed ? (
                        isHfatOpen ? (
                          <KeyboardArrowDownIcon />
                        ) : (
                          <KeyboardArrowRightIcon />
                        )
                      ) : null
                    }
                  >
                    <Typography>HFAT</Typography>
                  </MenuItem>
                  {isHfatOpen && (
                    <Box paddingLeft="10%">
                      <Item
                        icon={<ViewListIcon />}
                        title="HFAT-1"
                        to="ViewData/HFAT-1"
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        icon={<ViewListIcon />}
                        title="HFAT-2"
                        to="ViewData/HFAT-2"
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        icon={<ViewListIcon />}
                        title="HFAT-3"
                        to="ViewData/HFAT-3"
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        icon={<ViewListIcon />}
                        title="Ambulance"
                        to="ViewData/AMBULANCE"
                        selected={selected}
                        setSelected={setSelected}
                      />
                    </Box>
                  )}
                </>
                }

                <MenuItem
                  icon={<ViewListIcon />}
                  onClick={() => setIsHfatfinalOpen(!isHfatfinalOpen)}
                  active={selected.startsWith("FINAL HFAT")}
                  style={{ color: colors.grey[100] }}
                  suffix={
                    !isCollapsed ? (
                      isHfatfinalOpen ? (
                        <KeyboardArrowDownIcon />
                      ) : (
                        <KeyboardArrowRightIcon />
                      )
                    ) : null
                  }
                >
                  <Typography>HFAT FINAL</Typography>
                </MenuItem>
                {isHfatfinalOpen && (
                  <Box paddingLeft="10%">
                    <Item
                      icon={<ViewListIcon />}
                      title="HFAT-1"
                      to="ViewData/HFAT-1-FINAL"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      icon={<ViewListIcon />}
                      title="HFAT-2"
                      to="ViewData/HFAT-2-FINAL"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      icon={<ViewListIcon />}
                      title="HFAT-3"
                      to="ViewData/HFAT-3-FINAL"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      icon={<ViewListIcon />}
                      title="Ambulance"
                      to="ViewData/AMBULANCE-FINAL"
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </Box>
                )}

                <Item
                  icon={<ViewListIcon />}
                  title="CST"
                  to="ViewData/CST"
                  selected={selected}
                  setSelected={setSelected}
                />
                
                <Item
                  icon={<ViewListIcon />}
                  title="CST-FINAL"
                  to="ViewData/CST-FINAL"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Autopsy"
                  to="ViewData/Autopsy"
                  icon={<ViewListIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Autopsy FINAL"
                  to="ViewData/Autopsy-FINAL"
                  icon={<ViewListIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="LOT"
                  to="ViewData/LOT"
                  icon={<ViewListIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                {/* <Item
                  title="LOT Final"
                  to="ViewData/LOT-final"
                  icon={<ViewListIcon />}
                  selected={selected}
                  setSelected={setSelected}
                /> */}
                <MenuItem
                  icon={<ViewListIcon />}
                  onClick={() => setIsHfatAMBOpen(!isHfatAMBOpen)}
                  active={selected.startsWith("HFAT")}
                  style={{ color: colors.grey[100] }}
                  suffix={
                    !isCollapsed ? (
                      isHfatAMBOpen ? (
                        <KeyboardArrowDownIcon />
                      ) : (
                        <KeyboardArrowRightIcon />
                      )
                    ) : null
                  }
                >
                  <Typography>HFAT With AMB</Typography>
                </MenuItem>
                {isHfatAMBOpen && (
                  <Box paddingLeft="10%">
                    <Item
                      icon={<ViewListIcon />}
                      title="HFAT-1"
                      to="ViewData/HFAT-1WithAMB"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      icon={<ViewListIcon />}
                      title="HFAT-2"
                      to="ViewData/HFAT-2WithAMB"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      icon={<ViewListIcon />}
                      title="HFAT-3"
                      to="ViewData/HFAT-3WithAMB"
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </Box>
                )}

                {/* <MenuItem
                  icon={<ViewListIcon />}
                  onClick={() => setIsHfatAMBfinalOpen(!isHfatAMBfinalOpen)}
                  active={selected.startsWith("HFAT")}
                  style={{ color: colors.grey[100] }}
                  suffix={
                    !isCollapsed ? (
                      isHfatAMBfinalOpen ? (
                        <KeyboardArrowDownIcon />
                      ) : (
                        <KeyboardArrowRightIcon />
                      )
                    ) : null
                  }
                >
                  <Typography>HFAT With AMB FINAL</Typography>
                </MenuItem>
                {isHfatAMBfinalOpen && (
                  <Box paddingLeft="10%">
                    <Item
                      icon={<ViewListIcon />}
                      title="HFAT-1"
                      to="ViewData/HFAT-1WithAMB-FINAL"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      icon={<ViewListIcon />}
                      title="HFAT-2"
                      to="ViewData/HFAT-2WithAMB-FINAL"
                      selected={selected}
                      setSelected={setSelected}
                    />
                    <Item
                      icon={<ViewListIcon />}
                      title="HFAT-3"
                      to="ViewData/HFAT-3WithAMB-FINAL"
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </Box>
                )} */}

                {userRole === "superadmin" && (
                  <>
                    <Typography
                      variant="h6"
                      color={colors.grey[300]}
                      sx={{ m: "15px 0 5px 20px" }}
                    >
                      Pages
                    </Typography>
                    <Item
                      title="Create User"
                      to="/form"
                      icon={<PersonOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </>
                )}
              </>
            )}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
