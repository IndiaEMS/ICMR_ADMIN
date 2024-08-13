import React, { useRef, useCallback, useState } from "react";
import axios from "axios";

import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

const url = import.meta.env.VITE_SERVER;

const DataGridComponent = ({
  rows,
  columns,
  exportColumns,
  formName,
  getData,
}) => {
  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState(columns);

  const handleDownloadCSV = async () => {
    try {
      setColumnDefs(exportColumns);
      // refresh header
      await gridRef.current.api.refreshClientSideRowModel();
      // export to csv
      gridRef.current.api.exportDataAsCsv({ fileName: `${formName}.csv` });
    } catch (error) {
      console.log(error);
    } finally {
      setColumnDefs(columns);
    }
  };

  const handleDownload = async () => {
    await fetch(`${url}/${formName}/Download`)
      // .get(`${url}/HFAT-1/Download-csv`)
      .then((response) => {
        if (!response) {
          throw new Error("Network response was not ok.");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "HFAT-1.csv");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => console.error("Error:", error));
  };

  const downloadExcel = async () => {
    try {
      const response = await axios.get(`${url}/${formName}/Excel`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "hfat-1.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      // saveAs(blob, "hfat-1.xlsx");
    } catch (error) {
      console.error("Error downloading the file", error);
    }
  };

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setGridOption(
      "quickFilterText",
      document.getElementById("filter-text-box").value
    );
  }, []);

  const deleteData = async (id) => {
    // i want to get selected rows id only
    id = gridRef.current.api.getSelectedRows().map((row) => row.id);
    // console.log(id);
    try {
      const { data } = await axios.delete(`${url}/${formName}`, {
        data: { id },
      });
      console.log(data);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: 600 }} // the grid will fill the size of the parent container
      >
        <h2>Total Record Found : {rows.length}</h2>
        <button onClick={handleDownloadCSV}>Export CSV</button>
        {/* <button onClick={handleDownload}>Export All CSV</button>
        <button onClick={downloadExcel}>Export All Excel</button> */}
        <button onClick={deleteData}>Delete</button>
        <button onClick={getData}>Refresh</button>

        <input
          type="text"
          id="filter-text-box"
          placeholder="Search..."
          onInput={onFilterTextBoxChanged}
        />
        <AgGridReact
          ref={gridRef}
          rowData={rows}
          columnDefs={columnDefs}
          rowSelection={"multiple"}
          defaultColDef={{
            sortable: true,
            filter: true,
            floatingFilter: true,
          }}
          pagination={true}
          paginationPageSize={20}
        />
      </div>
    </div>
  );
};

export default DataGridComponent;
