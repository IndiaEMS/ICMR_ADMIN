import { CSTFORM } from "../Database/CST.js";
import { User } from "../Database/user.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { Worker } from "worker_threads";
import fastCsv from "fast-csv";

import { createObjectCsvWriter, createObjectCsvStringifier } from "csv-writer";
// import {dirname} from "path";
// __dirname = dirname;
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { Transform } from "stream";

export const CSTConroller = (req, res) => {
  const { CompleteForm } = req.body;
  CSTFORM.create(CompleteForm)
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
};

// export const CSTGetController = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const state = req.params.state;

//     var CSTData;
//     if (id) {
//       CSTData = await CSTFORM.findById({ _id: id });
//     } else if (state) {
//       CSTData = await CSTFORM.find();
//     } else {
//       CSTData = await CSTFORM.find();
//     }

//     if (!CSTData) {
//       res.status(404).json({ error: "Data not found" });
//     }

//     res.status(200).json({
//       success: true,
//       data: CSTData,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const states = [
  { value: "", label: "All" },
  { value: "GJBRC", label: "Gujarat" },
  { value: "ORPUR", label: "Odisha" },
  { value: "MPBHS", label: "Bhopal" },
  { value: "PBLDH", label: "Ludhiana" },
  { value: "PYPDY", label: "Pondicherry" },
];

