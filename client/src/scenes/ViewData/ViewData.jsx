import axios from "axios";
import { Box, Button, Typography, useTheme } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import { DownloadOutlined } from "@mui/icons-material";
import Header from "../../components/Header";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";

import { HFAT1Columns } from "./HFAT-1/HFAT_1_columns";
import { HFAT1ColumnsExport } from "./HFAT-1/HFAT_1_columns_export";
import { HFAT2Columns } from "./HFAT-2/HFAT_2_columns";
import { HFAT2ColumnsExport } from "./HFAT-2/HFAT_2_columns_export";
import { HFAT3Columns } from "./HFAT-3/HFAT_3_columns";
import { HFAT3ColumnsExport } from "./HFAT-3/HFAT_3_columns_export";
import { AmbulanceColumns } from "./Ambulance/Ambulance_columns";
import { AmbulanceColumnsExport } from "./Ambulance/Ambulance_columns_export";

import { HFAT1Rows } from "./HFAT-1/HFAT_1_rows";
import { HFAT2Rows } from "./HFAT-2/HFAT_2_rows";
import { HFAT3Rows } from "./HFAT-3/HFAT_3_rows";
import { AmbulanceRows } from "./Ambulance/Ambulance_rows";

import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { CSTColumns } from "./CST/CST_columns_copy";
import { CSTRows } from "./CST/CST_rows";
import { AutopsyColumnsExport } from "./Autopsy/autopsy_columns_export";
import { useSelector } from "react-redux";

const url = import.meta.env.VITE_SERVER;

