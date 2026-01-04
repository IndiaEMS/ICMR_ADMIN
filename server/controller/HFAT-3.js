import express from "express";
import { HFAT3, HFAT3_FINAL, HFAT3_Mapping } from "../Database/HFAT-3.js";
const app = express();
import { User } from "../Database/user.js";
import fs from 'fs';             // for existsSync, createReadStream, etc.
import fsp from 'fs/promises';   // for readFile, writeFile, unlink, etc.
import path from "path";

import { fileURLToPath } from 'url';
import csv from 'csv-parser';
import xlsx from "xlsx";

// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const HFAT3Controller = async (req, res) => {
  var { completeform, table1, table2, table3, table4 } = req.body;
  completeform = JSON.parse(completeform);
  table1 = JSON.parse(table1);
  table2 = JSON.parse(table2);
  table3 = JSON.parse(table3);
  table4 = JSON.parse(table4);

  HFAT3.countDocuments({ H3A2: completeform?.H3A2 }).then((response) => {
    const combinedData = {
      ...completeform,
      table1,
      table2,
      table3,
      table4,
      uniqueCode: `${completeform.H3A2}_${response + 1}`,
    };
    HFAT3.create(combinedData)
      .then((result) => {
        res.status(200).json({ success: "data saved", result });
      })
      .catch((err) => {
        res.status(400).json({ error: "error for data save" });
      });
  });

  // const hfat3 = req.body;
  // hfat3 = JSON.parse(hfat3);
  // try {
  //   HFAT3.find({ H3A2: hfat3?.H3A2 }).then((response) => {
  //     const newHFAT3 = new HFAT3({
  //       uniqueCode: `${hfat3.H3A2}_${response.length + 1}`,
  //       ...hfat3,
  //     });
  //     // const newHFAT3 = new HFAT3(hfat);
  //     newHFAT3.save();
  //     res.status(201).json(newHFAT3);
  //   });
  // } catch (error) {
  //   res.status(409).json({ message: error.message });
  // }
};

// export const HFAT3Get = async (req, res, next) => {
//   try {
//     const HEAT3Data = await HFAT3.find();
//     if (!HEAT3Data) {
//       res.status(404).json({ error: "Data not found" });
//     }

//     res.status(200).json({
//       success: true,
//       data: HEAT3Data,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const HFAT3Get = async (req, res, next) => {
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

    var HFAT3Data;
    if (role === "superadmin") {
      HFAT3Data = await HFAT3.find();
    } else {
      HFAT3Data = await HFAT3.find({ uniqueCode: { $regex: regex } });
    }

    if (!HFAT3Data) {
      return next(new ErrorHandler("data not found"));
    }

    res.status(200).json({
      success: true,
      data: HFAT3Data,
    });
  } catch (error) {
    next(error);
  }
};


export const HFAT3FINALGet = async (req, res, next) => {
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

    var HFAT3Data;
    if (role === "superadmin") {
      HFAT3Data = await HFAT3_FINAL.find();
    } else {
      HFAT3Data = await HFAT3_FINAL.find({ uniqueCode: { $regex: regex } });
    }

    if (!HFAT3Data) {
      return next(new ErrorHandler("data not found"));
    }

    res.status(200).json({
      success: true,
      data: HFAT3Data,
    });
  } catch (error) {
    next(error);
  }
};

// export const HFAT3AndAMBULANCEGet = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     let HEAT3Data;

//     if (id) {
//       HEAT3Data = await HFAT3.aggregate([
//         { $match: { _id: mongoose.Types.ObjectId(id) } },
//         {
//           $lookup: {
//             from: "ambulances", // The collection name in MongoDB for Ambulance
//             pipeline: [
//               {
//                 $addFields: {
//                   formUniqueCode: {
//                     $arrayElemAt: [{ $split: ["$formUniqueCode", " : "] }, 1],
//                   },
//                 },
//               },
//               {
//                 $match: {
//                   $expr: { $eq: ["$formUniqueCode", "$$uniqueCode"] },
//                 },
//               },
//             ],
//             as: "ambulanceDetails",
//           },
//         },
//         {
//           $unwind: {
//             path: "$ambulanceDetails",
//             preserveNullAndEmptyArrays: true,
//           },
//         }, // Unwind the array to get a direct object
//       ]);
//     } else {
//       HEAT3Data = await HFAT3.aggregate([
//         {
//           $lookup: {
//             from: "ambulances", // The collection name in MongoDB for Ambulance
//             let: { uniqueCode: "$uniqueCode" }, // Define the variables to use in the pipeline
//             pipeline: [
//               {
//                 $addFields: {
//                   formUniqueCode: {
//                     $arrayElemAt: [{ $split: ["$formUniqueCode", " : "] }, 1],
//                   },
//                 },
//               },
//               {
//                 $match: {
//                   $expr: { $eq: ["$formUniqueCode", "$$uniqueCode"] },
//                 },
//               },
//             ],
//             as: "ambulanceDetails",
//           },
//         },
//         {
//           $unwind: {
//             path: "$ambulanceDetails", // Unwind the array
//             preserveNullAndEmptyArrays: true, // Keep documents even if the array is empty
//           },
//         },
//       ]);
//     }

