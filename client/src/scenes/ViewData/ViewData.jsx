import axios from "axios";
import {
  Box,
  Button,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

import { tokens } from "../../theme";
import RefreshIcon from "@mui/icons-material/Refresh";
import { DownloadOutlined } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../components/Header";
import React, { useState, useEffect, useRef } from "react";

import { HFAT1Columns } from "./HFAT-1/HFAT_1_columns";
import { HFAT1ColumnsExport } from "./HFAT-1/HFAT_1_columns_export";
import { HFAT2Columns } from "./HFAT-2/HFAT_2_columns";
import { HFAT2ColumnsExport } from "./HFAT-2/HFAT_2_columns_export";
import { HFAT3Columns } from "./HFAT-3/HFAT_3_columns";
import { HFAT3ColumnsExport } from "./HFAT-3/HFAT_3_columns_export";
import {
  AmbulanceColumns,
  HFATAmbulanceColumns,
} from "./Ambulance/Ambulance_columns";
import {
  AmbulanceColumnsExport,
  HFATAmbulanceColumnsExport,
} from "./Ambulance/Ambulance_columns_export";

import { HFAT1Rows } from "./HFAT-1/HFAT_1_rows";
import { HFAT2Rows } from "./HFAT-2/HFAT_2_rows";
import { HFAT3Rows } from "./HFAT-3/HFAT_3_rows";

import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { CSTColumns } from "./CST/CST_columns";
import { AutopsyColumnsExport } from "./Autopsy/autopsy_columns_export";
import { useSelector } from "react-redux";
import MapView from "./MapView";

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
  const [selectedRows, setSelectedRows] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);

  const [isMapOpen, setIsMapOpen] = useState(false);
  const [mapData, setMapData] = useState([]);

  const adminState = user;

  const states = [
    { value: "", label: "All" },
    { value: "GJBRC", label: "Gujarat" },
    { value: "ORPUR", label: "Odisha" },
    { value: "MPBHS", label: "Bhopal" },
    { value: "PBLDH", label: "Ludhiana" },
    { value: "PYPDY", label: "Pondicherry" },
  ];

  useEffect(() => {
    setRows([]);
    // setMapData([]);
    // setColumns([]);
    // setExportColumns([]);
    if (formName === "HFAT-1") {
      setTitle("HFAT-1");
      setColumns(HFAT1Columns);
      setExportColumns(HFAT1ColumnsExport);
      setRows(data);
      setMapData(
        rows
          .filter(
            (row) =>
              row.A10 &&
              row.A10.latitude &&
              row.A10.longitude &&
              !/[a-zA-Z°]/.test(row.A10.latitude) &&
              !/[a-zA-Z°]/.test(row.A10.longitude) &&
              /^-?\d+(\.\d+)?$/.test(row.A10.latitude) && // Check for valid number format
              /^-?\d+(\.\d+)?$/.test(row.A10.longitude)
          )
          .map((row) => [row.A10?.latitude, row.A10?.longitude])
      );
      // setRows(HFAT1Rows(data));
      // setRows(AmbulanceRows(data));
    } else if (formName === "HFAT-2") {
      setTitle("HFAT-2");
      setColumns(HFAT2Columns);
      setExportColumns(HFAT2ColumnsExport);
      setRows(data);
      setMapData(
        rows
          .filter(
            (row) =>
              row.H2A9 &&
              row.H2A9.latitude &&
              row.H2A9.longitude &&
              !/[a-zA-Z°]/.test(row.H2A9.latitude) &&
              !/[a-zA-Z°]/.test(row.H2A9.longitude) &&
              /^-?\d+(\.\d+)?$/.test(row.H2A9.latitude) && // Check for valid number format
              /^-?\d+(\.\d+)?$/.test(row.H2A9.longitude)
          )
          .map((row) => [row.H2A9?.latitude, row.H2A9?.longitude])
      );
      // setRows(HFAT2Rows(data));
    } else if (formName === "HFAT-3") {
      setTitle("HFAT-3");
      setColumns(HFAT3Columns);
      setExportColumns(HFAT3ColumnsExport);
      setRows(HFAT3Rows(data));
      setMapData(
        rows
          .filter(
            (row) =>
              row.H3A9 &&
              row.H3A9.latitude &&
              row.H3A9.longitude &&
              !/[a-zA-Z°]/.test(row.H3A9.latitude) &&
              !/[a-zA-Z°]/.test(row.H3A9.longitude) &&
              /^-?\d+(\.\d+)?$/.test(row.H3A9.latitude) && // Check for valid number format
              /^-?\d+(\.\d+)?$/.test(row.H3A9.longitude)
          )
          .map((row) => [row.H3A9?.latitude, row.H3A9?.longitude])
      );
    } else if (formName === "HFAT-1WithAMB") {
      setTitle("HFAT-1 with Ambulance");
      setColumns([...HFAT1Columns, ...HFATAmbulanceColumns]);
      setExportColumns([...HFAT1ColumnsExport, ...HFATAmbulanceColumnsExport]);
      // console.log(data);

      setRows(HFAT1Rows(data));
      // setRows(AmbulanceRows(data.AmbulanceDetails));
    } else if (formName === "HFAT-2WithAMB") {
      setTitle("HFAT-2 with Ambulance");
      setColumns([...HFAT2Columns, ...HFATAmbulanceColumns]);
      setExportColumns([...HFAT2ColumnsExport, ...HFATAmbulanceColumnsExport]);
      // console.log(data);
      setRows(HFAT2Rows(data));
    } else if (formName === "HFAT-3WithAMB") {
      setTitle("HFAT-3 with Ambulance");
      setColumns([...HFAT3Columns, ...HFATAmbulanceColumns]);
      setExportColumns([...HFAT3ColumnsExport, ...HFATAmbulanceColumnsExport]);
      setRows(HFAT3Rows(data));
    } else if (formName === "AMBULANCE") {
      setTitle("Ambulance");
      setColumns(AmbulanceColumns);
      setExportColumns(AmbulanceColumnsExport);
      // setRows(AmbulanceRows(data));
      setRows(data);
      setMapData(
        rows
          .filter(
            (row) =>
              row.AMB4 &&
              row.AMB4.latitude &&
              row.AMB4.longitude &&
              !/[a-zA-Z°]/.test(row.AMB4?.latitude) &&
              !/[a-zA-Z°]/.test(row.AMB4?.longitude) &&
              /^-?\d+(\.\d+)?$/.test(row.AMB4.latitude) && // Check for valid number format
              /^-?\d+(\.\d+)?$/.test(row.AMB4.longitude)
          )
          .map((row) => [row.AMB4?.latitude, row.AMB4?.longitude])
      );
    } else if (formName === "CST") {
      setTitle("Community Survey Tool");
      setColumns(CSTColumns(data));
      setExportColumns(CSTColumns(data));
      setRows(data);
      setMapData(
        rows
          .filter(
            (row) =>
              row.AB4 &&
              row.AB4.latitude &&
              row.AB4.longitude &&
              !/[a-zA-Z°]/.test(row.AB4?.latitude) &&
              !/[a-zA-Z°]/.test(row.AB4?.longitude)
          )
          .map((row) => [row.AB4.latitude, row.AB4.longitude])
      );
      // setRows(CSTRows(data));
    } else if (formName === "Autopsy") {
      setTitle("Verbal Autopsy Tool");
      setColumns(AutopsyColumnsExport);
      setExportColumns(AutopsyColumnsExport);
      // console.log(data);
      setRows(data);

      // setRows(CSTRows(data));
    } else {
      console.log("No form found");
    }
    setCols(columns);
  }, [data]);

  useEffect(() => {
    setRows([]);
    setMapData([]);
    setColumns([]);
    setExportColumns([]);
    getData();
  }, [formName]);

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
      const filteredRows = data?.filter((row) => {
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

  const handleDelete = async () => {
    if (selectedRows.length === 0) {
      alert("No rows selected for deletion!");
      return;
    }

    const selectedIds = selectedRows.map((row) => row._id); // Assuming the rows have an 'id' field

    try {
      // Make delete request
      await axios.delete(`${url}/${formName}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { ids: selectedIds }, // Sending the selected ids to be deleted
      });

      // Refresh the data after successful deletion
      getData();
      alert("Selected rows deleted successfully");
    } catch (error) {
      console.error("Error deleting rows:", error);
      alert("Failed to delete rows");
    }
  };

  const onSelectionChanged = (params) => {
    const selectedNodes = params.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    setSelectedRows(selectedData);

    if (selectedData.length > 10) {
      // Enforce the selection limit of 10
      alert("Maximum 10 records can be selected at one time.");
    }
  };

  const handleOpenMap = () => {
    const firstSelectedRow = selectedRows[0];
    if (firstSelectedRow) {
      const location = [firstSelectedRow.lat, firstSelectedRow.lng]; // assuming your row has lat/lng properties
      setSelectedLocation(location);
    }
    setIsMapOpen(true);
  };

  const handleCloseMap = () => {
    setIsMapOpen(false);
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
              mr: "10px",
            }}
            onClick={handleDownloadCSV}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download in CSV
          </Button>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={handleDelete}
          >
            <DeleteIcon sx={{ mr: "10px" }} />
            Delete
          </Button>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
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

        {mapData.length > 0 && (
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
              onClick={handleOpenMap}
            >
              View In Map
            </Button>
          </Box>
        )}
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
          onSelectionChanged={onSelectionChanged}
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
      <Dialog open={isMapOpen} onClose={handleCloseMap} maxWidth="lg" fullWidth>
        <DialogTitle>
          View Location on Map (<b>Note:</b> Invalid coordinates will not be
          shown on the map.)
        </DialogTitle>
        <DialogContent>
          <Box style={{ height: "600px" }}>
            <MapView
              // mapData={ambulanceData}
              mapData={mapData ?? []} // Assuming rows have lat/lng
              selectedLocation={selectedState}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ViewData;
