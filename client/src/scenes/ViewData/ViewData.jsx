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

// import DataGridComponent from "./DataGridComponent";

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

  useEffect(() => {
    if (formName === "HFAT-1") {
      setTitle("HFAT-1");
      setColumns(HFAT1Columns);
      setExportColumns(HFAT1ColumnsExport);
      setRows(HFAT1Rows(data));
      // setRows(AmbulanceRows(data));
    } else if (formName === "HFAT-2") {
      setTitle("HFAT-2");
      setColumns(HFAT2Columns);
      setExportColumns(HFAT2ColumnsExport);
      setRows(HFAT2Rows(data));
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
      setRows(AmbulanceRows(data));
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
      // console.log(`${url}/${formName}`);
      const { data } = await axios.get(`${url}/${formName}`);
      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getRowsAndCols();
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
          pagination={true}
          paginationPageSize={20}
        />
      </Box>
    </Box>
  );
};

export default ViewData;