//     if (!HEAT3Data || HEAT3Data.length === 0) {
//       return res.status(404).json({ error: "Data not found" });
//     }

//     res.status(200).json({
//       success: true,
//       data: HEAT3Data,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const HFAT3AndAMBULANCEGet = async (req, res, next) => {
//   try {
//     const adminId = req.user.id;
//     const state = req.user.sitename;
//     const role = req.user.role;

//     if (!adminId || !state) {
//       return next(new ErrorHandler("both id and state are required"));
//     }

//     const validateUser = await User.findById(adminId);

//     if (!validateUser) {
//       return next(new ErrorHandler("user is not authenticated"));
//     }

//     const stateCode = state?.trim();

//     const states = [
//       { value: "", label: "All" },
//       { value: "GJBRC", label: "Gujarat" },
//       { value: "ORPUR", label: "Odisha" },
//       { value: "MPBHS", label: "Bhopal" },
//       { value: "PBLDH", label: "Ludhiana" },
//       { value: "PYPDY", label: "Pondicherry" },
//     ];

//     const matchedState = states.find((s) => s.label === stateCode);

//     if (!matchedState) {
//       return res.status(400).json({
//         success: false,
//         message: "State code not found",
//       });
//     }

//     const regex = new RegExp(`^${matchedState.value}`);

//     let HEAT3Data;
//     if (role === "superadmin") {
//       HEAT3Data = await HFAT3.find();
//     } else {
//       HEAT3Data = await HFAT3.find({ uniqueCode: { $regex: regex } });
//     }

//     if (!HEAT3Data || HEAT3Data.length === 0) {
//       return res.status(404).json({ error: "Data not found" });
//     }

//     res.status(200).json({
//       success: true,
//       data: HEAT3Data,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const HFAT3AndAMBULANCEGet = async (req, res, next) => {
  try {
    const id = req.user.id;
    const state = req.user.sitename;
    const role = req.user.role;
    let HEAT3Data;

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

    const lookupAmbulanceDetails = [
      {
        $lookup: {
          from: "ambulances", // The collection name in MongoDB for Ambulance
          let: { uniqueCode: "$uniqueCode" }, // Define the variables to use in the pipeline
          pipeline: [
            {
              $addFields: {
                splitFormUniqueCode: {
                  $arrayElemAt: [{ $split: ["$formUniqueCode", " : "] }, 1],
                },
              },
            },
            {
              $match: {
                $expr: { $eq: ["$splitFormUniqueCode", "$$uniqueCode"] }, // Match the split formUniqueCode with uniqueCode
              },
            },
          ],
          as: "ambulanceDetails",
        },
      },
      {
        $unwind: {
          path: "$ambulanceDetails", // Unwind to convert array elements into individual documents
          preserveNullAndEmptyArrays: true, // Keep documents without matching array elements
        },
      },
      {
        $addFields: {
          "ambulanceDetails.originalFormUniqueCode":
            "$ambulanceDetails.formUniqueCode", // Keep the original formUniqueCode intact
        },
      },
    ];

    // Apply conditional logic based on the role
    if (role === "superadmin") {
      HEAT3Data = await HFAT3.aggregate([
        ...lookupAmbulanceDetails, // Reuse lookup logic for superadmin
      ]);
    } else {
      HEAT3Data = await HFAT3.aggregate([
        { $match: { uniqueCode: { $regex: regex } } }, // Apply the regex filter for non-superadmin users
        ...lookupAmbulanceDetails, // Reuse lookup logic for other roles
      ]);
    }

    if (!HEAT3Data || HEAT3Data.length === 0) {
      return res.status(404).json({ error: "Data not found" });
    }

    res.status(200).json({
      success: true,
      data: HEAT3Data,
    });
  } catch (error) {
    next(error);
  }
};


