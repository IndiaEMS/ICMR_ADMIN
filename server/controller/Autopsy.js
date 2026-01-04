import { Autopsy, Autopsy_FINAL, Autopsy_Mapping } from "../Database/Autopsy.js";
import { User } from "../Database/user.js";

import xlsx from "xlsx";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { Transform } from "stream";

// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// export const AutopsyController = (req, res) => {
//   const { CompleteForm } = req.body;
//   Autopsy.create(CompleteForm)
//     .then((response) => {
//       res.status(200).json({
//         success: "Data submitted successfully!",
//         response: response,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: "Error occured in saving data.",
//       });
//     });
// };

export const AutopsyController = (req, res) => {
  var { completeform } = req.body;

  completeform = JSON.parse(completeform);

  // Autopsy.create(completeform)
  //   .then((response) => {
  //     res.status(200).json({
  //       success: "Data submitted successfully!",
  //       response: response,
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json({
  //       error: "Error occured in saving data.",
  //     });
  //   });

  Autopsy.countDocuments({ State: completeform?.State }).then((response) => {
    console.log(completeform.State);
    
    const combinedData = {
      ...completeform,
      uniqueCode: `${completeform.State}_${response + 1}`,
    };
    Autopsy.create(combinedData)
      .then((response) => {
        res.status(200).json({
          success: "Data submitted successfully!",
          response: response,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: "Error occured in saving data.",
        });
      });
  });
};


// export const AutopsyGetController = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const state = req.params.state;

//     var AutopsyData;
//     if (id) {
//       AutopsyData = await Autopsy.findById({ _id: id });
//     } else if (state) {
//       AutopsyData = await Autopsy.find();
//     } else {
//       AutopsyData = await Autopsy.find();
//     }

//     if (!AutopsyData) {
//       res.status(404).json({ error: "Data not found" });
//     }

//     res.status(200).json({
//       success: true,
//       data: AutopsyData,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const AutopsyGetController = async (req, res, next) => {
  try {
    const adminId = req.user.id;
    const state = req.user.sitename;
    const role = req.user.role;

    if (!adminId || !state) {
      return next(new ErrorHandler("both id and state are required"));
    }

    const validateUser = await User.findById(adminId);

    if (!validateUser) {
      return next(new ErrorHandler("user is not authenticated"));
    }

    // const stateCode = state.split(",")[1]?.trim();
    const stateCode = state?.trim();

    const states = [
      { value: "", label: "All" },
      { value: "GJBRC", label: "Gujarat" },
      { value: "ORPUR", label: "Odisha" },
      { value: "MPBHS", label: "Bhopal" },
      { value: "PBLDH", label: "Ludhiana" },
      { value: "PYPDY", label: "Pondicherry" },
    ];

    const matchedState = states.find((s) => s.label === stateCode);

    if (!matchedState) {
      return res.status(400).json({
        success: false,
        message: "State code not found",
      });
    }

    const regex = new RegExp(`^${matchedState.value}`);

    const query = role === "superadmin" ? {} : { State: { $regex: regex } };
    
    const AutopsyData = await Autopsy.find(query)

    if (!AutopsyData) {
      return next(new ErrorHandler("data not found"));
    }

    res.status(200).json({
      success: true,
      data: AutopsyData,
    });
  } catch (error) {
    next(error);
  }
};
export const AutopsyFinalGetController = async (req, res, next) => {
  try {
    const adminId = req.user.id;
    const state = req.user.sitename;
    const role = req.user.role;

    if (!adminId || !state) {
      return next(new ErrorHandler("both id and state are required"));
    }

    const validateUser = await User.findById(adminId);

    if (!validateUser) {
      return next(new ErrorHandler("user is not authenticated"));
    }

    // const stateCode = state.split(",")[1]?.trim();
    const stateCode = state?.trim();

    const states = [
      { value: "", label: "All" },
      { value: "GJBRC", label: "Gujarat" },
      { value: "ORPUR", label: "Odisha" },
      { value: "MPBHS", label: "Bhopal" },
      { value: "PBLDH", label: "Ludhiana" },
      { value: "PYPDY", label: "Pondicherry" },
    ];

    const matchedState = states.find((s) => s.label === stateCode);

    if (!matchedState) {
      return res.status(400).json({
        success: false,
        message: "State code not found",
      });
    }

    const regex = new RegExp(`^${matchedState.value}`);

    const query = role === "superadmin" ? {} : { State: { $regex: regex } };
    
    const AutopsyData = await Autopsy_FINAL.find(query)

    if (!AutopsyData) {
      return next(new ErrorHandler("data not found"));
    }

    res.status(200).json({
      success: true,
      data: AutopsyData,
    });
  } catch (error) {
    next(error);
  }
};

export const autopsy_delete = async (req, res) => {
  try {
      const { ids } = req.body;  

      if (!ids || !Array.isArray(ids) || ids.length === 0) {
          return res.status(400).json({
              success: false,
              message: "Ids not found or not provided",
          });
      }

      const deletedItems = await Autopsy_FINAL.deleteMany({
          _id: { $in: ids },  
      });

      if (deletedItems.deletedCount === 0) {
          return res.status(404).json({
              success: false,
              message: "No autopsy records found with the provided ids",
          });
      }

      return res.status(200).json({
          success: true,
          message: `${deletedItems.deletedCount} autopsy records deleted successfully`,
      });
  } catch (error) {
      console.log(error);
      return res.status(500).json({
          success: false,
          message: error.message,
      });
  }
};


export const AutopsyUpdateController = async (req, res) => {
  try {
    // const { id } = req.params;
    const data = req.body;
    const updatedData = await Autopsy.findByIdAndUpdate(data._id, data);
    res.status(200).json({updatedData,succes:true});
  }
  catch (error) {
    console.error(error);
    res.status(500).send("Error updating data");
  }
}

function normalizeHeader(header) {
  if (!header) return "";
  return header
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/[\r\n\t]/g, "");
}

