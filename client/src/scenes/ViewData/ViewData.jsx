import axios from "axios";
import {
  Box,
  Button,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";

import { tokens } from "../../theme";
import RefreshIcon from "@mui/icons-material/Refresh";
import { DownloadOutlined, UploadFile } from "@mui/icons-material";
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
import { LOTColumns } from "./LOT/LOT_columns";
import { LOTColumnsExport } from "./LOT/LOT_columns_export";

import { LOTFinalColumns } from "./LOT final/LOT_columns";
import { LOTFinalColumnsExport } from "./LOT final/LOT_columns_export";

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
  const gridRef = useRef(null);
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);
  const [columns, setColumns] = useState([]);
  const [exportColumns, setExportColumns] = useState([]);
  const [title, setTitle] = useState(formName);
  const [loading, setLoading] = useState(false);
  const [fileUploadLoading, setFileUploadLoading] = useState(false);
  const [isDownloadDisabled, setIsDownloadDisabled] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);

  const [isMapOpen, setIsMapOpen] = useState(false);
  const [mapData, setMapData] = useState([]);

  const [isMapBtnDisabled, setIsMapBtnDisabled] = useState(false);

  const [isFinalData, setIsFinalData] = useState(false);
  const [uploadPopupOpen, setUploadPopupOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [sampleFileLink, setSampleFileLink] = useState("");

  const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && !file.name.endsWith(".xls") && !file.name.endsWith(".xlsx")) {
      alert("Please select a Excel file.");
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
  }
};


  const handleUploadPopupClose = () => {
    setUploadPopupOpen(false);
    setSelectedFile(null);
  };

  const adminState = user;

  const states = [
    { value: "", label: "All" },
    { value: "GJBRC", label: "Gujarat", coordinate: [22.309425, 72.13623] },
    { value: "ORPUR", label: "Odisha", coordinate: [20.9517, 85.0985] },
    { value: "MPBHS", label: "Bhopal", coordinate: [23.2599, 77.4126] },
    { value: "PBLDH", label: "Ludhiana", coordinate: [30.901, 75.8573] },
    { value: "PYPDY", label: "Pondicherry", coordinate: [11.9416, 79.8083] },
  ];

  const filterAndMapData = (rows) => {
    setMapData([]);
    var field = "";
    switch (formName) {
      case "HFAT-1":
        field = "A10";
        break;
      case "HFAT-2":
        field = "H2A9";
        break;
      case "HFAT-3":
        field = "H3A9";
        break;
      case "AMBULANCE":
        field = "AMB4";
        break;
      case "CST":
        field = "AB4";
        break;
      case "Autopsy":
        field = "AB4";
        break;
      default:
        field = "";
        break;
    }

    if (field === "") return;

    setMapData(
      rows
        .filter(
          (row) =>
            row[field] &&
            row[field].latitude &&
            row[field].longitude &&
            !/[a-zA-Z°]/.test(row[field].latitude) &&
            !/[a-zA-Z°]/.test(row[field].longitude) &&
            /^-?\d+(\.\d+)?$/.test(row[field].latitude) && // Check for valid number format
            /^-?\d+(\.\d+)?$/.test(row[field].longitude)
        )
        .map((row) => [
          row[field]?.latitude,
          row[field]?.longitude,
          formName == "CST" ? row.Respondent_ID : row.uniqueCode,
        ])
    );
  };

  useEffect(() => {
    // console.log(adminState);
    if (adminState.role === "admin") {
      setSelectedState(
        states.find((state) => state.label === adminState.sitename)?.value
      );
    }

    setIsFinalData(false);
    setLoading(true);
    setRows([]);
    if (formName === "HFAT-1") {
      setTitle("HFAT-1");
      setColumns(HFAT1ColumnsExport);
      setCols(HFAT1ColumnsExport);
      // setColumns(HFAT1ColumnsExport);
      setExportColumns(HFAT1ColumnsExport);
      setRows(data);
      filterAndMapData(data);
      // setRows(HFAT1Rows(data));
      // setRows(AmbulanceRows(data));
    }else if (formName === "HFAT-1-FINAL") {
      setTitle("HFAT-1");
      // setColumns(HFAT1ColumnsExport);
      // setCols(HFAT1ColumnsExport);
      getCols();
      // setColumns(HFAT1ColumnsExport);
      // setExportColumns(HFAT1ColumnsExport);
      setRows(data);
      filterAndMapData(data);
      setIsFinalData(true);
      // setRows(HFAT1Rows(data));
      // setRows(AmbulanceRows(data));
    }  
    else if (formName === "HFAT-2") {
      setTitle("HFAT-2");
      setColumns(HFAT2ColumnsExport);
      setCols(HFAT2ColumnsExport);
      setExportColumns(HFAT2ColumnsExport);
      setRows(data);
      filterAndMapData(data);
      // setRows(HFAT2Rows(data));
    } else if (formName === "HFAT-2-FINAL") {
      setTitle("HFAT-2");
      // setColumns(HFAT2ColumnsExport);
      // setCols(HFAT2ColumnsExport);
      // setExportColumns(HFAT2ColumnsExport);
      getCols();
      setRows(data);
      filterAndMapData(data);
      setIsFinalData(true);
      // setRows(HFAT2Rows(data));
    } else if (formName === "HFAT-3") {
      setTitle("HFAT-3");
      setColumns(HFAT3ColumnsExport);
      setCols(HFAT3ColumnsExport);
      setExportColumns(HFAT3ColumnsExport);
      // setRows(HFAT3Rows(data));
      setRows(data);
      filterAndMapData(data);
    } else if (formName === "HFAT-3-FINAL") {
      setTitle("HFAT-3");
      // setColumns(HFAT3ColumnsExport);
      // setCols(HFAT3ColumnsExport);
      // setExportColumns(HFAT3ColumnsExport);
      // setRows(HFAT3Rows(data));
      getCols();
      setRows(data);
      filterAndMapData(data);
      setIsFinalData(true);
    } else if (formName === "HFAT-1WithAMB") {
      setTitle("HFAT-1 with Ambulance");
      setColumns([...HFAT1Columns, ...HFATAmbulanceColumns]);
      setCols([...HFAT1Columns, ...HFATAmbulanceColumns]);
      setExportColumns([...HFAT1ColumnsExport, ...HFATAmbulanceColumnsExport]);

      setRows(data);
    } else if (formName === "HFAT-1WithAMB-FINAL") {
      setTitle("HFAT-1 with Ambulance");
      setColumns([...HFAT1Columns, ...HFATAmbulanceColumns]);
      setCols([...HFAT1Columns, ...HFATAmbulanceColumns]);
      setExportColumns([...HFAT1ColumnsExport, ...HFATAmbulanceColumnsExport]);
      setRows(data);
    } else if (formName === "HFAT-2WithAMB") {
      setTitle("HFAT-2 with Ambulance");
      setColumns([...HFAT2Columns, ...HFATAmbulanceColumns]);
      setCols([...HFAT2Columns, ...HFATAmbulanceColumns]);
      setExportColumns([...HFAT2ColumnsExport, ...HFATAmbulanceColumnsExport]);
      setRows(data);
    } else if (formName === "HFAT-2WithAMB-FINAL") {
      setTitle("HFAT-2 with Ambulance");
      setColumns([...HFAT2Columns, ...HFATAmbulanceColumns]);
      setCols([...HFAT2Columns, ...HFATAmbulanceColumns]);
      setExportColumns([...HFAT2ColumnsExport, ...HFATAmbulanceColumnsExport]);
      setRows(data);
    } else if (formName === "HFAT-3WithAMB") {
      setTitle("HFAT-3 with Ambulance");
      setColumns([...HFAT3Columns, ...HFATAmbulanceColumns]);
      setCols([...HFAT3Columns, ...HFATAmbulanceColumns]);
      setExportColumns([...HFAT3ColumnsExport, ...HFATAmbulanceColumnsExport]);
      setRows(data);
    } else if (formName === "HFAT-3WithAMB-FINAL") {
      setTitle("HFAT-3 with Ambulance");
      setColumns([...HFAT3Columns, ...HFATAmbulanceColumns]);
      setCols([...HFAT3Columns, ...HFATAmbulanceColumns]);
      setExportColumns([...HFAT3ColumnsExport, ...HFATAmbulanceColumnsExport]);
      setRows(data);
    } else if (formName === "AMBULANCE") {
      setTitle("Ambulance");
      setColumns(AmbulanceColumns);
      setCols(AmbulanceColumns);
      setExportColumns(AmbulanceColumnsExport);
      // setRows(AmbulanceRows(data));
      setRows(data);
      filterAndMapData(data);
    } else if (formName === "AMBULANCE-FINAL") {
      setTitle("Ambulance");
      // setColumns(AmbulanceColumns);
      // setCols(AmbulanceColumns);
      // setExportColumns(AmbulanceColumnsExport);
      // setRows(AmbulanceRows(data));
      getCols();
      setRows(data);
      filterAndMapData(data);
      setIsFinalData(true);
    } else if (formName === "CST") {
      setTitle("Community Survey Tool");
      setColumns(CSTColumns(data));
      setCols(CSTColumns(data));
      setExportColumns(CSTColumns(data));
      setRows(data);
      filterAndMapData(data);
    } else if (formName === "CST-FINAL") {
      setTitle("CST");
      // setColumns(CSTColumns(data));
      // setCols(CSTColumns(data));
      // setExportColumns(CSTColumns(data));
      // setRows(data);
      getCols();
      setRows(data);
      filterAndMapData(data);
      setIsFinalData(true);
    } else if (formName === "Autopsy") {
      setTitle("Verbal Autopsy Tool");
      setColumns(AutopsyColumnsExport);
      setCols(AutopsyColumnsExport);
      setExportColumns(AutopsyColumnsExport);
      // console.log(data);
      setRows(data);

      // setRows(CSTRows(data));
    } else if (formName === "Autopsy-FINAL") {
      setTitle("Verbal Autopsy Tool");
      getCols();
      setRows(data);
      filterAndMapData(data);
      setIsFinalData(true);
    } 
    else if(formName === "LOT"){
      setTitle("Live Observation Tool");
      setColumns(LOTColumns);
      setCols(LOTColumns);
      setExportColumns(LOTColumnsExport);
      setRows(data);
      filterAndMapData(data);
    }else if(formName === "LOT-FINAL"){
      setTitle("Live Observation Tool");
      setColumns(LOTFinalColumns);
      setCols(LOTFinalColumns);
      setExportColumns(LOTFinalColumnsExport);
      setRows(data);
      setIsFinalData(true);
      filterAndMapData(data);
    }else {
      console.log("No form found");
    }
    // setCols(columns);
    setLoading(false);
    // setCols(columns);
  }, [data]);

  useEffect(() => {
    // Reset states before fetching data
    const resetState = () => {
      setRows([]);
      setMapData([]);
      setColumns([]);
      setExportColumns([]);
    };

    resetState();
    // getData(); // Fetch new data based on formName
    getData(); // Fetch new data based on formName
  }, [formName]);

  // useEffect(() => {
  //   setCols(columns);
  // }, [columns]);

  // getRowsAndCols();

  const getCols = async () => {
    if (loading) return; // Prevent duplicate requests while loading

  try {
    const { data } = await axios.get(`${url}/${formName}-Rows`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // setRows(data?.data || []);
    setColumns(data?.rows || []);
    setCols(data?.rows || []);
    setExportColumns(data?.rows || []);
    setLoading(true); // Start loading after initial data fetch
  } catch (error) {
    console.error(error);
    if(localStorage.getItem("token") === null || localStorage.getItem("user") === null) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
  }
  finally {
    setLoading(false); // End loading
  }
};

  
  const getData = async () => {
    if (loading) return; // Prevent duplicate requests while loading

    try {
      const chunkSize = 2000; // Define the number of records per chunk
      let currentPage = 1; // Start with the first page
      let allData = []; // Array to store all fetched data
      let totalFetched = 0; // Track the total number of fetched records

      while (true) {
        // Fetch a chunk of data from the server
        const { data } = await axios.get(`${url}/${formName}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: currentPage, // Current page number
            limit: chunkSize, // Number of records per page
          },
        });
        // console.log(`Fetched ${data?.data?.length} records from page ${currentPage}`);
        
        const chunkData = data?.data || [];

        allData = [...allData, ...chunkData]; // Append the chunk data
        totalFetched += chunkData.length; // Track the total fetched records

        setData([...allData]); // Update the state incrementally

        // If the chunk size is less than the requested chunkSize, we are at the last chunk
        if (chunkData.length < chunkSize) {
          break;
        }

        currentPage++; // Increment the page to fetch the next chunk
      }

      setLoading(true); // Start loading after initial data fetch
    } catch (error) {
      console.log(error);
      if(localStorage.getItem("token") === null || localStorage.getItem("user") === null) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    if (adminState.role === "superadmin") {
      setMapData([]);
      if (selectedState === "") {
        setRows(data); // Show all rows if no state is selected
        filterAndMapData(data);
        setIsMapBtnDisabled(false);
      } else {
        // Filter rows where any field in the row might contain the state value
        const filteredRows = data?.filter((row) => {
          return Object.values(row).some(
            (cellValue) =>
              typeof cellValue === "string" &&
              cellValue.startsWith(selectedState)
          );
        });
        setRows(filteredRows);
        filterAndMapData(filteredRows);
        // setIsMapBtnDisabled(true);
      }
    }
  }, [selectedState, data]);

  const handleSampleDownload = async (formName) => {
  try {
    window.open(`${url}/common/download-sample/${formName}`, "_blank");
  } catch (error) {
    console.error("❌ Download failed:", error);
    alert("Failed to download sample file. Please try again.");
  }
};

  const handleDownloadCSV = async () => {
    try {
      if (isDownloadDisabled) return;
      setIsDownloadDisabled(true);

      if (formName === "CST") {
        // Call the /download-csv API for CST
        const response = await axios.get(`${url}/download-csv`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob", // Ensure the response is treated as a file
        });

        // Create a download link for the file
        const blob = new Blob([response.data], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `${formName}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        setCols(exportColumns);
        // Refresh header
        await gridRef.current.api.refreshClientSideRowModel();
        // Export to CSV
        gridRef.current.api.exportDataAsCsv({ fileName: `${formName}.csv` });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setCols(columns);
      setIsDownloadDisabled(false);
    }
  };


  // const handleDownloadCSV = async () => {
  //   try {
  //     if(isDownloadDisabled) return;
  //     setIsDownloadDisabled(true);

  //     if(formName === "CST"){
        
  //     }
  //     // setCols(exportColumns);
  //     // await gridRef.current.api.refreshClientSIdeRowModel();
  //     gridRef.current.api.exportDataAsCsv({
  //       fileName: `${formName}.csv`,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     // setCols(columns);
  //     setIsDownloadDisabled(false);
  //   }
  // };

  // const handleDownloadCSV = async () => {
  //   try {
  //     setCols(exportColumns);
  //     // refresh header
  //     await gridRef.current.api.refreshClientSideRowModel();
  //     // export to csv
  //     gridRef.current.api.exportDataAsCsv({ fileName: `${formName}.csv` });
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setCols(columns);
  //   }
  // };

  // const handleDownloadCSV = async () => {
  //   try {
  //     if (isDownloadDisabled) return;
  //     setIsDownloadDisabled(true);
  //     setCols(exportColumns);
  
  //     // Refresh header
  //     await gridRef.current.api.refreshClientSideRowModel();
  
  //     const rowCount = gridRef.current.api.getDisplayedRowCount();
  //     const batchSize = 500; // Adjust batch size based on performance
  //     let fileCounter = 1;
  
  //     for (let i = 0; i < rowCount; i += batchSize) {
  //       // Get CSV data for the current batch
  //       const csvData = gridRef.current.api.getDataAsCsv({
  //         onlySelected: false,
  //         columnSeparator: ',',
  //         suppressQuotes: false,
  //         processCellCallback: (params) => params.value,
  //       });
  
  //       // Save as a separate CSV file
  //       await downloadCsvFile(csvData, `${formName}_part${fileCounter}.csv`);
  
  //       fileCounter++;
  
  //       // Add a delay (1 second) before downloading the next file
  //       await new Promise((resolve) => setTimeout(resolve, 1000));
  //     }
  //   } catch (error) {
  //     console.error("CSV Export Error:", error);
  //   } finally {
  //     setCols(columns);
  //     setIsDownloadDisabled(false);
  //   }
  // };
  
  // // Helper function to trigger CSV download
  // const downloadCsvFile = async (csvContent, fileName) => {
  //   return new Promise((resolve) => {
  //     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  //     const link = document.createElement("a");
  //     link.href = URL.createObjectURL(blob);
  //     link.download = fileName;
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  
  //     // Wait briefly before resolving (ensures browser processes download)
  //     setTimeout(resolve, 500);
  //   });
  // };
  

  // const downloadCsv = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3000/download-csv", {
  //       method: "GET",
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to download file");
  //     }

  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(blob);
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "dataset.csv");
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();
  //   } catch (error) {
  //     console.error("Error downloading CSV:", error);
  //   }
  // };

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
    
    if (selectedData.length > 10) {
      // Enforce the selection limit of 10
      alert("Maximum 10 records can be selected at one time.");
    }else{
      setSelectedRows(selectedData);
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

  // value update
  const onCellValueChanged = (params) => {
    // get updated data
    const updatedData = params.data;
    console.log(params);
    
    
    
    // get id of the row
    

    axios.put(`${url}/${formName}/update`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      // console.log(res);
      alert("Data updated successfully");
    }).catch((err) => {
      // console.log(err);
      alert("Failed to update data");
    });
    // show success message

  };

  const handleUploadFile = async () => {
  if (!selectedFile) {
    alert("Please select a file first!");
    return;
  }

  // ✅ Validate file type (only CSV allowed)
  const fileType = selectedFile.type;
  const fileName = selectedFile.name.toLowerCase();

  if (!(fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || fileName.endsWith(".xls") || fileName.endsWith(".xlsx"))) {
    alert("Only Excel files are allowed!");
    return;
  }

  // ✅ Prepare form data
  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
    setFileUploadLoading(true);
    // ✅ Call your backend API (replace with your API URL)
    const response = await axios.post(`${url}/${formName}/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      maxBodyLength: Infinity,
      maxContentLength: Infinity
    });


    // console.log(response.status);
    if (response.status === 200) {
      
      const { message, inserted, duplicatesSkipped } = response.data || {};

      // Build the message dynamically
      let alertMessage = message || "✅ File uploaded successfully!";
      // console.log(alertMessage);
      

      // Append inserted / duplicate info only if present
      if (inserted != null || duplicatesSkipped != null) {
        alertMessage += `\n${inserted != null ? `Inserted: ${inserted}` : ""}${
          duplicatesSkipped != null ? `\nDuplicates: ${duplicatesSkipped}` : ""
        }`;
      }

      alert(alertMessage);
      setFileUploadLoading(false);

      handleUploadPopupClose();
      getData(); // Refresh data after successful upload
    } else {
      alert("Failed to upload file.");
      setFileUploadLoading(false);
    }
  } catch (error) {
    console.log(error);
    
    setFileUploadLoading(false);
    alert("Error while uploading file.");
  }
};

  

  if (loading) return <div>Loading...</div>;

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title={title} subtitle={`Managing the ${title}`} />
        <Box>
          {isFinalData && (
            <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              mr: "10px",
              "&:hover": {
                backgroundColor: colors.blueAccent[600],
              },
            }}
            onClick={() => {
              setUploadPopupOpen(true);
            }}
            >
            <UploadFile sx={{ mr: "10px" }} />
            Upload File
          </Button>
          )}
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              mr: "10px",
              "&:hover": {
                backgroundColor: colors.blueAccent[600],
              },
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
              "&:hover": {
                backgroundColor: colors.blueAccent[600],
              },
              disabled: isDownloadDisabled
            }}
            onClick={handleDownloadCSV}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            {isDownloadDisabled ? "Downloading..." : "Download in CSV"}
          </Button>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: colors.blueAccent[600],
              },
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

        {mapData.length > 0 && !isMapBtnDisabled ? (
          <Box>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                mr: "10px",
                "&:hover": {
                  backgroundColor: colors.blueAccent[600],
                },
              }}
              onClick={handleOpenMap}
            >
              View In Map
            </Button>
          </Box>
        ) : (
          ""
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
          // ag-input-field-input
          "& .ag-input-field-input": {
            color: colors.grey[100],
            backgroundColor: colors.primary[400],
          },
        }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rows}
          // columnDefs={cols ?? columns}
          rowSelection={"multiple"}
          onSelectionChanged={onSelectionChanged}
          columnDefs={
            (cols ?? columns)?.map((col, index) =>
              index === 0
                ? {
                    ...col,
                    checkboxSelection: true,         // ✅ checkbox in first column
                    headerCheckboxSelection: true,   // ✅ "select all" in header
                    // pinned: "left",                  // optional: keep it visible while scrolling
                  }
                : col
            )
          }
          defaultColDef={{
            sortable: true,
            filter: true,
            floatingFilter: true,
            editable: true,
          }}
          // singleClickEdit={true}
          // double click to edit
          onCellDoubleClicked={formName == "Live Observation Tool" ? true : false}
          // on cell editing
          onCellValueChanged={onCellValueChanged}
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
              selectedLocation={
                states.find((state) => state.value === selectedState)
                  ?.coordinate
              }
            />
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog open={uploadPopupOpen} maxWidth="xs" fullWidth sx={{ 
        backdropFilter: "blur(5px)", 
        "& .MuiDialog-paper": { 
            backgroundColor: colors.primary[400]
          },
          // paper background color
          
        }}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        File Upload
        <IconButton onClick={() => handleUploadPopupClose()} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <center>
          {/* please follow this format to upload the csv file : <a href={`https://indiaems.paruluniversity.ac.in/src/assets/sample/${formName}.csv`} target="_blank" rel="noopener noreferrer" style={{color:"yellow"}}>Click Here</a> */}
          please follow this format to upload the excel file : 
          <span
            onClick={() => handleSampleDownload(formName)}
            style={{
              color: "yellow",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
             Click Here
          </span>
        </center>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            backgroundColor: colors.blueAccent[700],
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <CloudUploadIcon sx={{ fontSize: 60, color: "primary.main" }} />
          <Typography variant="h6">Select a file to upload</Typography>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <label htmlFor="fileInput">
            <Button variant="outlined" component="span" sx={{ color: colors.grey[100], borderColor: colors.grey[100], backgroundColor: colors.primary[400], "&:hover": { borderColor: colors.primary[500], backgroundColor: colors.primary[700] } }}>
              {selectedFile && (
                <Typography variant="body2" color="textSecondary">
                  {selectedFile.name}
                </Typography>
              ) || "Choose File"}
            </Button>
          </label>
          
        </Paper>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={() => handleUploadPopupClose()} sx={{ color: colors.grey[100], fontWeight: "bold" }}>
          Cancel
        </Button>
        <Button
        sx={{ background: colors.blueAccent[700], color: colors.greenAccent, fontWeight: "bold", "&:hover": { background: colors.blueAccent[900] } }}
          onClick={handleUploadFile}
          variant="contained"
          color="primary"
          disabled={!selectedFile || fileUploadLoading}
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
    </Box>
  );
};

export default ViewData;