const ViewData = ({ formName }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const gridRef = useRef();
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);
  const [columns, setColumns] = useState([]);
  const [exportColumns, setExportColumns] = useState([]);
  const [title, setTitle] = useState(formName);
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);

  const adminState = user;

  const states = [
    { value: "", label: "All" },
    { value: "GJBRC", label: "Gujarat" },
    { value: "ORPUR", label: "Odisha" },
    { value: "MPBHS", label: "Madhya Pradesh" },
    { value: "PBLDH", label: "Ludhiana" },
    { value: "PYPDY", label: "Pondicherry" },
  ];

  useEffect(() => {
    setRows([]);
    if (formName === "HFAT-1") {
      setTitle("HFAT-1");
      setColumns(HFAT1Columns);
      setExportColumns(HFAT1ColumnsExport);
      setRows(data);
      // setRows(HFAT1Rows(data));
      // setRows(AmbulanceRows(data));
    } else if (formName === "HFAT-2") {
      setTitle("HFAT-2");
      setColumns(HFAT2Columns);
      setExportColumns(HFAT2ColumnsExport);
      setRows(data);
      // setRows(HFAT2Rows(data));
    } else if (formName === "HFAT-3") {
      setTitle("HFAT-3");
      setColumns(HFAT3Columns);
      setExportColumns(HFAT3ColumnsExport);
      setRows(HFAT3Rows(data));
    } else if (formName === "HFAT-1WithAMB") {
      setTitle("HFAT-1 with Ambulance");
      setColumns([...HFAT1Columns, ...AmbulanceColumns]);
      setExportColumns([...HFAT1ColumnsExport, ...AmbulanceColumnsExport]);
      setRows(HFAT1Rows(data));
      // setRows(AmbulanceRows(data));
    } else if (formName === "HFAT-2WithAMB") {
      setTitle("HFAT-2 with Ambulance");
      setColumns([...HFAT2Columns, ...AmbulanceColumns]);
      setExportColumns([...HFAT2ColumnsExport, ...AmbulanceColumnsExport]);
      setRows(HFAT2Rows(data));
    } else if (formName === "HFAT-3WithAMB") {
      setTitle("HFAT-3 with Ambulance");
      setColumns([...HFAT3Columns, ...AmbulanceColumns]);
      setExportColumns([...HFAT3ColumnsExport, ...AmbulanceColumnsExport]);
      setRows(HFAT3Rows(data));
    } else if (formName === "AMBULANCE") {
      setTitle("Ambulance");
      setColumns(AmbulanceColumns);
      setExportColumns(AmbulanceColumnsExport);
      // setRows(AmbulanceRows(data));
      setRows(data);
    } else if (formName === "CST") {
      setTitle("Community Survey Tool");
      setColumns(CSTColumns(data));
      setExportColumns(CSTColumns(data));
      setRows(data);
      // setRows(CSTRows(data));
    } else if (formName === "Autopsy") {
      setTitle("Verbal Autopsy Tool");
      setColumns(AutopsyColumnsExport);
      setExportColumns(AutopsyColumnsExport);
      console.log(data);
      setRows(data);

      // setRows(CSTRows(data));
    } else {
      console.log("No form found");
    }
    setCols(columns);
  }, [formName, data]);

  useEffect(() => {
    setCols(columns);
  }, [columns]);

  // getRowsAndCols();

  const getData = async () => {
    try {
      setLoading(true);
      // console.log(`${url}/${formName}/${selectedState}`);
      const { data } = await axios.get(`${url}/${formName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(data?.data);
      // console.log("DATA......................",data?.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  // make a function to filter data based on state
  // useEffect(() => {
  //   if (selectedState === "") {
  //     setRows(HFAT1Rows(data));
  //   } else {
  //     setRows(
  //       HFAT1Rows(data).filter((row) => row["A3"].startsWith(selectedState))
  //     );
  //   }
  // }, [selectedState, data]);

  // useEffect(() => {
  //   if (selectedState === "") {
  //     setRows(data); // Show all rows if no state is selected
  //   } else {
  //     const filteredRows = data.filter((row) =>
  //       row["A3"].startsWith(selectedState)
  //     );
  //     setRows(filteredRows);
  //   }
  // }, [selectedState, data]);

  useEffect(() => {
    if (selectedState === "") {
      setRows(data); // Show all rows if no state is selected
    } else {
      // Filter rows where any field in the row might contain the state value
      const filteredRows = data.filter((row) => {
        return Object.values(row).some(
          (cellValue) =>
            typeof cellValue === "string" && cellValue.startsWith(selectedState)
        );
      });
      setRows(filteredRows);
    }
  }, [selectedState, data]);

  useEffect(() => {
    getData();
  }, [formName]);

  const handleDownloadCSV = async () => {
    try {
      setCols(exportColumns);
      // refresh header
      await gridRef.current.api.refreshClientSideRowModel();
      // export to csv
      gridRef.current.api.exportDataAsCsv({ fileName: `${formName}.csv` });
    } catch (error) {
      console.log(error);
    } finally {
      setCols(columns);
    }
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={title} subtitle={`Managing the ${title}`} />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              mr: "10px",
            }}
            onClick={() => {
              getData();
            }}
          >
            <RefreshIcon sx={{ mr: "10px" }} />
            Refresh
          </Button>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={handleDownloadCSV}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download in CSV
          </Button>
        </Box>
      </Box>
      <Box>
        <Box>
          {user.role === "superadmin" && (
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
                  }}
                  onClick={() => {
                    setSelectedState(state.value);
                  }}
                >
                  {state.label}
                </Button>
              ))}
            </Box>
          )}

          {/* <Button
            sx={{
              backgroundColor: colors.greenAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              mr: "10px",
            }}
            onClick={() => {
              getData();
            }}
          >
            Gujarat
          </Button>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              mr: "10px",
            }}
            onClick={() => {
              getData();
            }}
          >
            Odisha
          </Button>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              mr: "10px",
            }}
            onClick={() => {
              getData();
            }}
          >
            Madhya Pradesh
          </Button>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              mr: "10px",
            }}
            onClick={() => {
              getData();
            }}
          >
            Ludhiana
          </Button>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              mr: "10px",
            }}
            onClick={() => {
              getData();
            }}
          >
            pondicherry
          </Button> */}
        </Box>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        className="ag-theme-quartz"
        sx={{
          "& .ag-root-wrapper": {
            backgroundColor: colors.primary[400],
          },
          "& .ag-header": {
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
          },
          "& .ag-header-cell": {
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
          },
          "& .ag-header-group-cell": {
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
          },
          "& .ag-body": {
            backgroundColor: colors.primary[400],
            color: colors.grey[100],
          },
          "& .ag-paging-panel": {
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
          },
          "& .ag-picker-field-wrapper": {
            color: colors.grey[900],
          },
          "& .ag-icon": {
            color: colors.grey[100],
          },
          "& .ag-floating-filter-input": {
            color: "black",
          },
          "& .ag-checkbox-input-wrapper": {
            color: colors.greenAccent[200],
          },
          "& .ag-icon-checkbox-checked": {
            color: colors.greenAccent[200],
          },
          "& .ag-overlay-no-rows-center": {
            backgroundColor: colors.primary[400],
            color: colors.grey[100],
          },
          "& .ag-row": {
            backgroundColor: colors.primary[400],
            color: colors.grey[100],
          },
        }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rows}
          columnDefs={cols ?? columns}
          rowSelection={"multiple"}
          defaultColDef={{
            sortable: true,
            filter: true,
            floatingFilter: true,
          }}
          localeText={loading ? "Loading..." : "No data available"}
          pagination={true}
          paginationPageSize={20}
        />
      </Box>
    </Box>
  );
};

export default ViewData;