export const CSTGetController = async (req, res, next) => {
  try {
    const adminId = req.user._id;
    const state = req.user.sitename;
    const role = req.user.role;

    if (!adminId || !state) {
      return next(new ErrorHandler("Both ID and state are required"));
    }

    const validateUser = await User.findById(adminId);
    if (!validateUser) {
      return next(new ErrorHandler("User is not authenticated"));
    }

    const stateCode = state?.trim();

    const matchedState = states.find((s) => s.label === stateCode);

    if (!matchedState) {
      return res.status(400).json({
        success: false,
        message: "State code not found",
      });
    }

    const regex = new RegExp(`^${matchedState.value}`);

    // Pagination
    let { page = 1, limit = 2000 } = req.query; // Default values
    const skip = (page - 1) * limit; // Correct skip calculation

    // Query based on role
    const query = role === "superadmin" ? {} : { AA2: { $regex: regex } };

    const CSTData = await CSTFORM.find(query).skip(skip).limit(limit);
    const totalRecords = await CSTFORM.countDocuments(query);
    const totalPages = Math.ceil(totalRecords / limit);

    if (!CSTData || CSTData.length === 0) {
      return next(new ErrorHandler("Data not found"));
    }

    res.status(200).json({
      success: true,
      data: CSTData,
      totalRecords,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    next(error);
  }
};

export const CSTDownloadCsv1 = async (req, res) => {
  try {
    const data = await CSTFORM.find();

    // const transformDataForCSV = (data) => {
    //   return data.map((row) => ({
    //     id: row._id,
    //     A1: row.A1,
    //     A2: row.A2,
    //     A3: row.uniqueCode,
    //     A4: row.A4,
    //     A5: row.A5,
    //     A6: row.A6,
    //     A7: row.A7,
    //     A8: row.A8,
    //     A9: row.A9,
    //     A10_0: row.A10?.latitude,
    //     A10_1: row.A10?.longitude,
    //     A11: row.A11,
    //     A12: row.A12,
    //     B1: row.B1,
    //     B2: row.B2,
    //     B3: row.B3,
    //     B4_0: row.B4?.includes("Red") ? row.B4?.split(" : ")?.[1] : "",
    //     B4_1: row.B4?.includes("Yellow") ? row.B4?.split(" : ")?.[1] : "",
    //     B4_2: row.B4?.includes("Green") ? row.B4?.split(" : ")?.[1] : "",
    //     B5: row.B5,
    //     B6: row.B6,
    //     B7_0: row.B7?.split(":")?.[0] ?? "",
    //     B7_1: row.B7?.split(":")?.[1] ?? "",
    //     B8_0: row.B8?.[0],
    //     B8_1: row.B8?.[1],
    //     // B8_0: row.B8 === "Component facility" ? "Component facility" : "",
    //     // B8_1:
    //     //   row.B8 === "O -ve Blood availability" ? "O- ve Blood availability" : "",
    //     B9: row.B9,
    //     B10_0: row.B10?.[0],
    //     B10_1: row.B10?.[1],
    //     B10_2: row.B10?.[2],
    //     B11_0: row.B11?.[0],
    //     B11_1: row.B11?.[1],
    //     B11_2: row.B11?.[2],
    //     B11_3: row.B11?.[3],
    //     B11_4: row.B11?.[4],
    //     B11_5: row.B11?.[5],
    //     B11_6: row.B11?.[6],
    //     B11_7: row.B11?.[7],
    //     B11_8: row.B11?.[8],
    //     B11_9: row.B11?.[9],
    //     B11_10: row.B11?.[10],
    //     B11_11: row.B11?.[11],
    //     B11_12: row.B11?.[12],
    //     B11_13: row.B11?.[13],
    //     B11_14: row.B11?.[14],
    //     B11_15: row.B11?.[15],
    //     B11_16: row.B11?.[16],
    //     B11_17: row.B11?.[17],
    //     B12_0: row.B12?.[0],
    //     B12_1: row.B12?.[1],
    //     B12_2: row.B12?.[2],
    //     B12_3: row.B12?.[3],
    //     B12_4: row.B12?.[4],
    //     B12_5: row.B12?.[5] != null ? "other" : "",
    //     B12_6: row.B12?.[5],
    //     B13_0: row.B13?.[0],
    //     B13_1: row.B13?.[1],
    //     B13_2: row.B13?.[2],
    //     B13_3: row.B13?.[3],
    //     B13_4: row.B13?.[4],
    //     B13_5: row.B13?.[5],
    //     B13_6: row.B13?.[6],
    //     B13_7: row.B13?.[7],
    //     B13_8: row.B13?.[8],
    //     B13_9: row.B13?.[9],
    //     B13_10: row.B13?.[10],
    //     B14: row.B14,
    //     B15: row.B15,
    //     table1_0_Manpower: row.table1?.[0].Manpower,
    //     table1_0_Number: row.table1?.[0].Number,
    //     table1_0_availability247: row.table1?.[0].availability247,
    //     table1_0_onSiteAvailability: row.table1?.[0].onSiteAvailability,
    //     table1_0_onCallAvailability: row.table1?.[0].onCallAvailability,
    //     table1_1_Manpower: row.table1?.[1].Manpower,
    //     table1_1_Number: row.table1?.[1].Number,
    //     table1_1_availability247: row.table1?.[1].availability247,
    //     table1_1_onSiteAvailability: row.table1?.[1].onSiteAvailability,
    //     table1_1_onCallAvailability: row.table1?.[1].onCallAvailability,
    //     table1_2_Manpower: row.table1?.[2].Manpower,
    //     table1_2_Number: row.table1?.[2].Number,
    //     table1_2_availability247: row.table1?.[2].availability247,
    //     table1_2_onSiteAvailability: row.table1?.[2].onSiteAvailability,
    //     table1_2_onCallAvailability: row.table1?.[2].onCallAvailability,
    //     table1_3_Manpower: row.table1?.[3].Manpower,
    //     table1_3_Number: row.table1?.[3].Number,
    //     table1_3_availability247: row.table1?.[3].availability247,
    //     table1_3_onSiteAvailability: row.table1?.[3].onSiteAvailability,
    //     table1_3_onCallAvailability: row.table1?.[3].onCallAvailability,
    //     table1_4_Manpower: row.table1?.[4].Manpower,
    //     table1_4_Number: row.table1?.[4].Number,
    //     table1_4_availability247: row.table1?.[4].availability247,
    //     table1_4_onSiteAvailability: row.table1?.[4].onSiteAvailability,
    //     table1_4_onCallAvailability: row.table1?.[4].onCallAvailability,
    //     table1_5_Manpower: row.table1?.[5].Manpower,
    //     table1_5_Number: row.table1?.[5].Number,
    //     table1_5_availability247: row.table1?.[5].availability247,
    //     table1_5_onSiteAvailability: row.table1?.[5].onSiteAvailability,
    //     table1_5_onCallAvailability: row.table1?.[5].onCallAvailability,
    //     table1_6_Manpower: row.table1?.[6].Manpower,
    //     table1_6_Number: row.table1?.[6].Number,
    //     table1_6_availability247: row.table1?.[6].availability247,
    //     table1_6_onSiteAvailability: row.table1?.[6].onSiteAvailability,
    //     table1_6_onCallAvailability: row.table1?.[6].onCallAvailability,
    //     table1_7_Manpower: row.table1?.[7].Manpower,
    //     table1_7_Number: row.table1?.[7].Number,
    //     table1_7_availability247: row.table1?.[7].availability247,
    //     table1_7_onSiteAvailability: row.table1?.[7].onSiteAvailability,
    //     table1_7_onCallAvailability: row.table1?.[7].onCallAvailability,
    //     table1_8_Manpower: row.table1?.[8].Manpower,
    //     table1_8_Number: row.table1?.[8].Number,
    //     table1_8_availability247: row.table1?.[8].availability247,
    //     table1_8_onSiteAvailability: row.table1?.[8].onSiteAvailability,
    //     table1_8_onCallAvailability: row.table1?.[8].onCallAvailability,
    //     table1_9_Manpower: row.table1?.[9].Manpower,
    //     table1_9_Number: row.table1?.[9].Number,
    //     table1_9_availability247: row.table1?.[9].availability247,
    //     table1_9_onSiteAvailability: row.table1?.[9].onSiteAvailability,
    //     table1_9_onCallAvailability: row.table1?.[9].onCallAvailability,
    //     table1_10_Manpower: row.table1?.[10].Manpower,
    //     table1_10_Number: row.table1?.[10].Number,
    //     table1_10_availability247: row.table1?.[10].availability247,
    //     table1_10_onSiteAvailability: row.table1?.[10].onSiteAvailability,
    //     table1_10_onCallAvailability: row.table1?.[10].onCallAvailability,
    //     table1_11_Manpower: row.table1?.[11].Manpower,
    //     table1_11_Number: row.table1?.[11].Number,
    //     table1_11_availability247: row.table1?.[11].availability247,
    //     table1_11_onSiteAvailability: row.table1?.[11].onSiteAvailability,
    //     table1_11_onCallAvailability: row.table1?.[11].onCallAvailability,
    //     table1_12_Manpower: row.table1?.[12].Manpower,
    //     table1_12_Number: row.table1?.[12].Number,
    //     table1_12_availability247: row.table1?.[12].availability247,
    //     table1_12_onSiteAvailability: row.table1?.[12].onSiteAvailability,
    //     table1_12_onCallAvailability: row.table1?.[12].onCallAvailability,
    //     table1_13_Manpower: row.table1?.[13].Manpower,
    //     table1_13_Number: row.table1?.[13].Number,
    //     table1_13_availability247: row.table1?.[13].availability247,
    //     table1_13_onSiteAvailability: row.table1?.[13].onSiteAvailability,
    //     table1_13_onCallAvailability: row.table1?.[13].onCallAvailability,
    //     table1_14_Manpower: row.table1?.[14].Manpower,
    //     table1_14_Number: row.table1?.[14].Number,
    //     table1_14_availability247: row.table1?.[14].availability247,
    //     table1_14_onSiteAvailability: row.table1?.[14].onSiteAvailability,
    //     table1_14_onCallAvailability: row.table1?.[14].onCallAvailability,
    //     table1_15_Manpower: row.table1?.[15].Manpower,
    //     table1_15_Number: row.table1?.[15].Number,
    //     table1_15_availability247: row.table1?.[15].availability247,
    //     table1_15_onSiteAvailability: row.table1?.[15].onSiteAvailability,
    //     table1_15_onCallAvailability: row.table1?.[15].onCallAvailability,
    //     table1_16_Manpower: row.table1?.[16].Manpower,
    //     table1_16_Number: row.table1?.[16].Number,
    //     table1_16_availability247: row.table1?.[16].availability247,
    //     table1_16_onSiteAvailability: row.table1?.[16].onSiteAvailability,
    //     table1_16_onCallAvailability: row.table1?.[16].onCallAvailability,
    //     table1_17_Manpower: row.table1?.[17].Manpower,
    //     table1_17_Number: row.table1?.[17].Number,
    //     table1_17_availability247: row.table1?.[17].availability247,
    //     table1_17_onSiteAvailability: row.table1?.[17].onSiteAvailability,
    //     table1_17_onCallAvailability: row.table1?.[17].onCallAvailability,
    //     table1_18_Manpower: row.table1?.[18].Manpower,
    //     table1_18_Number: row.table1?.[18].Number,
    //     table1_18_availability247: row.table1?.[18].availability247,
    //     table1_18_onSiteAvailability: row.table1?.[18].onSiteAvailability,
    //     table1_18_onCallAvailability: row.table1?.[18].onCallAvailability,
    //     // Other: "Other",
    //     table1_19_Manpower: row.table1?.[19]?.Manpower,
    //     table1_19_Number: row.table1?.[19]?.Number,
    //     table1_19_availability247: row.table1?.[19]?.availability247,
    //     table1_19_onSiteAvailability: row.table1?.[19]?.onSiteAvailability,
    //     table1_19_onCallAvailability: row.table1?.[19]?.onCallAvailability,
    //     C2a_0: row.C2a?.[0],
    //     C2a_1: row.C2a?.[1],
    //     C2a_2: row.C2a?.[2],
    //     C2a_3: row.C2a?.[3],
    //     C2a_4: row.C2a?.[4],
    //     C2a_5: row.C2a?.[5],
    //     C2a_6: row.C2a?.[6],
    //     C2a_7: row.C2a?.[7],
    //     C2a_8: row.C2a?.[8],
    //     C2a_9: row.C2a?.[9],
    //     C2a_10: row.C2a?.[10],
    //     C2a_11: row.C2a?.[11],
    //     C2b_0: row.C2b?.[0],
    //     C2b_1: row.C2b?.[1],
    //     C2b_2: row.C2b?.[2],
    //     C2b_3: row.C2b?.[3],
    //     C2b_4: row.C2b?.[4],
    //     C2b_5: row.C2b?.[5],
    //     C2b_6: row.C2b?.[6],
    //     C2b_7: row.C2b?.[7],
    //     C2b_8: row.C2b?.[8],
    //     C2b_9: row.C2b?.[9],
    //     C2b_10: row.C2b?.[10],
    //     C2b_11: row.C2b?.[11],
    //     C3: row.C3,
    //     C4_0: row.C4?.[0],
    //     C4_1: row.C4?.[1],
    //     C4_2: row.C4?.[2],
    //     C4_3: row.C4?.[3],
    //     C4_4: row.C4?.[4],
    //     C4_5: row.C4?.[5],
    //     C4_6: row.C4?.[6],
    //     C4_7: row.C4?.[7],
    //     C4_8: row.C4?.[8],
    //     C4_9: row.C4?.[9],
    //     C4_10: row.C4?.[10],
    //     C4_11: row.C4?.[11] != null ? "Others" : "",
    //     C4_12: row.C4?.[11],
    //     C5_0: row.C5?.split(":")[0],
    //     C5_1: row.C5?.split(":")[1],
    //     C6: row.C6,
    //     H1D1_0: row.H1D1?.[0],
    //     H1D1_1: row.H1D1?.[1],
    //     H1D1_2: row.H1D1?.[2],
    //     H1D1_3: row.H1D1?.[3],
    //     H1D1_4: row.H1D1?.[4],
    //     H1D1_5: row.H1D1?.[5],
    //     H1D1_6: row.H1D1?.[6],
    //     H1D1_7: row.H1D1?.[7],
    //     H1D1_8: row.H1D1?.[8],
    //     H1D1_9: row.H1D1?.[9],
    //     H1D1_10: row.H1D1?.[10],
    //     H1D1_11: row.H1D1?.[11],
    //     H1D1_12: row.H1D1?.[12],
    //     H1D1_13: row.H1D1?.[13],
    //     H1D1_14: row.H1D1?.[14],
    //     H1D1_15: row.H1D1?.[15],
    //     H1D1_16: row.H1D1?.[16],
    //     H1D1_17: row.H1D1?.[17],
    //     H1D1_18: row.H1D1?.[18],
    //     H1D1_19: row.H1D1?.[19],
    //     H1D1_20: row.H1D1?.[20],
    //     H1D1_21: row.H1D1?.[21],
    //     H1D1_22: row.H1D1?.[22],
    //     H1D1_23: row.H1D1?.[23],
    //     H1D1_24: row.H1D1?.[24],
    //     H1D1_25: row.H1D1?.[25],
    //     H1D1_26: row.H1D1?.[26],
    //     H1D1_27: row.H1D1?.[27],
    //     H1D1_28: row.H1D1?.[28],
    //     H1D2_0: row.H1D2?.[0],
    //     H1D2_1: row.H1D2?.[1],
    //     H1D2_2: row.H1D2?.[2],
    //     H1D2_3: row.H1D2?.[3],
    //     H1D2_4: row.H1D2?.[4],
    //     H1D2_5: row.H1D2?.[5],
    //     H1D2_6: row.H1D2?.[6],
    //     H1D2_7: row.H1D2?.[7],
    //     H1D2_8: row.H1D2?.[8],
    //     H1D2_9: row.H1D2?.[9],
    //     H1D2_10: row.H1D2?.[10],
    //     H1D2_11: row.H1D2?.[11],
    //     H1D2_12: row.H1D2?.[12],
    //     H1D2_13: row.H1D2?.[13],
    //     H1D2_14: row.H1D2?.[14],
    //     H1D2_15: row.H1D2?.[15],
    //     H1D2_16: row.H1D2?.[16],
    //     H1D2_17: row.H1D2?.[17],
    //     H1D2_18: row.H1D2?.[18],
    //     H1D2_19: row.H1D2?.[19],
    //     H1D2_20: row.H1D2?.[20],
    //     H1D2_21: row.H1D2?.[21],
    //     H1D2_22: row.H1D2?.[22],
    //     H1D2_23: row.H1D2?.[23],
    //     H1D2_24: row.H1D2?.[24],
    //     H1D2_25: row.H1D2?.[25],
    //     table2_Adult: row.table2?.[0].Adult,
    //     table2_Pediatric: row.table2?.[0].Pediatric,
    //     table2_Broughtdead: row.table2?.[0].Broughtdead,
    //     table2_Deathafterarrival: row.table2?.[0].Deathafterarrival,
    //     table2_MLC: row.table2?.[0].MLC,
    //     table3_0_Attended: row.table3?.[0].Attended,
    //     table3_0_Death: row.table3?.[0].Death,
    //     table3_1_Attended: row.table3?.[1].Attended,
    //     table3_1_Death: row.table3?.[1].Death,
    //     table3_2_Attended: row.table3?.[2].Attended,
    //     table3_2_Death: row.table3?.[2].Death,
    //     table3_3_Attended: row.table3?.[3].Attended,
    //     table3_3_Death: row.table3?.[3].Death,
    //     table3_4_Attended: row.table3?.[4].Attended,
    //     table3_4_Death: row.table3?.[4].Death,
    //     table3_5_Attended: row.table3?.[5].Attended,
    //     table3_5_Death: row.table3?.[5].Death,
    //     table3_6_Attended: row.table3?.[6].Attended,
    //     table3_6_Death: row.table3?.[6].Death,
    //     table3_7_Attended: row.table3?.[7].Attended,
    //     table3_7_Death: row.table3?.[7].Death,
    //     table3_8_Attended: row.table3?.[8].Attended,
    //     table3_8_Death: row.table3?.[8].Death,
    //     E3_0: row.E3?.[0],
    //     E3_1: row.E3?.[1],
    //     E3_2: row.E3?.[2],
    //     E3_3: row.E3?.[3],
    //     E3_4: row.E3?.[4],
    //     E3_5: row.E3?.[5],
    //     E3_6: row.E3?.[6],
    //     E3_7: row.E3?.[7],
    //     E3_8: row.E3?.[8],
    //     E3_9: row.E3?.[9],
    //     E3_10: row.E3?.[10],
    //     E3_11: row.E3?.[11],
    //     E3_12: row.E3?.[12],
    //     E3_13: row.E3?.[13],
    //     E3_14: row.E3?.[14],
    //     E3_15: row.E3?.[15],
    //     E3_16: row.E3?.[16] != null ? "Other" : "",
    //     E3_17: row.E3?.[16],
    //     E4_0: row.E4?.[0],
    //     E4_1: row.E4?.[1],
    //     E4_2: row.E4?.[2],
    //     E4_3: row.E4?.[3],
    //     E4_4: row.E4?.[4],
    //     E4_5: row.E4?.[5],
    //     E4_6: row.E4?.[6] != null ? "Other" : "",
    //     E4_7: row.E4?.[6],
    //     H1F1: row.H1F1,
    //     H1F2: row.H1F2,
    //     H1F3: row.H1F3,
    //     H1F4_0: row.H1F4?.[0],
    //     H1F4_1: row.H1F4?.[1],
    //     H1F4_2: row.H1F4?.[2],
    //     H1F4_3: row.H1F4?.[3],
    //     H1F4_4: row.H1F4?.[4],
    //     H1F4_5: row.H1F4?.[5],
    //     H1F5: row.H1F5,
    //     H1F6_0: row.H1F6?.[0] != null ? "Yes" : "No",
    //     H1F6_1: row.H1F6?.[0],
    //     H1F6_2: row.H1F6?.[1] != null ? "Yes" : "No",
    //     H1F6_3: row.H1F6?.[1],
    //     H1F6_4: row.H1F6?.[2] != null ? "Yes" : "No",
    //     H1F6_5: row.H1F6?.[2],
    //     H1F7: row.H1F7,
    //     H1F8: row.H1F8,
    //     H1F9: row.H1F9,
    //     H1G1: row.H1G1,
    //     H1G2: row.H1G2,
    //     H1G3: row.H1G3,
    //     H1G4: row.H1G4,
    //     H1G5: row.H1G5,
    //     H1H1: row.H1H1,
    //     H1H2: row.H1H2,
    //     H1H3: row.H1H3,
    //     H1H4: row.H1H4,
    //     H1H5: row.H1H5,
    //     H1H6: row.H1H6,
    //     H1H7: row.H1H7,
    //     H1H8_0: row.H1H8?.[0],
    //     H1H8_1: row.H1H8?.[1],
    //     H1H8_2: row.H1H8?.[2] != null ? "other" : "",
    //     H1H8_3: row.H1H8?.[2],
    //     H1H9: row.H1H9,
    //     I1_0: row.I1?.[0],
    //     I1_1: row.I1?.[1],
    //     I1_2: row.I1?.[2],
    //     I1_3: row.I1?.[3],
    //     I1_4: row.I1?.[4],
    //     I1_5: row.I1?.[5],
    //     I1_6: row.I1?.[6],
    //     I1_7: row.I1?.[7],
    //     I1_8: row.I1?.[8],
    //     I1_9: row.I1?.[9],
    //     I1_10: row.I1?.[10],
    //     I1_11: row.I1?.[11],
    //     I1_12: row.I1?.[12],
    //     I1_13: row.I1?.[13],
    //     I1_14: row.I1?.[14],
    //     I1_15: row.I1?.[15],
    //     I1_16: row.I1?.[16],
    //     table4_0_SOP: row.table4?.[0]?.SOP,
    //     table4_0_FollowsSOP: row.table4?.[0]?.FollowsSOP,
    //     table4_1_SOP: row.table4?.[1].SOP,
    //     table4_1_FollowsSOP: row.table4?.[1].FollowsSOP,
    //     table4_2_SOP: row.table4?.[2].SOP,
    //     table4_2_FollowsSOP: row.table4?.[2].FollowsSOP,
    //     table4_3_SOP: row.table4?.[3].SOP,
    //     table4_3_FollowsSOP: row.table4?.[3].FollowsSOP,
    //     table4_4_SOP: row.table4?.[4].SOP,
    //     table4_4_FollowsSOP: row.table4?.[4].FollowsSOP,
    //     table4_5_SOP: row.table4?.[5].SOP,
    //     table4_5_FollowsSOP: row.table4?.[5].FollowsSOP,
    //     table4_6_SOP: row.table4?.[6].SOP,
    //     table4_6_FollowsSOP: row.table4?.[6].FollowsSOP,
    //     table4_7_SOP: row.table4?.[7].SOP,
    //     table4_7_FollowsSOP: row.table4?.[7].FollowsSOP,
    //     table4_8_SOP: row.table4?.[8].SOP,
    //     table4_8_FollowsSOP: row.table4?.[8].FollowsSOP,
    //     H1J1: row.H1J1,
    //     H1J2: row.H1J2,
    //   }));
    // };

    // const transformedData = transformDataForCSV(data);

    const csvStringifier = createObjectCsvStringifier({
      header: [
        {
          id: "_id",
          title: "Record ID",
        },

        { id: "AA1", title: "AA.1 Date & Time:" },
        { id: "AA2", title: "AA.2 Site:" },
        { id: "AA3", title: "AA.3 Name of the Data Collector:" },
        {
          id: "AA4",
          title: "AA.4 Respondent ID:",
          valueGetter: (params) => params?.data?.Respondent_ID,
        },
        {
          id: "AB1",
          title: "AB.1 Block",
        },
        { id: "AB2", title: "AB.2 Type of PSU:" },
        { id: "AB3", title: "AB.3 Name of PSU (Town/Village):" },
        {
          id: "AB4",
          title: "AB.4 GPS Co-ordinates: (Latitude)",
          valueGetter: (params) => params?.data?.AB4?.latitude,
        },
        {
          id: "AB4",
          title: "AB.4 GPS Co-ordinates: (Longitude)",
          valueGetter: (params) => params?.data?.AB4?.longitude,
        },
        {
          id: "AB4",
          title: "AB.4 GPS Co-ordinates: (State)",
          valueGetter: (params) => params?.data?.AB4?.district,
        },
        {
          id: "AB4",
          title: "AB.4 GPS Co-ordinates: (district)",
          valueGetter: (params) => params?.data?.AB4?.state,
        },
        {
          id: "AB5",
          title: "AB.5 Household ID Number:",
          valueGetter: (params) => params?.data?.Household_ID,
        },
        {
          id: "AB6",
          title:
            "AB.6 For how long have you been living in this city/village with your family?",
        },
        {
          id: "AC1",
          title:
            "AC.1 How many members are currently residing in his household?",
        },
        // ...generateMemeberColumns,
        { id: "AC2_1", title: "AC.2.1 Name of Respondent?" },
        {
          id: "AC3",
          title:
            "AC.3 Are there any other persons such as small children or infants that we have not listed?",
        },
        {
          id: "AC4",
          title:
            "AC.4 Are there any other people who may not be members of your family such as domestic servants who usually live here?",
        },
        {
          id: "AC5",
          title:
            "AC.5 In the past one year, did any member of this household have any health emergency that could have required any sort of medical attention or treatment?",
        },
        {
          id: "AC6_1",
          title:
            "AC.6.1 In the past one year, did you or any member of this household suffered from sudden injury in Road Traffic Accident/ fracture/ severe fall/ drowning/ stabbing/ gunshot/ any other assault/ any attempt to self-harm/ domestic violence/ homicidal etc.?",
        },
        {
          id: "AC6_1_if",
          title:
            "AC6.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
        },
        {
          id: "AC6_2",
          title:
            "AC.6.2 If yes, could you please tell who all from your Household suffered with this condition?",
        },
        {
          id: "AC7_1",
          title:
            "AC.7.1 In the past one year, did you or any member of this household suffered from severe/ minor burns etc.",
        },
        {
          id: "AC7_1_if",
          title:
            "AC.7.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
        },
        {
          id: "AC7_2",
          title:
            "Ac.7.2 If yes, could you please tell who all from your Household suffered with this condition?",
        },
        {
          id: "AC8_1",
          title:
            "AC.8.1 In the past one year, has anyone in your household had a history of heart attack or sudden onset of acute chest pain/ heaviness/ constriction, with possible radiation to the left arm, neck, or back, associated with symptoms such as upper abdominal pain/ palpitations/ dizziness/ profuse sweating, and exacerbated by exertion after meals?",
        },
        {
          id: "AC8_1_if",
          title:
            "AC.8.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
        },
        {
          id: "AC8_2",
          title:
            "AC.8.2 If yes, could you please tell who all from your Household suffered with this condition?",
        },
        {
          id: "AC9_1",
          title:
            "Ac.9.1 In the past one year, did you or any member of this household suffered with brain stroke or symptoms like sudden onset of weakness, especially one side of the body/ loss of consciousness/ altered sensorium/ Imbalance/ blurred vision/ facial deviation/ drooping of eyelid/ speech abnormality with numbness and tingling sensation, or difficulty in speaking or understanding speech (aphasia), or sudden severe headache with no known cause of one's life (haemorrhagic strokes)?",
        },
        {
          id: "AC9_1_if",
          title:
            "AC.9.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
        },
        {
          id: "AC9_2",
          title:
            "AC.9.2 If yes, could you please tell who all from your Household suffered with this condition?",
        },
        {
          id: "AC10_1",
          title:
            "AC.10.1 In the past one year, has anyone in your household experienced breathlessness with or without sudden onset of fever/ cough with expectoration/ chest pain (pleuritic)/ fast breathing/ not able to speak complete sentences/ loss of consciousness/ or chest tightness leading to suspicion of pneumonia?",
        },
        {
          id: "AC10_1_if",
          title:
            "AC.10.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
        },
        {
          id: "AC10_2",
          title:
            "AC.10.2 If yes, could you please tell who all from your Household suffered with this condition?",
        },
        {
          id: "AC11_1",
          title:
            "AC.11.1 In the past one year, did any women in your household give birth to a child or had any episode of miscarriage/ abortion?",
        },
        {
          id: "AC11_1_if",
          title:
            "AC.11.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
        },
        {
          id: "AC11_2",
          title:
            "AC.11.2 If “Yes” to AC.11.1, did women or mother suffer with any condition like vaginal bleeding that required blood transfusion or sudden increase in blood pressure or decreased urine output or loss of fetal movements or loss of consciousness or seizure or fits etc., before / during / after delivery?",
        },
        {
          id: "AC11_2_if",
          title:
            "AC.11.2.2 If Yes, What were the symptoms of emergency conditions and first course of action?",
        },
        {
          id: "AC11_3",
          title:
            "AC.11.3 If “Yes” to AC.11.2, could you please tell us who suffered with this condition?",
        },
        {
          id: "AC11_4",
          title:
            'AC.11.4 If "Yes" to AC.11.1, At the time of birth did the new-born had any issues such as not cried/ delayed cry/ not able to breath/ body getting cold/ minimal limb movement/ blue discoloration/ taken no ICU after delivery/ convulsion/ sudden onset of fever/ difficulty in breast feeding/ excessive diarrhoea/ jaundice or any other condition that required a longer hospital stay before being discharged/ that required a further admission after discharge within the first month of the birth?',
        },
        {
          id: "AC11_4_if",
          title:
            "AC.11.4.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
        },
        {
          id: "AC11_5",
          title:
            "AC.11.5 If “Yes” to AC.11.4, could you please tell us who suffered with this condition?",
        },
        {
          id: "AC12_1",
          title:
            "AC.12.1 In the past one year have you or anyone from your family member been bitten by a snake?",
        },
        {
          id: "AC12_1_if",
          title:
            "AC.12.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
        },
        {
          id: "AC12_2",
          title:
            "AC.12.2 If “Yes”, could you please tell who all suffered with this condition?",
        },
        {
          id: "AC13_1",
          title:
            "AC.13.1 In the past one year, did you or anyone of your family member have a history of accidental/ intentional ingestion of poison/ ingestion or exposure to pesticides/ insecticides/ ingestion of rat poison/ phenyl any hazardous substance/ chemical substance or any other substance that could have required any sort of medical attention or treatment?",
        },
        {
          id: "AC13_1_if",
          title:
            "AC.13.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
        },
        {
          id: "AC13_2",
          title:
            "AC.13.2 If Yes, Could you please tell who all suffered with this condition?",
        },
        {
          id: "AC14_1",
          title:
            "AC.14.1 Apart from the above-mentioned conditions, did anyone suffer from any other conditions that required immediate emergency services?",
        },
        {
          id: "AC14_1_if",
          title:
            "AC.14.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
        },
        {
          id: "AC14_2",
          title:
            "AC.14.2 If yes, could you please tell who all suffered with this condition?",
        },
        {
          id: "AC15_1",
          title:
            "AC.15.1 In the last one year, did any member in your household lost his/her life due to any health emergency condition?",
        },
        // ...generateDeathMemeberColumns,
        {
          id: "AC15_2",
          title:
            "AC.15.2 If yes, how many members in your household lost his/her life due to any health emergency condition (Specify)",
        },
        {
          id: "AC15_4_0",
          title:
            "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Trauma)",
          valueGetter: (params) => params?.AC15_4?.[0],
        },
        {
          id: "AC15_4_1",
          title:
            "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Burn: Severe / Minor burns)",
          valueGetter: (params) => params?.AC15_4?.[1],
        },
        {
          id: "AC15_4_2",
          title:
            "Ac.15.4 What werw the symptoms the deceased complained about? (choice = STEMI)",
          valueGetter: (params) => params?.AC15_4?.[2],
        },
        {
          id: "AC15_4_3",
          title:
            "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Stroke)",
          valueGetter: (params) => params?.AC15_4?.[3],
        },
        {
          id: "AC15_4_4",
          title:
            "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Acute Respiratory Illness)",
          valueGetter: (params) => params?.AC15_4?.[4],
        },
        {
          id: "AC15_4_5",
          title:
            "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Postpartum Haemorrhage & Pre-Eclampsia)",
          valueGetter: (params) => params?.AC15_4?.[5],
        },
        {
          id: "AC15_4_6",
          title:
            "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Neonatal Emergency)",
          valueGetter: (params) => params?.AC15_4?.[6],
        },
        {
          id: "AC15_4_7",
          title:
            "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Snake bite)",
          valueGetter: (params) => params?.AC15_4?.[7],
        },
        {
          id: "AC15_4_8",
          title:
            "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Poisoning)",
          valueGetter: (params) => params?.AC15_4?.[9],
        },
        {
          id: "AC15_4_9",
          title:
            "Ac.15.4 What werw the symptoms the deceased complained about? (choice = others)",
          valueGetter: (params) => params?.AC15_4?.[10]?.split(":")[0],
        },
        {
          id: "AC15_4_9_other_specify",
          title:
            "Ac.15.4 What werw the symptoms the deceased complained about? (Others(Specify))",
          valueGetter: (params) => params?.AC15_4?.[10]?.split(":")[1],
        },
      ],
    });

    const csv =
      csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(data);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment;filename=HFAT-1.csv");
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating CSV file");
  }
};

export const deleteCst = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Ids not found or not provided",
      });
    }

    const deletedItems = await CSTFORM.deleteMany({
      _id: { $in: ids },
    });

    if (deletedItems.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No CST forms found with the provided ids",
      });
    }

    return res.status(200).json({
      success: true,
      message: `${deletedItems.deletedCount} CST forms deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const questions = [
  {
    id: "_id",
    title: "Record ID",
  },

  { id: "AA1", title: "AA.1 Date & Time:" },
  { id: "AA2", title: "AA.2 Site:" },
  { id: "AA3", title: "AA.3 Name of the Data Collector:" },
  {
    id: "AA4",
    title: "AA.4 Respondent ID:",
    valueGetter: (params) => params?.data?.Respondent_ID,
  },
  {
    id: "AB1",
    title: "AB.1 Block",
  },
  { id: "AB2", title: "AB.2 Type of PSU:" },
  { id: "AB3", title: "AB.3 Name of PSU (Town/Village):" },
  {
    id: "AB4",
    title: "AB.4 GPS Co-ordinates: (Latitude)",
    valueGetter: (params) => params?.data?.AB4?.latitude,
  },
  {
    id: "AB4",
    title: "AB.4 GPS Co-ordinates: (Longitude)",
    valueGetter: (params) => params?.data?.AB4?.longitude,
  },
  {
    id: "AB4",
    title: "AB.4 GPS Co-ordinates: (State)",
    valueGetter: (params) => params?.data?.AB4?.district,
  },
  {
    id: "AB4",
    title: "AB.4 GPS Co-ordinates: (district)",
    valueGetter: (params) => params?.data?.AB4?.state,
  },
  {
    id: "AB5",
    title: "AB.5 Household ID Number:",
    valueGetter: (params) => params?.data?.Household_ID,
  },
  {
    id: "AB6",
    title:
      "AB.6 For how long have you been living in this city/village with your family?",
  },
  {
    id: "AC1",
    title: "AC.1 How many members are currently residing in his household?",
  },
  // ...generateMemeberColumns,
  { id: "AC2_1", title: "AC.2.1 Name of Respondent?" },
  {
    id: "AC3",
    title:
      "AC.3 Are there any other persons such as small children or infants that we have not listed?",
  },
  {
    id: "AC4",
    title:
      "AC.4 Are there any other people who may not be members of your family such as domestic servants who usually live here?",
  },
  {
    id: "AC5",
    title:
      "AC.5 In the past one year, did any member of this household have any health emergency that could have required any sort of medical attention or treatment?",
  },
  {
    id: "AC6_1",
    title:
      "AC.6.1 In the past one year, did you or any member of this household suffered from sudden injury in Road Traffic Accident/ fracture/ severe fall/ drowning/ stabbing/ gunshot/ any other assault/ any attempt to self-harm/ domestic violence/ homicidal etc.?",
  },
  {
    id: "AC6_1_if",
    title:
      "AC6.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
  },
  {
    id: "AC6_2",
    title:
      "AC.6.2 If yes, could you please tell who all from your Household suffered with this condition?",
  },
  {
    id: "AC7_1",
    title:
      "AC.7.1 In the past one year, did you or any member of this household suffered from severe/ minor burns etc.",
  },
  {
    id: "AC7_1_if",
    title:
      "AC.7.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
  },
  {
    id: "AC7_2",
    title:
      "Ac.7.2 If yes, could you please tell who all from your Household suffered with this condition?",
  },
  {
    id: "AC8_1",
    title:
      "AC.8.1 In the past one year, has anyone in your household had a history of heart attack or sudden onset of acute chest pain/ heaviness/ constriction, with possible radiation to the left arm, neck, or back, associated with symptoms such as upper abdominal pain/ palpitations/ dizziness/ profuse sweating, and exacerbated by exertion after meals?",
  },
  {
    id: "AC8_1_if",
    title:
      "AC.8.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
  },
  {
    id: "AC8_2",
    title:
      "AC.8.2 If yes, could you please tell who all from your Household suffered with this condition?",
  },
  {
    id: "AC9_1",
    title:
      "Ac.9.1 In the past one year, did you or any member of this household suffered with brain stroke or symptoms like sudden onset of weakness, especially one side of the body/ loss of consciousness/ altered sensorium/ Imbalance/ blurred vision/ facial deviation/ drooping of eyelid/ speech abnormality with numbness and tingling sensation, or difficulty in speaking or understanding speech (aphasia), or sudden severe headache with no known cause of one's life (haemorrhagic strokes)?",
  },
  {
    id: "AC9_1_if",
    title:
      "AC.9.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
  },
  {
    id: "AC9_2",
    title:
      "AC.9.2 If yes, could you please tell who all from your Household suffered with this condition?",
  },
  {
    id: "AC10_1",
    title:
      "AC.10.1 In the past one year, has anyone in your household experienced breathlessness with or without sudden onset of fever/ cough with expectoration/ chest pain (pleuritic)/ fast breathing/ not able to speak complete sentences/ loss of consciousness/ or chest tightness leading to suspicion of pneumonia?",
  },
  {
    id: "AC10_1_if",
    title:
      "AC.10.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
  },
  {
    id: "AC10_2",
    title:
      "AC.10.2 If yes, could you please tell who all from your Household suffered with this condition?",
  },
  {
    id: "AC11_1",
    title:
      "AC.11.1 In the past one year, did any women in your household give birth to a child or had any episode of miscarriage/ abortion?",
  },
  {
    id: "AC11_1_if",
    title:
      "AC.11.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
  },
  {
    id: "AC11_2",
    title:
      "AC.11.2 If “Yes” to AC.11.1, did women or mother suffer with any condition like vaginal bleeding that required blood transfusion or sudden increase in blood pressure or decreased urine output or loss of fetal movements or loss of consciousness or seizure or fits etc., before / during / after delivery?",
  },
  {
    id: "AC11_2_if",
    title:
      "AC.11.2.2 If Yes, What were the symptoms of emergency conditions and first course of action?",
  },
  {
    id: "AC11_3",
    title:
      "AC.11.3 If “Yes” to AC.11.2, could you please tell us who suffered with this condition?",
  },
  {
    id: "AC11_4",
    title:
      'AC.11.4 If "Yes" to AC.11.1, At the time of birth did the new-born had any issues such as not cried/ delayed cry/ not able to breath/ body getting cold/ minimal limb movement/ blue discoloration/ taken no ICU after delivery/ convulsion/ sudden onset of fever/ difficulty in breast feeding/ excessive diarrhoea/ jaundice or any other condition that required a longer hospital stay before being discharged/ that required a further admission after discharge within the first month of the birth?',
  },
  {
    id: "AC11_4_if",
    title:
      "AC.11.4.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
  },
  {
    id: "AC11_5",
    title:
      "AC.11.5 If “Yes” to AC.11.4, could you please tell us who suffered with this condition?",
  },
  {
    id: "AC12_1",
    title:
      "AC.12.1 In the past one year have you or anyone from your family member been bitten by a snake?",
  },
  {
    id: "AC12_1_if",
    title:
      "AC.12.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
  },
  {
    id: "AC12_2",
    title:
      "AC.12.2 If “Yes”, could you please tell who all suffered with this condition?",
  },
  {
    id: "AC13_1",
    title:
      "AC.13.1 In the past one year, did you or anyone of your family member have a history of accidental/ intentional ingestion of poison/ ingestion or exposure to pesticides/ insecticides/ ingestion of rat poison/ phenyl any hazardous substance/ chemical substance or any other substance that could have required any sort of medical attention or treatment?",
  },
  {
    id: "AC13_1_if",
    title:
      "AC.13.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
  },
  {
    id: "AC13_2",
    title:
      "AC.13.2 If Yes, Could you please tell who all suffered with this condition?",
  },
  {
    id: "AC14_1",
    title:
      "AC.14.1 Apart from the above-mentioned conditions, did anyone suffer from any other conditions that required immediate emergency services?",
  },
  {
    id: "AC14_1_if",
    title:
      "AC.14.1.1 If Yes, What were the symptoms of emergency conditions and first course of action?",
  },
  {
    id: "AC14_2",
    title:
      "AC.14.2 If yes, could you please tell who all suffered with this condition?",
  },
  {
    id: "AC15_1",
    title:
      "AC.15.1 In the last one year, did any member in your household lost his/her life due to any health emergency condition?",
  },
  // ...generateDeathMemeberColumns,
  {
    id: "AC15_2",
    title:
      "AC.15.2 If yes, how many members in your household lost his/her life due to any health emergency condition (Specify)",
  },
  {
    id: "AC15_4_0",
    title:
      "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Trauma)",
    valueGetter: (params) => params?.AC15_4?.[0],
  },
  {
    id: "AC15_4_1",
    title:
      "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Burn: Severe / Minor burns)",
    valueGetter: (params) => params?.AC15_4?.[1],
  },
  {
    id: "AC15_4_2",
    title:
      "Ac.15.4 What werw the symptoms the deceased complained about? (choice = STEMI)",
    valueGetter: (params) => params?.AC15_4?.[2],
  },
  {
    id: "AC15_4_3",
    title:
      "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Stroke)",
    valueGetter: (params) => params?.AC15_4?.[3],
  },
  {
    id: "AC15_4_4",
    title:
      "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Acute Respiratory Illness)",
    valueGetter: (params) => params?.AC15_4?.[4],
  },
  {
    id: "AC15_4_5",
    title:
      "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Postpartum Haemorrhage & Pre-Eclampsia)",
    valueGetter: (params) => params?.AC15_4?.[5],
  },
  {
    id: "AC15_4_6",
    title:
      "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Neonatal Emergency)",
    valueGetter: (params) => params?.AC15_4?.[6],
  },
  {
    id: "AC15_4_7",
    title:
      "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Snake bite)",
    valueGetter: (params) => params?.AC15_4?.[7],
  },
  {
    id: "AC15_4_8",
    title:
      "Ac.15.4 What werw the symptoms the deceased complained about? (choice = Poisoning)",
    valueGetter: (params) => params?.AC15_4?.[9],
  },
  {
    id: "AC15_4_9",
    title:
      "Ac.15.4 What werw the symptoms the deceased complained about? (choice = others)",
    valueGetter: (params) => params?.AC15_4?.[10]?.split(":")[0],
  },
  {
    id: "AC15_4_9_other_specify",
    title:
      "Ac.15.4 What werw the symptoms the deceased complained about? (Others(Specify))",
    valueGetter: (params) => params?.AC15_4?.[10]?.split(":")[1],
  },
];

// Create a map for quick lookup
const questionMap = questions.reduce((acc, q) => {
  acc[q.id] = q.title;
  return acc;
}, {});

class ResponseToCsvTransform extends Transform {
  constructor(questionMap) {
    super({ objectMode: true });
    this.questionMap = questionMap;
    this.isFirstChunk = true;
  }

  _transform(doc, encoding, callback) {
    try {
      const rowData = {};

      // Convert MongoDB document to plain object
      const plainDoc = doc.toObject ? doc.toObject() : doc;

      // Map each field to its question text
      Object.entries(plainDoc).forEach(([key, value]) => {
        // Skip MongoDB internal fields
        if (key.startsWith("_")) return;

        // Use question text as header if available, otherwise use field ID
        const headerText = this.questionMap[key] || key;
        rowData[headerText] = value;
      });

      callback(null, rowData);
    } catch (error) {
      callback(error);
    }
  }
}

// export const CSTDownloadCsv = async (req, res) => {
//   try {
//     // Set headers for CSV download
//     res.setHeader("Content-Type", "text/csv");
//     res.setHeader("Content-Disposition", "attachment; filename=responses.csv");

//     // Create CSV stream with headers
//     const csvStream = fastCsv.format({
//       headers: true,
//       writeHeaders: true,
//     });

//     // Pipe to response
//     csvStream.pipe(res);

//     // Create transform stream
//     const transformStream = new ResponseToCsvTransform(questionMap);

//     // Create cursor and pipe through transforms
//     const cursor = CSTFORM.find({}).limit(500)
//       .cursor({ batchSize: 100 }) // Adjust batch size based on your needs
//       .pipe(transformStream)
//       .pipe(csvStream);

//     // Handle errors
//     cursor.on("error", (error) => {
//       console.error("Stream error:", error);
//       res.end();
//     });
//   } catch (error) {
//     console.error("CSV generation error:", error);
//     res.status(500).send("Error generating CSV");
//   }
// };

export const CSTDownloadCsv = async (req, res) => {
  try {
    const adminId = req.user._id;
    const state = req.user.sitename;
    const role = req.user.role;
    const stateCode = state?.trim();

    const matchedState = states.find((s) => s.label === stateCode);

    if (!matchedState) {
      return res.status(400).json({
        success: false,
        message: "State code not found",
      });
    }

    const regex = new RegExp(`^${matchedState.value}`);

    // First pass to get max members
    const maxLength = await CSTFORM.aggregate([
      // Match documents based on role
      {
        $match:
          role == "superadmin"
            ? {} // No filter for "superadmin"
            : { AA2: { $regex: regex } }, // Filter for other roles
      },
      // Project the size of the AC3_table and AC15_table arrays
      {
        $project: {
          memberCount: { $size: { $ifNull: ["$AC3_table", []] } },
          deathmemberCount: { $size: { $ifNull: ["$AC15_table", []] } },
          EmergencyData: { $size: { $ifNull: ["$Emergency_Data", []] } },
        },
      },
      // Group to calculate the maximum values
      {
        $group: {
          maxMemberCount: { $max: "$memberCount" },
          maxDeathMemberCount: { $max: "$deathmemberCount" },
          EmergencyDataCount: { $max: "$deathmemberCount" },
        },
      },
    ]);

    const members = maxLength[0]?.memberCount || 0;
    const deathMembers = maxLength[0]?.deathMembers || 0;
    const EmergencyData = maxLength[0]?.EmergencyData || 0;

    for (let i = 0; i < members; i++) {
      MemberColumns.forEach((col) => {
        headers.push(`Member${i + 1}_${col.headerName}`);
      });
    }
  } catch (error) {
    console.error("Export error:", error);
    res.status(500).send("Error exporting data");
  }
};


export const CSTUpdateController = async (req, res) => {
  try {
    // const { id } = req.params;
    const data = req.body;
    const updatedData = await CSTFORM.findByIdAndUpdate(data._id, data);
    res.status(200).json({updatedData,succes:true});
  }
  catch (error) {
    console.error(error);
    res.status(500).send("Error updating data");
  }
}