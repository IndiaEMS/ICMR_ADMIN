import { useContext, useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ViewListIcon from "@mui/icons-material/ViewList";
import { AppContext } from "../../context/user";
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

const Sidebar = () => {
  // const { state } = useContext(AppContext);
  const { user } = useSelector((state) => state.auth);
  const userRole = user?.role ?? "";
  // Pass userRole as a prop or fetch it from context
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [isHfatOpen, setIsHfatOpen] = useState(false);
  const [isHfatAMBOpen, setIsHfatAMBOpen] = useState(false);

  return (
    <Box
      sx={{
        overflowY: "scroll", // Enable scrolling
        "&::-webkit-scrollbar": {
          display: "none", // Hide scrollbar for Chrome, Safari, and Opera
        },
        "-ms-overflow-style": "none", // Hide scrollbar for IE and Edge
        "scrollbar-width": "none", // Hide scrollbar for Firefox
        width: isCollapsed ? "70px" : "300px",
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
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
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

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

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
            <Item
              icon={<ViewListIcon />}
              title="CST"
              to="ViewData/CST"
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
              <Typography>HFAT With Ambulance</Typography>
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
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