// ✅ Controller
export const AutopsyUploadController = async (req, res) => {
  // const tempFilePath = req.file?.path;
  // if (!tempFilePath) return res.status(400).send("No file uploaded.");
  try {
    // console.log(`State Name: ${req.user.sitename}`);
    // console.log(`File saved at: ${tempFilePath}`);

    console.log(`State Name : ${req.user.sitename}`);
    
        if (!req.file) return res.status(200).send("No file uploaded.");
    
        const file = req.file;
        let uploadDir = path.join(__dirname, "../uploaded final data");
        let tempUploadDir = path.join(__dirname, "../uploaded final data/temp");
    
        if (req.user.role === "admin")
          uploadDir = path.join(uploadDir, req.user.sitename);
    
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
        if (!fs.existsSync(tempUploadDir)) fs.mkdirSync(tempUploadDir, { recursive: true });
    
        const tempFilePath = path.join(tempUploadDir, `${Date.now()}_${file.originalname}`);
        const newFilePath = path.join(uploadDir, `${Date.now()}_${file.originalname}`);
    
        fs.writeFileSync(tempFilePath, file.buffer);
    
        // ✅ Load mapping and normalize header names
        const mappings = await Autopsy_Mapping.find({}).lean();
        const headerMapping = {};
        mappings.forEach((m) => {
          if (m.headerName && m.field)
            headerMapping[normalizeHeader(m.headerName)] = m.field.trim();
        });
    
        if (!headerMapping || Object.keys(headerMapping).length === 0)
          return res.status(200).send("Header mappings not found.");
    
        // // ✅ Read Excel file
        // const workbook = xlsx.readFile(tempFilePath);
        // const sheetName = workbook.SheetNames[0];
        // const worksheet = workbook.Sheets[sheetName];
        // const jsonData = xlsx.utils.sheet_to_json(worksheet, { defval: "" }); // defval="" prevents undefined
    
        // ✅ Read Excel file
        const workbook = xlsx.readFile(tempFilePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
    
        // 🩵 FIX: Trim unused/hidden columns and detect true headers
        const range = xlsx.utils.decode_range(worksheet["!ref"]);
        const firstRow = [];
        for (let c = range.s.c; c <= range.e.c; c++) {
          const cell = worksheet[xlsx.utils.encode_cell({ r: range.s.r, c })];
          const value = cell ? String(cell.v).trim() : "";
          if (value) firstRow.push(value); // only count non-empty headers
        }
    
        // 🩵 FIX: Restrict Excel range to actual header columns
        if (firstRow.length > 0) {
          range.e.c = range.s.c + firstRow.length - 1;
          worksheet["!ref"] = xlsx.utils.encode_range(range);
        }
    
        // 🩵 FIX: Now convert to JSON safely
        const jsonData = xlsx.utils.sheet_to_json(worksheet, { defval: "" }); // defval="" prevents undefined
        
    
        if (!jsonData || jsonData.length === 0)
          return res.status(200).send("Empty Excel file.");
    
        // ✅ Extract and normalize headers
        const excelHeaders = Object.keys(jsonData[0]);
        const dbHeadersTrimmed = Object.keys(headerMapping).map(h => normalizeHeader(h));
        const excelHeadersTrimmed = excelHeaders.map(h => normalizeHeader(h));
    
        // ✅ Compare DB mapping count and Excel header count
        const dbHeaderCount = dbHeadersTrimmed.length;
        const excelHeaderCount = excelHeadersTrimmed.length;
    
        const missingHeaders = dbHeadersTrimmed.filter(h => !excelHeadersTrimmed.includes(h));
        const extraHeaders = excelHeadersTrimmed.filter(h => !dbHeadersTrimmed.includes(h));
    
        if (excelHeaderCount !== dbHeaderCount || missingHeaders.length > 0 || extraHeaders.length > 0) {
          console.error(`❌ Header mismatch detected. DB Count: ${dbHeaderCount}, Excel Count: ${excelHeaderCount}`);
    
          if (missingHeaders.length > 0)
            console.error(`❌ Missing Excel headers (in DB but not Excel): \n${missingHeaders.join(",\n")}`);
          if (extraHeaders.length > 0)
            console.error(`❌ Extra Excel headers (in Excel but not DB): \n${extraHeaders.join(",\n")}`);
    
          return res.status(200).json({
            message: "Invalid file format. Please check the uploaded file headers.",
            missingHeaders,
            extraHeaders,
          });
        }

    // ✅ Process and insert in batches
    const batchSize = 500;
    let batch = [];
    let inserted = 0;
    let duplicates = 0;

    for (const row of jsonData) {
      const allEmpty = Object.values(row).every(v => !v || v.toString().trim() === "");
      if (allEmpty) continue;

      const transformed = transformRow(row, headerMapping);
      batch.push(transformed);

      if (batch.length >= batchSize) {
        const { inserted: ins, duplicates: dup } = await insertBatchWithSkip(batch);
        inserted += ins;
        duplicates += dup;
        batch = [];
      }
    }

    if (batch.length > 0) {
      const { inserted: ins, duplicates: dup } = await insertBatchWithSkip(batch);
      inserted += ins;
      duplicates += dup;
    }
    
    console.log(`Upload complete. Inserted: ${inserted}, Duplicates: ${duplicates}`);
    if (tempFilePath) {
      fs.unlink(tempFilePath, (err) => {
        if (err) console.error("Error deleting temp file:", err);
      });
    }

    res.status(200).json({
      message: "✅ File uploaded successfully.",
      inserted,
      duplicatesSkipped: duplicates,
    });
  } catch (err) {
    console.error("Error in AutopsyUploadController:", err);
    res.status(500).send("Internal Server Error");
  } finally {
    // 🧹 Always delete file after processing
    // if (tempFilePath) {
    //   fs.unlink(tempFilePath, (err) => {
    //     if (err) console.error("Error deleting temp file:", err);
    //   });
    // }
  }
};

// ✅ Transform row using DB header mapping
function transformRow(row, headerMapping) {
  const newRow = {};
  let index = 0;
  for (const header in row) {
    const normalized = normalizeHeader(header);
    const mapped = headerMapping[normalized];
    const key = mapped || `Unmapped_${index++}`;
    const value = row[header] !== undefined ? String(row[header]).trim() : null;
    setNestedValue(newRow, key, value);
  }
  return newRow;
}

// ✅ Helper to set nested object keys (e.g., a.b.c)
function setNestedValue(obj, path, value) {
  const keys = path.split(".");
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current)) current[key] = {};
    current = current[key];
  }
  current[keys[keys.length - 1]] = value;
}

// ✅ Bulk insert with skip duplicates
async function insertBatchWithSkip(batch) {
  try {
    const result = await Autopsy_FINAL.insertMany(batch, {
      ordered: false,
      rawResult: true,
      validateBeforeSave: false,
    });
    return { inserted: result.insertedCount || 0, duplicates: 0 };
  } catch (err) {
    if (err.code === 11000) {
      const inserted = err.result?.result?.nInserted || 0;
      const duplicates = batch.length - inserted;
      console.warn(`⚠️ ${duplicates} duplicate record(s) skipped.`);
      return { inserted, duplicates };
    }
    throw err;
  }
}

export const AutopsyGetFinalRows = async (req, res) => {
  try {
    const data = await Autopsy_Mapping.find({})
  .sort({ index: 1 }) // ascending order by "index" field
  .lean();
    res.json({ success: true, rows: data });
  } catch (err) {
    console.error("Error in getRows:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};