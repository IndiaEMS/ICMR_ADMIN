import express from "express";
import ExcelJS from "exceljs";
import { HFAT1_Mapping } from "../Database/HFAT-1.js";
import { HFAT2_Mapping } from "../Database/HFAT-2.js";
import { HFAT3_Mapping } from "../Database/HFAT-3.js";
import { AMB_Mapping, AMBULANCE } from "../Database/Ambulance.js";
import { CST_Mapping } from "../Database/CST.js";
import { Autopsy_Mapping } from "../Database/Autopsy.js";

const router = express.Router();

// Map of all available mapping models
const mappingModels = {
  "HFAT-1-FINAL": HFAT1_Mapping,
  "HFAT-2-FINAL": HFAT2_Mapping,
  "HFAT-3-FINAL": HFAT3_Mapping,
  "AMBULANCE-FINAL": AMB_Mapping,
  "CST-FINAL": CST_Mapping,
  "AUTOPSY-FINAL": Autopsy_Mapping,
};

// export const SampleCSVFormatDownloadController = async (req, res) => {
//   try {
//     const { formName } = req.params;
//     const Model = mappingModels[formName.toUpperCase()];

//     if (!Model) {
//       return res.status(400).send(`Invalid form name: ${formName}`);
//     }

//     // 1️⃣ Fetch mapping data
//     const mappings = await Model.find({ isHide: false }).sort({ index: 1 }).lean();

//     if (!mappings.length) {
//       return res.status(404).send(`No mappings found for ${formName}`);
//     }

//     // 2️⃣ Extract headers
//     const headers = mappings.map(m => m.headerName.trim());

//     // 3️⃣ Create CSV
//     const csvData = headers.join(",") + "\n";

//     // 4️⃣ Send as file
//     res.setHeader("Content-Disposition", `attachment; filename=${formName}_sample.csv`);
//     res.setHeader("Content-Type", "text/csv");
//     res.send(csvData);

//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error generating sample file");
//   }
// };

export const SampleFormatDownloadController = async (req, res) => {
  try {
    const { formName } = req.params;
    const Model = mappingModels[formName.toUpperCase()];

    if (!Model) {
      return res.status(400).send(`Invalid form name: ${formName}`);
    }

    // 1️⃣ Fetch mapping data
    const mappings = await Model.find({ isHide: false }).sort({ index: 1 }).lean();

    if (!mappings.length) {
      return res.status(404).send(`No mappings found for ${formName}`);
    }

    // 2️⃣ Extract headers
    const headers = mappings.map(m => ((m.mappingHeaderName ?? m.headerName) || "").toString().trim());

    // 3️⃣ Create Excel workbook & sheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sample Format");

    // 4️⃣ Add headers (first row)
    worksheet.addRow(headers);

    // Optional: Make header bold and styled
    headers.forEach((header, i) => {
      const cell = worksheet.getCell(1, i + 1);
      cell.font = { bold: true };
      cell.alignment = { vertical: "middle", horizontal: "center" };
      worksheet.getColumn(i + 1).width = Math.max(20, header.length + 5);
    });

    // 5️⃣ Write Excel to buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // 6️⃣ Send file as response
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${formName}_sample.xlsx`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating sample Excel file");
  }
};


export default router;
