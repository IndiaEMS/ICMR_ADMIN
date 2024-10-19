import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import FeedIcon from "@mui/icons-material/Feed";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { useEffect, useState } from "react";
import axios from "axios";
import PieChart from "../../components/dashboard/PieChart";
import IndividualPieChart from "../../components/dashboard/IndividualPieChart";
import BarChart from "../../components/dashboard/BarChart";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_SERVER;

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [counter, setCounter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedState, setSelectedState] = useState("");

  // const states = [
  //   { value: "", label: "All" },
  //   { value: "GJBRC", label: "Gujarat" },
  //   { value: "ORPUR", label: "Odisha" },
  //   { value: "MPBHS", label: "Bhopal" },
  //   { value: "PBLDH", label: "Ludhiana" },
  //   { value: "PYPDY", label: "Pondicherry" },
  // ];

  const states = [
    {
      value: "",
      label: "All",
      target: {
        HFAT1: 0,
        HFAT2: 53,
        HFAT3: 215,
        CST: 6000,
        AMBULANCE: 247,
        Autopsy: 0,
      },
    },
    {
      value: "GJBRC",
      label: "Gujarat",
      target: {
        HFAT1: 0,
        HFAT2: 11,
        HFAT3: 85,
        CST: 6000,
        AMBULANCE: 71,
        Autopsy: 0,
      },
    },
    {
      value: "ORPUR",
      label: "Odisha",
      target: {
        HFAT1: 0,
        HFAT2: 17,
        Autopsy: 0,
        HFAT3: 44,
        CST: 600,
        AMBULANCE: 54,
      },
    },
    {
      value: "MPBHS",
      label: "Bhopal",
      target: {
        HFAT1: 0,
        HFAT2: 7,
        Autopsy: 0,
        HFAT3: 25,
        CST: 6000,
        AMBULANCE: 50,
      },
    },
    {
      value: "PBLDH",
      label: "Ludhiana",
      target: {
        HFAT1: 0,
        HFAT2: 16,
        HFAT3: 31,
        CST: 6000,
        AMBULANCE: 50,
        Autopsy: 0,
      },
    },
    {
      value: "PYPDY",
      label: "Pondicherry",
      target: {
        HFAT1: 0,
        HFAT2: 2,
        HFAT3: 30,
        CST: 6000,
        AMBULANCE: 22,
        Autopsy: 0,
      },
    },
  ];

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // console.log(`${url}/count`);
  //       const { data } = await axios.get(`${url}/count`);
  //       setCounter(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const { data } = await axios.get(`${url}/adminCount`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setCounter(data);
  //   } catch (error) {
  //     console.log(error);
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("user");
  //     navigate("/login");
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const fetchData = async () => {
    try {
      const role = user?.role;
      const apiUrl =
        role === "superadmin" || role === "analytics"
          ? `${url}/superadminCount`
          : `${url}/adminCount`;

      // Ensure the selectedState is being set correctly
      console.log("Fetching data for state:", selectedState);

      const { data } = await axios.get(apiUrl, {
        params: {
          newState: selectedState,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Log the data received to help debug
      console.log("Data received:", data);

      setCounter(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedState, user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        {/* <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box> */}
      </Box>
      <Box padding={"0px 0px 20px 0px"}>
        {user.role == "superadmin" || user.role == "analytics" ? (
          <Box>
            {states.map((state) => (
              <Button
                key={state.value}
                sx={{
                  backgroundColor:
                    selectedState === state.value
                      ? colors.greenAccent[700]
                      : colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  mr: "10px",
                  // hover
                  "&:hover": {
                    backgroundColor: colors.blueAccent[600],
                  },
                }}
                onClick={() => {
                  setSelectedState(state.value);
                }}
              >
                {state.label}
              </Button>
            ))}
          </Box>
        ) : (
          <></>
        )}
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            // title={counter.HFAT1Count ?? "0"}
            title={
              `${counter.HFAT1Count}${
                states.find((state) => state.value === selectedState)?.target
                  .HFAT1 == 0
                  ? ""
                  : ` / ${
                      states.find((state) => state.value === selectedState)
                        ?.target.HFAT1
                    }`
              }` ?? "0"
            }
            subtitle="HFAT-1"
            // progress={counter.HFAT1Count / 100}
            // increase="+2 New"
            icon={
              <FeedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            // title={counter.HFAT2Count ?? "0"}
            title={
              `${counter.HFAT2Count}${
                states.find((state) => state.value === selectedState)?.target
                  .HFAT2 == 0
                  ? ""
                  : ` / ${
                      states.find((state) => state.value === selectedState)
                        ?.target.HFAT2
                    }`
              }` ?? "0"
            }
            subtitle="HFAT-2"
            // progress={counter.HFAT2Count / 100}
            // increase="+21 New"
            icon={
              <FeedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            // title={counter.HFAT3Count ?? "0"}
            title={
              `${counter.HFAT3Count}${
                states.find((state) => state.value === selectedState)?.target
                  .HFAT3 == 0
                  ? ""
                  : ` / ${
                      states.find((state) => state.value === selectedState)
                        ?.target.HFAT3
                    }`
              }` ?? "0"
            }
            subtitle="HFAT-3"
            // progress={counter.HFAT3Count / 100}
            // increase="+5 New"
            icon={
              <FeedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            // title={counter.AMBULANCECount ?? "0"}
            title={
              `${counter.AMBULANCECount}${
                states.find((state) => state.value === selectedState)?.target
                  .AMBULANCE == 0
                  ? ""
                  : ` / ${
                      states.find((state) => state.value === selectedState)
                        ?.target.AMBULANCE
                    }`
              }` ?? "0"
            }
            subtitle="Ambulance"
            // progress={counter.AMBULANCECount / 10000}
            // increase="+43 New"
            icon={
              <FeedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            // title={counter.CSTCount ?? "0"}
            title={
              `${counter.CSTCount}${
                states.find((state) => state.value === selectedState)?.target
                  .CST == 0
                  ? ""
                  : ` / ${
                      states.find((state) => state.value === selectedState)
                        ?.target.CST
                    }`
              }` ?? "0"
            }
            subtitle="CST"
            // progress={counter.AMBULANCECount / 10000}
            // increase="+43 New"
            icon={
              <FeedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            // title={counter.AutopsyCount ?? "0"}
            title={
              `${counter.AutopsyCount}${
                states.find((state) => state.value === selectedState)?.target
                  ?.Autopsy == 0
                  ? ""
                  : ` / ${states.find(
                      (state) => state.value === selected?.target?.Autopsy
                    )}`
              }` ?? "0"
            }
            subtitle="Autopsy"
            // progress={counter.AMBULANCECount / 10000}
            // increase="+43 New"
            icon={
              <FeedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box> */}
      </Box>

      <Box
        display="flex"
        my="20px"
        flexDirection="row"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Box
          p="10px"
          backgroundColor={colors.primary[400]}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
        >
          {states.find((state) => state.value === selectedState)?.target
            .HFAT1 <= 0 ? (
            ""
          ) : (
            <IndividualPieChart
              counter={counter.HFAT1Count ?? 0}
              title={"HFAT-1"}
              target={
                states.find((state) => state.value === selectedState)?.target
                  .HFAT1
              }
            />
          )}
          <Box
            p="10px"
            backgroundColor={colors.primary[400]}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
          >
            {states.find((state) => state.value === selectedState)?.target
              .HFAT2 <= 0 ? (
              ""
            ) : (
              <IndividualPieChart
                counter={counter.HFAT2Count ?? 0}
                title={"HFAT-2"}
                target={
                  states.find((state) => state.value === selectedState)?.target
                    .HFAT2
                }
              />
            )}
          </Box>
          <Box
            p="10px"
            backgroundColor={colors.primary[400]}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
          >
            {states.find((state) => state.value === selectedState)?.target
              .HFAT3 <= 0 ? (
              ""
            ) : (
              <IndividualPieChart
                counter={counter.HFAT3Count ?? 0}
                title={"HFAT-3"}
                target={
                  states.find((state) => state.value === selectedState)?.target
                    .HFAT3
                }
              />
            )}
          </Box>
          <Box
            p="10px"
            backgroundColor={colors.primary[400]}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
          >
            {states.find((state) => state.value === selectedState)?.target
              .AMBULANCE <= 0 ? (
              ""
            ) : (
              <IndividualPieChart
                counter={counter.AMBULANCECount ?? 0}
                title={"Ambulance"}
                target={
                  states.find((state) => state.value === selectedState)?.target
                    .AMBULANCE
                }
              />
            )}
          </Box>
          <Box
            p="10px"
            backgroundColor={colors.primary[400]}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
          >
            {states.find((state) => state.value === selectedState)?.target
              .CST <= 0 ? (
              ""
            ) : (
              <IndividualPieChart
                counter={counter.AMBULANCECount ?? 0}
                title={"CST"}
                target={
                  states.find((state) => state.value === selectedState)?.target
                    .CST
                }
              />
            )}
          </Box>
          <Box
            p="10px"
            backgroundColor={colors.primary[400]}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
          >
            {states.find((state) => state.value === selectedState)?.target
              .Autopsy <= 0 ? (
              ""
            ) : (
              <IndividualPieChart
                counter={counter}
                title={"Autopsy"}
                target={
                  states.find((state) => state.value === selectedState)?.target
                    .Autopsy
                }
              />
            )}
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        my="20px"
        flexDirection="row"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Box
          p="100px"
          backgroundColor={colors.primary[400]}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <PieChart counter={counter} />
        </Box>

        <Box
          p="100px"
          backgroundColor={colors.primary[400]}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <BarChart counter={counter} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