export const HFAT3AndAMBULANCEFINALGet = async (req, res, next) => {
  try {
    const id = req.user.id;
    const state = req.user.sitename;
    const role = req.user.role;
    let HEAT3Data;

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

    const lookupAmbulanceDetails = [
      {
        $lookup: {
          from: "ambulance_finals", // The collection name in MongoDB for Ambulance
          let: { uniqueCode: "$uniqueCode" }, // Define the variables to use in the pipeline
          pipeline: [
            {
              $addFields: {
                splitFormUniqueCode: {
                  $arrayElemAt: [{ $split: ["$formUniqueCode", " : "] }, 1],
                },
              },
            },
            {
              $match: {
                $expr: { $eq: ["$splitFormUniqueCode", "$$uniqueCode"] }, // Match the split formUniqueCode with uniqueCode
              },
            },
          ],
          as: "ambulanceDetails",
        },
      },
      {
        $unwind: {
          path: "$ambulanceDetails", // Unwind to convert array elements into individual documents
          preserveNullAndEmptyArrays: true, // Keep documents without matching array elements
        },
      },
      {
        $addFields: {
          "ambulanceDetails.originalFormUniqueCode":
            "$ambulanceDetails.formUniqueCode", // Keep the original formUniqueCode intact
        },
      },
    ];

    // Apply conditional logic based on the role
    if (role === "superadmin") {
      HEAT3Data = await HFAT3_FINAL.aggregate([
        ...lookupAmbulanceDetails, // Reuse lookup logic for superadmin
      ]);
    } else {
      HEAT3Data = await HFAT3_FINAL.aggregate([
        { $match: { uniqueCode: { $regex: regex } } }, // Apply the regex filter for non-superadmin users
        ...lookupAmbulanceDetails, // Reuse lookup logic for other roles
      ]);
    }

    if (!HEAT3Data || HEAT3Data.length === 0) {
      return res.status(404).json({ error: "Data not found" });
    }

    res.status(200).json({
      success: true,
      data: HEAT3Data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteHfat3 = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Ids not found or not provided",
      });
    }

    const deletedItems = await HFAT3.deleteMany({
      _id: { $in: ids },
    });

    if (deletedItems.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No HFAT3 records found with the provided ids",
      });
    }

    return res.status(200).json({
      success: true,
      message: `${deletedItems.deletedCount} HFAT3 records deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const HFAT3Delete = async (req, res, next) => {
  try {
    const { id } = req.body;

    const HEAT3Data = await HFAT3.deleteMany({ _id: { $in: id } });

    if (!HEAT3Data) {
      res.status(404).json({ error: "Data not found" });
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};


export const HFAT3UpdateController = async (req, res) => {
  try {
    // const { id } = req.params;
    const data = req.body;
    const updatedData = await HFAT3.findByIdAndUpdate(data._id, data);
    res.status(200).json({updatedData,succes:true});
  }
  catch (error) {
    console.error(error);
    res.status(500).send("Error updating data");
  }
}
export const HFAT3FinalUpdateController = async (req, res) => {
  try {
    // const { id } = req.params;
    const data = req.body;
    const updatedData = await HFAT3_FINAL.findByIdAndUpdate(data._id, data);
    res.status(200).json({updatedData,succes:true});
  }
  catch (error) {
    console.error(error);
    res.status(500).send("Error updating data");
  }
}

export const HAFT3UploadControllerOLD = async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("No file uploaded.");

    const file = req.file;
    let uploadDir = path.join(__dirname, "../uploaded final data");
    let tempUploadDir = path.join(__dirname, "../uploaded final data/temp");

    if (req.user.role === "admin") uploadDir = path.join(uploadDir, req.user.sitename);

    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    if (!fs.existsSync(tempUploadDir)) fs.mkdirSync(tempUploadDir, { recursive: true });

    const tempFilePath = path.join(tempUploadDir, `${Date.now()}_${file.originalname}`);
    const newFilePath = path.join(uploadDir, `${Date.now()}_${file.originalname}`);

    fs.writeFileSync(tempFilePath, file.buffer);
    fs.writeFileSync(newFilePath, file.buffer);

    // Load mapping: CSV full header -> short key
    const mappings = await HFAT3_Mapping.find({}).lean();
    const headerMapping = {};
    mappings.forEach((m) => {
      if (m.headerName && m.field) headerMapping[m.headerName.trim()] = m.field.trim();
    });
    console.log("HFAT-3 Header Mapping Loaded:", headerMapping.length);

    const batchSize = 500;
    let batch = [];

    const stream = fs.createReadStream(newFilePath).pipe(csv());

    for await (const row of stream) {
      const transformed = transformRow(row, headerMapping);
      batch.push(transformed);

      if (batch.length >= batchSize) {
        await HFAT3_FINAL.insertMany(batch);
        batch = [];
      }
    }

    // Insert remaining rows
    if (batch.length > 0) await HFAT3_FINAL.insertMany(batch);

    // Remove temp file
    fs.unlink(tempFilePath, (err) => {
      if (err) console.error("Error deleting temp file:", err);
    });

    res.status(200).send(`File uploaded and imported successfully: ${newFilePath}`);
  } catch (error) {
    console.error("Error in HAFT3UploadController:", error);
    res.status(500).send("Internal server error");
  }
}

export const HFAT3GetFinalRows = async (req, res) => {
  try {
    const data = await HFAT3_Mapping.find({}).sort({ index: 1 }).lean();
    res.json({ success: true, rows: data });
  } catch (err) {
    console.error("Error in getRows:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// // ✅ Helper: Normalize header names safely
// function normalizeHeader(header) {
//   if (!header) return "";
//   return header
//     .toString()
//     .trim()
//     .toLowerCase()
//     .replace(/\s+/g, "")              // remove all spaces
//     .replace(/[\u200B-\u200D\uFEFF]/g, "") // remove zero-width
//     .replace(/[\r\n\t]/g, "");        // remove line breaks, tabs
// }
// export const HFAT3UploadController = async (req, res) => {
//   try {
//     console.log(`State Name : ${req.user.sitename}`);

//     if (!req.file) return res.status(200).send("No file uploaded.");

//     const file = req.file;
//     let uploadDir = path.join(__dirname, "../uploaded final data");
//     let tempUploadDir = path.join(__dirname, "../uploaded final data/temp");

//     if (req.user.role === "admin")
//       uploadDir = path.join(uploadDir, req.user.sitename);

//     if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
//     if (!fs.existsSync(tempUploadDir)) fs.mkdirSync(tempUploadDir, { recursive: true });

//     const tempFilePath = path.join(tempUploadDir, `${Date.now()}_${file.originalname}`);
//     const newFilePath = path.join(uploadDir, `${Date.now()}_${file.originalname}`);

//     fs.writeFileSync(tempFilePath, file.buffer);

//     // ✅ Load mapping and normalize header names
//     const mappings = await HFAT3_Mapping.find({}).lean();
//     const headerMapping = {};
//     mappings.forEach((m) => {
//       if (m.headerName && m.field)
//         headerMapping[normalizeHeader(m.headerName)] = m.field.trim();
//     });

//     // ✅ Check if header mappings exist
//     if (!headerMapping || Object.keys(headerMapping).length === 0) {
//       return res.status(200).send("Header mappings not found.");
//     }

//     // ✅ Read CSV headers only (before reading rows)
//     const csvHeaders = await new Promise((resolve, reject) => {
//       const stream = fs
//         .createReadStream(tempFilePath)
//         .pipe(csv())
//         .on("headers", (headers) => {
//           stream.destroy(); // stop reading after headers
//           resolve(headers);
//         })
//         .on("error", reject);
//     });

//     // Normalize all headers before comparison
//     const dbHeadersTrimmed = Object.keys(headerMapping).map(h => normalizeHeader(h));
//     const csvHeadersTrimmed = csvHeaders.map(h => normalizeHeader(h));

//     // Compare DB mapping count and CSV header count
//     const dbHeaderCount = dbHeadersTrimmed.length;
//     const csvHeaderCount = csvHeadersTrimmed.length;

//     // Find missing and extra headers
//     const missingHeaders = dbHeadersTrimmed.filter(h => !csvHeadersTrimmed.includes(h));
//     const extraHeaders = csvHeadersTrimmed.filter(h => !dbHeadersTrimmed.includes(h));

//     if (csvHeaderCount !== dbHeaderCount || missingHeaders.length > 0 || extraHeaders.length > 0) {
//       console.error(`❌ Header mismatch detected. DB Count: ${dbHeaderCount}, CSV Count: ${csvHeaderCount}`);

//       if (missingHeaders.length > 0) {
//         console.error(`❌ Missing CSV headers (present in DB but not CSV): \n${missingHeaders.join(",\n")}`);
//       }
//       if (extraHeaders.length > 0) {
//         console.error(`❌ Extra CSV headers (present in CSV but not DB): \n${extraHeaders.join(",\n")}`);
//       }

//       return res.status(200).json({
//         message: "Invalid file format. Please check the uploaded file headers.",
//         missingHeaders,
//         extraHeaders,
//       });
//     }

//     // Optional: check for unmapped headers in CSV that exist in DB mapping
//     const unmappedHeaders = csvHeadersTrimmed.filter(h => !headerMapping[h]);
//     if (unmappedHeaders.length > 0) {
//       console.error(`❌ Unmapped CSV headers: ${unmappedHeaders.join(", ")}`);
//       return res.status(200).json({
//         message: "Invalid file format. Please check the uploaded file headers.",
//         unmappedHeaders,
//       });
//     }

//     console.log("HFAT-3 Header Mapping Loaded:", dbHeaderCount);

//     const batchSize = 500;
//     let batch = [];
//     let insertedCount = 0;
//     let duplicateCount = 0;

//     const stream = fs.createReadStream(tempFilePath).pipe(csv());

//     console.log("Starting to process CSV rows...");

//     for await (const row of stream) {
//       // ✅ Skip completely empty rows
//       const allEmpty = Object.values(row).every(v => !v || v.toString().trim() === "");
//       if (allEmpty) continue; // <-- This line prevents empty record import

//       const transformed = transformRow(row, headerMapping);
//       batch.push(transformed);

//       if (batch.length >= batchSize) {
//         const { inserted, duplicates } = await insertBatchWithSkip(batch);
//         insertedCount += inserted;
//         duplicateCount += duplicates;
//         batch = [];
//       }
//     }

//     console.log("Finished reading CSV file.");

//     // Insert remaining rows
//     if (batch.length > 0) {
//       const { inserted, duplicates } = await insertBatchWithSkip(batch);
//       insertedCount += inserted;
//       duplicateCount += duplicates;
//     }

//     console.log("All rows processed.");

//     // Remove temp file
//     fs.unlink(tempFilePath, (err) => {
//       if (err) console.error("Error deleting temp file:", err);
//     });

//     fs.writeFileSync(newFilePath, file.buffer);

//     console.log(`Upload complete. Inserted: ${insertedCount}, Duplicates skipped: ${duplicateCount}`);

//     res.status(200).json({
//       message: `✅ File uploaded successfully.`,
//       inserted: insertedCount,
//       duplicatesSkipped: duplicateCount,
//     });
//   } catch (error) {
//     console.error("Error in HFAT3UploadController:", error);
//     res.status(500).send("Internal server error");
//   }
// };

// const transformRow = (row, headerMapping) => {
//   const newRow = {};
//   let index = 0;

//   for (const csvHeader in row) {
//     const normalizedHeader = normalizeHeader(csvHeader);
//     const mappedKey = headerMapping[normalizedHeader];
//     const key = mappedKey || `Unmapped_${index++}`;
//     const value = row[csvHeader] !== undefined ? String(row[csvHeader]).trim() : null;
//     setNestedValue(newRow, key, value);
//   }

//   return newRow;
// };

// const setNestedValue = (obj, path, value) => {
//   const keys = path.split(".");
//   let current = obj;

//   for (let i = 0; i < keys.length - 1; i++) {
//     const key = keys[i];
//     // If next key looks like an array index, convert to number
//     const nextKey = keys[i + 1];
//     const isNextArrayIndex = /^\d+$/.test(nextKey);

//     if (!(key in current)) {
//       current[key] = isNextArrayIndex ? [] : {};
//     }
//     current = current[key];
//   }
//   current[keys[keys.length - 1]] = value;
// };

// async function insertBatchWithSkip(batch) {
//   try {
//     console.log(batch.length);

//     const result = await HFAT3_FINAL.insertMany(batch, {
//       ordered: false,
//       rawResult: true,
//       validateBeforeSave: false,
//     });

//     if (result.mongoose?.validationErrors?.length) {
//       console.log("⚠️ Validation failed for these documents:");
//       for (const err of result.mongoose.validationErrors) {
//         console.log("-", err.message);
//       }
//     } else {
//       console.log(`✅ Inserted ${result.insertedCount} documents`);
//     }

//     return { inserted: result.insertedCount, duplicates: 0 };
//   } catch (err) {
//     // ✅ Handle duplicate errors
//     if (err.code === 11000) {
//       const inserted =
//         err.result?.result?.nInserted ||
//         (err.writeErrors ? err.insertedDocs?.length || 0 : 0);
//       const duplicates = batch.length - inserted;
//       console.warn(`⚠️ ${duplicates} duplicate record(s) skipped.`);
//       return { inserted, duplicates };
//     }
//     throw err;
//   }
// }


// ✅ Helper: Normalize header names safely
function normalizeHeader(header) {
  if (!header) return "";
  return header
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")               // remove all spaces
    .replace(/[\u200B-\u200D\uFEFF]/g, "") // remove zero-width chars
    .replace(/[\r\n\t]/g, "");         // remove line breaks/tabs
}

export const HFAT3UploadController = async (req, res) => {
  try {
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
    const mappings = await HFAT3_Mapping.find({}).lean();
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

    console.log("HFAT-3 Header Mapping Loaded:", dbHeaderCount);

    // ✅ Process rows
    const batchSize = 500;
    let batch = [];
    let insertedCount = 0;
    let duplicateCount = 0;

    console.log(`Starting to process ${jsonData.length} Excel rows...`);

    for (const row of jsonData) {
      const allEmpty = Object.values(row).every(v => !v || v.toString().trim() === "");
      if (allEmpty) continue;

      const transformed = transformRow(row, headerMapping);
      batch.push(transformed);

      if (batch.length >= batchSize) {
        const { inserted, duplicates } = await insertBatchWithSkip(batch);
        insertedCount += inserted;
        duplicateCount += duplicates;
        batch = [];
      }
    }

    // ✅ Insert remaining
    if (batch.length > 0) {
      const { inserted, duplicates } = await insertBatchWithSkip(batch);
      insertedCount += inserted;
      duplicateCount += duplicates;
    }

    // ✅ Clean up files
    fs.unlink(tempFilePath, (err) => {
      if (err) console.error("Error deleting temp file:", err);
    });
    fs.writeFileSync(newFilePath, file.buffer);

    console.log(`Upload complete. Inserted: ${insertedCount}, Duplicates skipped: ${duplicateCount}`);

    res.status(200).json({
      message: "✅ File uploaded successfully.",
      inserted: insertedCount,
      duplicatesSkipped: duplicateCount,
    });

  } catch (error) {
    console.error("Error in HFAT3UploadController:", error);
    res.status(500).send("Internal server error");
  }
};

// ✅ Reuse helper functions
const transformRow = (row, headerMapping) => {
  const newRow = {};
  let index = 0;
  for (const excelHeader in row) {
    const normalizedHeader = normalizeHeader(excelHeader);
    const mappedKey = headerMapping[normalizedHeader];
    const key = mappedKey || `Unmapped_${index++}`;
    const value = row[excelHeader] !== undefined ? String(row[excelHeader]).trim() : null;
    setNestedValue(newRow, key, value);
  }
  return newRow;
};

const setNestedValue = (obj, path, value) => {
  const keys = path.split(".");
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    const nextKey = keys[i + 1];
    const isNextArrayIndex = /^\d+$/.test(nextKey);
    if (!(key in current)) {
      current[key] = isNextArrayIndex ? [] : {};
    }
    current = current[key];
  }
  current[keys[keys.length - 1]] = value;
};

async function insertBatchWithSkip(batch) {
  try {
    console.log(batch.length);
    const result = await HFAT3_FINAL.insertMany(batch, {
      ordered: false,
      rawResult: true,
      validateBeforeSave: false,
    });

    if (result.insertedCount)
      console.log(`✅ Inserted ${result.insertedCount} documents`);

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
