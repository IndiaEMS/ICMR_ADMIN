import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";

import { DataGridComponent } from "./DataGridComponent.jsx";

import { HFAT1Columns } from "./HFAT-1/HFAT_1_columns";
import { HFAT1ColumnsExport } from "./HFAT-1/HFAT_1_columns_export";
import { HFAT2Columns } from "./HFAT-2/HFAT_2_columns";
import { HFAT2ColumnsExport } from "./HFAT-2/HFAT_2_columns_Export";
import { HFAT3Columns } from "./HFAT-3/HFAT_3_columns";
// import { HFAT2ColumnsExport } from "./HFAT-3/HFAT_2_columns Export";
import { AmbulanceColumns } from "./Ambulance/Ambulance_columns";

import { HFAT1Rows } from "./HFAT-1/HFAT_1_rows";
import { HFAT2Rows } from "./HFAT-2/HFAT_2_rows";
import { HFAT3Rows } from "./HFAT-3/HFAT_3_rows";
import { AmbulanceRows } from "./Ambulance/Ambulance_rows";

import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

const url = import.meta.env.VITE_SERVER;

const ViewData = ({ formName }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);
  const [exportColumns, setExportColumns] = useState();

  // i want to make this rows in a separate file
  // give useMemo in function

  const getRowsAndCols = useMemo(() => {
    if (formName === "HFAT-1") {
      setCols(HFAT1Columns);
      setExportColumns(HFAT1ColumnsExport);
      setRows(HFAT1Rows(data));
      // setRows(AmbulanceRows(data));
    } else if (formName === "HFAT-2") {
      setCols(HFAT2Columns);
      setExportColumns(HFAT2ColumnsExport);
      setRows(HFAT2Rows(data));
    } else if (formName === "HFAT-3") {
      setCols(HFAT3Columns);
      setExportColumns(HFAT3Columns);
      setRows(HFAT3Rows(data));
    } else if (formName === "HFAT-1WithAMB") {
      setCols([...HFAT1Columns, ...AmbulanceColumns]);
      setExportColumns([...HFAT1ColumnsExport, ...AmbulanceColumns]);
      // setRows([
      //   ...HFAT1Rows(data),
      //   ...AmbulanceRows([data.ambulanceDetails ?? {}]),
      // ]);
      setRows(HFAT1Rows(data));
      // setRows(AmbulanceRows(data));
    } else if (formName === "HFAT-2WithAMB") {
      setCols([...HFAT2Columns, ...AmbulanceColumns]);
      setExportColumns([...HFAT2ColumnsExport, ...AmbulanceColumns]);
      setRows(HFAT2Rows(data));
    } else if (formName === "HFAT-3WithAMB") {
      setCols([...HFAT3Columns, ...AmbulanceColumns]);
      setExportColumns([...HFAT3Columns, ...AmbulanceColumns]);
      setRows(HFAT3Rows(data));
    } else if (formName === "AMBULANCE") {
      setCols(AmbulanceColumns);
      setExportColumns(AmbulanceColumns);
      setRows(AmbulanceRows(data));
    } else {
      console.log("No form found");
    }
  }, [formName, data]);

  // const getRowsAndCols = (formName, data) => {
  //   if (formName === "HFAT-1") {
  //     setCols(HFAT1ColumnsCopy);
  //     setRows(HFAT1Rows(data));
  //   } else if (formName === "HFAT-2") {
  //     setCols(HFAT2ColumnsCopy);
  //     setRows(HFAT2Rows(data));
  //   } else if (formName === "HFAT-3") {
  //     setCols(HFAT3Columns);
  //     setRows(HFAT3Rows(data));
  //   } else {
  //     console.log("No form found");
  //   }
  // };

  // getRowsAndCols();

  // const getData = async () => {
  //   try {
  //     const { data } = await axios.get(`${url}/${formName}`);
  //     setData(data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   // getRowsAndCols();
  //   getData();
  // }, []);

  return (
    <div>
      <h1>{formName} View Data</h1>
      <div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: 600 }} // the grid will fill the size of the parent container
      >
        {/* <DataGridComponent
          rows={rows}
          columns={cols}
          exportColumns={exportColumns}
          formName={formName}
          getData={getData}
        /> */}
        {/* <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid checkboxSelection rows={rows} columns={cols} />
        </Box> */}
      </div>
    </div>
  );
};

export default ViewData;
