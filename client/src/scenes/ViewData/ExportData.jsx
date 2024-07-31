import React, { useState } from "react";
import axios from "axios";
const URL = import.meta.env.VITE_SERVER;
const ExportData = () => {
  const [formName, setFormName] = useState("");

  const handleSelectChange = (event) => {
    setFormName(event.target.value);
  };

  const downloadCsv = async () => {
    console.log("Comming");
    await fetch(`${URL}/${formName}/Download`)
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
      const response = await axios.get(`${URL}/${formName}/Excel`, {
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

  return (
    <div>
      <h1>Export Data</h1>
      {/* create dropdown options is HFAT-1,HFA-2,HFAt-3 */}

      <select defaultValue="" onChange={handleSelectChange}>
        <option value="" disabled>
          Select an option
        </option>
        <option value="HFAT-1">HFAT-1</option>
        <option value="HFAT-2">HFAT-2</option>
        {/* <option value="HFAt-3">HFAt-3</option> */}
      </select>

      {/* create button to export data */}
      <button onClick={downloadCsv}>Export In CSV</button>
      <button onClick={downloadExcel}>Export In Excel</button>
    </div>
  );
};

export default ExportData;
