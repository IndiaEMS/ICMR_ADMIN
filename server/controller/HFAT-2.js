import express, { response } from "express";
import mongoose from "mongoose";
import { HFAT2 } from "../Database/HFAT-2.js";
const app = express();
import { User } from "../Database/user.js";

export const HFAT2Controller = async (req, res) => {
  var { completeform, table1, table2, table3, table4 } = req.body;
  completeform = JSON.parse(completeform);
  table1 = JSON.parse(table1);
  table2 = JSON.parse(table2);
  table3 = JSON.parse(table3);
  table4 = JSON.parse(table4);

  HFAT2.find({ H2A2: completeform?.H2A2 }).then((response) => {
    const combinedData = {
      uniqueCode: `${completeform.H2A2}_${response.length + 1}`,
      ...completeform,
      table1,
      table2,
      table3,
      table4,
    };
    HFAT2.create(combinedData)
      .then((result) => {
        res.status(200).json({ success: "data saved", result });
      })
      .catch((err) => {
        res.status(400).json({ error: "error for data save" });
      });
  });
  // const hfat2 = req.body;
  // try {
  //   HFAT2.find({ H2A2: hfat2?.H2A2 }).then((response) => {
  //     const newHFAT2 = new HFAT2({
  //       uniqueCode: `${hfat2.H2A2}_${response.length + 1}`,
  //       ...hfat2,
  //     });
  //     // const newHFAT2 = new HFAT2(hfat);
  //     newHFAT2.save();
  //     res.status(201).json(newHFAT2);
  //   });
  // } catch (error) {
  //   res.status(409).json({ message: error.message });
  // }
};

// export const HFAT2Get = async (req, res, next) => {
//   try {
//     const HEAT2Data = await HFAT2.find();
//     if (!HEAT2Data) {
//       res.status(404).json({ error: "Data not found" });
//     }

//     res.status(200).json({
//       success: true,
//       data: HEAT2Data,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const HFAT2Get = async (req, res, next) => {
  try {
    const adminId = req.user.id;
    const state = req.user.sitename;

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
      { value: "MPBHS", label: "Madhya Pradesh" },
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

    const HFAT2Data = await HFAT2.find({ uniqueCode: { $regex: regex } });

    if (!HFAT2Data) {
      return next(new ErrorHandler("data not found"));
    }

    res.status(200).json({
      success: true,
      data: HFAT2Data,
    });
  } catch (error) {
    next(error);
  }
};

export const HFAT2AndAMBULANCEGet = async (req, res, next) => {
  try {
    const id = req.params.id;
    let HEAT2Data;

    if (id) {
      HEAT2Data = await HFAT2.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            from: "ambulances", // The collection name in MongoDB for Ambulance
            pipeline: [
              {
                $addFields: {
                  formUniqueCode: {
                    $arrayElemAt: [{ $split: ["$formUniqueCode", " : "] }, 1],
                  },
                },
              },
              {
                $match: {
                  $expr: { $eq: ["$formUniqueCode", "$$uniqueCode"] },
                },
              },
            ],
            as: "ambulanceDetails",
          },
        },
        {
          $unwind: {
            path: "$ambulanceDetails",
            preserveNullAndEmptyArrays: true,
          },
        }, // Unwind the array to get a direct object
      ]);
    } else {
      HEAT2Data = await HFAT2.aggregate([
        {
          $lookup: {
            from: "ambulances", // The collection name in MongoDB for Ambulance
            let: { uniqueCode: "$uniqueCode" }, // Define the variables to use in the pipeline
            pipeline: [
              {
                $addFields: {
                  formUniqueCode: {
                    $arrayElemAt: [{ $split: ["$formUniqueCode", " : "] }, 1],
                  },
                },
              },
              {
                $match: {
                  $expr: { $eq: ["$formUniqueCode", "$$uniqueCode"] },
                },
              },
            ],
            as: "ambulanceDetails",
          },
        },
        {
          $unwind: {
            path: "$ambulanceDetails", // Unwind the array
            preserveNullAndEmptyArrays: true, // Keep documents even if the array is empty
          },
        },
      ]);
    }

    if (!HEAT2Data || HEAT2Data.length === 0) {
      return res.status(404).json({ error: "Data not found" });
    }

    res.status(200).json({
      success: true,
      data: HEAT2Data,
    });
  } catch (error) {
    next(error);
  }
};

export const HFAT2Delete = async (req, res, next) => {
  try {
    const { id } = req.body;

    const HEAT3Data = await HFAT2.deleteMany({ _id: { $in: id } });

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

export const HFAT2DownloadCsv = async (req, res) => {
  try {
    const data = await HFAT2.find();

    const transformDataForCSV = (data) => {
      return data.map((row) => ({
        id: row._id,
        H2A1: row.H2A1,
        date: row.date,
        H2A2: row.uniqueCode,
        H2A3: row.H2A3,
        H2A4: row.H2A4,
        H2A5: row.H2A5,
        H2A6: row.H2A6,
        H2A7: row.H2A7,
        H2A8: row.H2A8,
        H2A9_0: row.H2A9?.latitude,
        H2A9_1: row.H2A9?.longitude,
        H2A10: row.H2A10,
        H2A11: row.H2A11,
        H2B1: row.H2B1,
        H2B2: row.H2B2,
        H2B3: row.H2B3,
        H2B4: row.H2B4,
        H2B5: row.H2B5,
        H2B6: row.H2B6,
        H2B7_0: row.H2B7?.[0],
        H2B7_1: row.H2B7?.[1],
        H2B7_2: row.H2B7?.[2],
        H2B7_3: row.H2B7?.[3],
        H2B7_4: row.H2B7?.[4],
        H2B7_5: row.H2B7?.[5],
        H2B7_6: row.H2B7?.[6],
        H2B7_7: row.H2B7?.[7],
        H2B7_8: row.H2B7?.[8],
        H2B7_9: row.H2B7?.[9],
        H2B7_10: row.H2B7?.[10],
        H2B7_11: row.H2B7?.[11],
        H2B7_12: row.H2B7?.[12],
        H2B7_13: row.H2B7?.[13],
        H2B7_14: row.H2B7?.[14],
        H2B7_15: row.H2B7?.[15],
        H2B7_16: row.H2B7?.[16],
        H2B7_17: row.H2B7?.[17],
        H2B7_18: row.H2B7?.[18],
        H2B8_0: row.H2B8?.[0],
        H2B8_1: row.H2B8?.[1],
        H2B8_2: row.H2B8?.[2],
        H2B8_3: row.H2B8?.[3],
        H2B8_4: row.H2B8?.[4],
        H2B8_5: row.H2B8?.[5],
        H2B8_6: row.H2B8?.[6] != null ? "other" : "",
        H2B8_7: row.H2B8?.[6],
        H2B9: row.H2B9,
        H2B10: row.H2B10,
        table1_0_Manpower: row.table1?.[0]?.Manpower,
        table1_0_Number: row.table1?.[0]?.Number,
        table1_0_availability247: row.table1?.[0]?.Availability247,
        table1_0_onSiteAvailability: row.table1?.[0]?.onSiteAvailability,
        table1_0_onCallAvailability: row.table1?.[0]?.onCallAvailability,
        table1_1_Manpower: row.table1?.[1]?.Manpower,
        table1_1_Number: row.table1?.[1]?.Number,
        table1_1_availability247: row.table1?.[1]?.Availability247,
        table1_1_onSiteAvailability: row.table1?.[1]?.onSiteAvailability,
        table1_1_onCallAvailability: row.table1?.[1]?.onCallAvailability,
        table1_2_Manpower: row.table1?.[2]?.Manpower,
        table1_2_Number: row.table1?.[2]?.Number,
        table1_2_availability247: row.table1?.[2]?.Availability247,
        table1_2_onSiteAvailability: row.table1?.[2]?.onSiteAvailability,
        table1_2_onCallAvailability: row.table1?.[2]?.onCallAvailability,
        table1_3_Manpower: row.table1?.[3]?.Manpower,
        table1_3_Number: row.table1?.[3]?.Number,
        table1_3_availability247: row.table1?.[3]?.Availability247,
        table1_3_onSiteAvailability: row.table1?.[3]?.onSiteAvailability,
        table1_3_onCallAvailability: row.table1?.[3]?.onCallAvailability,
        table1_4_Manpower: row.table1?.[4]?.Manpower,
        table1_4_Number: row.table1?.[4]?.Number,
        table1_4_availability247: row.table1?.[4]?.Availability247,
        table1_4_onSiteAvailability: row.table1?.[4]?.onSiteAvailability,
        table1_4_onCallAvailability: row.table1?.[4]?.onCallAvailability,
        table1_5_Manpower: row.table1?.[5]?.Manpower,
        table1_5_Number: row.table1?.[5]?.Number,
        table1_5_availability247: row.table1?.[5]?.Availability247,
        table1_5_onSiteAvailability: row.table1?.[5]?.onSiteAvailability,
        table1_5_onCallAvailability: row.table1?.[5]?.onCallAvailability,
        table1_6_Manpower: row.table1?.[6]?.Manpower,
        table1_6_Number: row.table1?.[6]?.Number,
        table1_6_availability247: row.table1?.[6]?.Availability247,
        table1_6_onSiteAvailability: row.table1?.[6]?.onSiteAvailability,
        table1_6_onCallAvailability: row.table1?.[6]?.onCallAvailability,
        table1_7_Manpower: row.table1?.[7]?.Manpower,
        table1_7_Number: row.table1?.[7]?.Number,
        table1_7_availability247: row.table1?.[7]?.Availability247,
        table1_7_onSiteAvailability: row.table1?.[7]?.onSiteAvailability,
        table1_7_onCallAvailability: row.table1?.[7]?.onCallAvailability,
        table1_8_Manpower: row.table1?.[8]?.Manpower,
        table1_8_Number: row.table1?.[8]?.Number,
        table1_8_availability247: row.table1?.[8]?.Availability247,
        table1_8_onSiteAvailability: row.table1?.[8]?.onSiteAvailability,
        table1_8_onCallAvailability: row.table1?.[8]?.onCallAvailability,
        table1_9_Manpower: row.table1?.[9]?.Manpower,
        table1_9_Number: row.table1?.[9]?.Number,
        table1_9_availability247: row.table1?.[9]?.Availability247,
        table1_9_onSiteAvailability: row.table1?.[9]?.onSiteAvailability,
        table1_9_onCallAvailability: row.table1?.[9]?.onCallAvailability,
        table1_10_Manpower: row.table1?.[10]?.Manpower,
        table1_10_Number: row.table1?.[10]?.Number,
        table1_10_availability247: row.table1?.[10]?.availability247,
        table1_10_onSiteAvailability: row.table1?.[10]?.onSiteAvailability,
        table1_10_onCallAvailability: row.table1?.[10]?.onCallAvailability,
        table1_11_Manpower: row.table1?.[11]?.Manpower,
        table1_11_Number: row.table1?.[11]?.Number,
        table1_11_availability247: row.table1?.[11]?.availability247,
        table1_11_onSiteAvailability: row.table1?.[11]?.onSiteAvailability,
        table1_11_onCallAvailability: row.table1?.[11]?.onCallAvailability,
        table1_12_Manpower: row.table1?.[12]?.Manpower,
        table1_12_Number: row.table1?.[12]?.Number,
        table1_12_availability247: row.table1?.[12]?.availability247,
        table1_12_onSiteAvailability: row.table1?.[12]?.onSiteAvailability,
        table1_12_onCallAvailability: row.table1?.[12]?.onCallAvailability,
        table1_13_Manpower: row.table1?.[13]?.Manpower,
        table1_13_Number: row.table1?.[13]?.Number,
        table1_13_availability247: row.table1?.[13]?.availability247,
        table1_13_onSiteAvailability: row.table1?.[13]?.onSiteAvailability,
        table1_13_onCallAvailability: row.table1?.[13]?.onCallAvailability,
        table1_14_Manpower: row.table1?.[14]?.Manpower,
        table1_14_Number: row.table1?.[14]?.Number,
        table1_14_availability247: row.table1?.[14]?.availability247,
        table1_14_onSiteAvailability: row.table1?.[14]?.onSiteAvailability,
        table1_14_onCallAvailability: row.table1?.[14]?.onCallAvailability,
        table1_15_Manpower: row.table1?.[15]?.Manpower,
        table1_15_Number: row.table1?.[15]?.Number,
        table1_15_availability247: row.table1?.[15]?.availability247,
        table1_15_onSiteAvailability: row.table1?.[15]?.onSiteAvailability,
        table1_15_onCallAvailability: row.table1?.[15]?.onCallAvailability,
        table1_16_Manpower: row.table1?.[16]?.Manpower != null ? "other" : "",
        table1_16_Manpower_other_specify: row.table1?.[16]?.Manpower,
        table1_16_Number: row.table1?.[16]?.Number,
        table1_16_availability247: row.table1?.[16]?.availability247,
        table1_16_onSiteAvailability: row.table1?.[16]?.onSiteAvailability,
        table1_16_onCallAvailability: row.table1?.[16]?.onCallAvailability,
        H2C2: row.H2C2,
        H2C3_0: row.H2C3?.[0],
        H2C3_1: row.H2C3?.[1],
        H2C3_2: row.H2C3?.[2],
        H2C3_3: row.H2C3?.[3],
        H2C3_4: row.H2C3?.[4],
        H2C3_5: row.H2C3?.[5],
        H2C3_6: row.H2C3?.[6],
        H2C3_7: row.H2C3?.[7],
        H2C3_8: row.H2C3?.[8],
        H2C3_9: row.H2C3?.[9],
        H2C3_10: row.H2C3?.[10],
        H2C3_11: row.H2C3?.[11],
        H2C3_12: row.H2C3?.[12] != null ? "other" : "",
        H2C3_13: row.H2C3?.[12],
        H2C4_0: row.H2C4?.split(":")?.[0],
        H2C4_1: row.H2C4?.split(":")?.[1],
        H2C5: row.H2C5,
        H2D1_0: row.H2D1?.[0],
        H2D1_1: row.H2D1?.[1],
        H2D1_2: row.H2D1?.[2],
        H2D1_3: row.H2D1?.[3],
        H2D1_4: row.H2D1?.[4],
        H2D1_5: row.H2D1?.[5],
        H2D1_6: row.H2D1?.[6],
        H2D1_7: row.H2D1?.[7],
        H2D1_8: row.H2D1?.[8],
        H2D1_9: row.H2D1?.[9],
        H2D1_10: row.H2D1?.[10],
        H2D1_11: row.H2D1?.[11],
        H2D1_12: row.H2D1?.[12],
        H2D1_13: row.H2D1?.[13],
        H2D1_14: row.H2D1?.[14],
        H2D1_15: row.H2D1?.[15],
        H2D1_16: row.H2D1?.[16],
        H2D1_17: row.H2D1?.[17],
        H2D1_18: row.H2D1?.[18],
        H2D1_19: row.H2D1?.[19],
        H2D1_20: row.H2D1?.[20],
        H2D1_21: row.H2D1?.[21],
        H2D1_22: row.H2D1?.[22],
        H2D1_23: row.H2D1?.[23],
        H2D1_24: row.H2D1?.[24],
        H2D1_25: row.H2D1?.[25],
        H2D1_26: row.H2D1?.[26],
        H2D1_27: row.H2D1?.[27],
        H2D1_28: row.H2D1?.[28],
        H2D2_0: row.H2D2?.[0],
        H2D2_1: row.H2D2?.[1],
        H2D2_2: row.H2D2?.[2],
        H2D2_3: row.H2D2?.[3],
        H2D2_4: row.H2D2?.[4],
        H2D2_5: row.H2D2?.[5],
        H2D2_6: row.H2D2?.[6],
        H2D2_7: row.H2D2?.[7],
        H2D2_8: row.H2D2?.[8],
        H2D2_9: row.H2D2?.[9],
        H2D2_10: row.H2D2?.[10],
        H2D2_11: row.H2D2?.[11],
        H2D2_12: row.H2D2?.[12],
        H2D2_13: row.H2D2?.[13],
        H2D2_14: row.H2D2?.[14],
        H2D2_15: row.H2D2?.[15],
        H2D2_16: row.H2D2?.[16],
        H2D2_17: row.H2D2?.[17],
        H2D2_18: row.H2D2?.[18],
        H2D2_19: row.H2D2?.[19],
        H2D2_20: row.H2D2?.[20],
        H2D2_21: row.H2D2?.[21],
        H2D2_22: row.H2D2?.[22],
        H2D2_23: row.H2D2?.[23],
        H2D2_24: row.H2D2?.[24],
        H2D2_25: row.H2D2?.[25],
        table2_Adult: row.table2?.[0]?.Adult,
        table2_Pediatric: row.table2?.[0]?.Pediatric,
        table2_Broughtdead: row.table2?.[0]?.Broughtdead,
        table2_Deathafterarrival: row.table2?.[0]?.Deathafterarrival,
        table2_MLC: row.table2?.[0]?.MLC,
        table3_0_Attended: row.table3?.[0].Attended,
        table3_0_Death: row.table3?.[0].Death,
        table3_1_Attended: row.table3?.[1].Attended,
        table3_1_Death: row.table3?.[1].Death,
        table3_2_Attended: row.table3?.[2].Attended,
        table3_2_Death: row.table3?.[2].Death,
        table3_3_Attended: row.table3?.[3].Attended,
        table3_3_Death: row.table3?.[3].Death,
        table3_4_Attended: row.table3?.[4].Attended,
        table3_4_Death: row.table3?.[4].Death,
        table3_5_Attended: row.table3?.[5].Attended,
        table3_5_Death: row.table3?.[5].Death,
        table3_6_Attended: row.table3?.[6].Attended,
        table3_6_Death: row.table3?.[6].Death,
        table3_7_Attended: row.table3?.[7].Attended,
        table3_7_Death: row.table3?.[7].Death,
        table3_8_Attended: row.table3?.[8].Attended,
        table3_8_Death: row.table3?.[8].Death,
        H2E3_0: row.H2E3?.[0],
        H2E3_1: row.H2E3?.[1],
        H2E3_2: row.H2E3?.[2],
        H2F1: row.H2F1,
        H2F2: row.H2F2,
        H2F3: row.H2F3,
        H2F4_0: row.H2F4?.[0],
        H2F4_1: row.H2F4?.[1],
        H2F4_2: row.H2F4?.[2],
        H2F4_3: row.H2F4?.[3],
        H2F4_4: row.H2F4?.[4],
        H2F4_5: row.H2F4?.[5],
        H2F5: row.H2F5,
        H2F6_0: row.H2F6?.[0],
        H2F6_1: row.H2F6?.[1],
        H2F6_2: row.H2F6?.[2],
        H2F6_3: row.H2F6?.[3],
        H2F7: row.H2F7,
        H2F8_0: row.H2F8?.split(":")?.[0],
        H2F8_1: row.H2F8?.split(":")?.[1],
        H2F9: row.H2F9,
        H2G1: row.H2G1,
        H2G2: row.H2G2,
        H2G3: row.H2G3,
        H2G4_0: row.H2G4?.[0],
        H2G4_1: row.H2G4?.[1],
        H2G4_2: row.H2G4?.[2] != null ? "other" : "",
        H2G4_3: row.H2G4?.[2],
        H2G5: row.H2G5,
        H2G6: row.H2G6,
        H2H1: row.H2H1,
        H2H2: row.H2H2,
        H2H3: row.H2H3,
        H2H4_0: row.H2H4?.split(":")?.[0],
        H2H4_1: row.H2H4?.split(":")?.[1],
        H2H5: row.H2H5,
        H2H6: row.H2H6,
        H2H7: row.H2H7,
        H2H8_0: row.H2H8?.[0],
        H2H8_1: row.H2H8?.[1],
        H2H8_2: row.H2H8?.[2] != null ? "other" : "",
        H2H8_3: row.H2H8?.[2],
        H2H9: row.H2H9,
        H2I1_0: row.H2I1?.[0],
        H2I1_1: row.H2I1?.[1],
        H2I1_2: row.H2I1?.[2],
        H2I1_3: row.H2I1?.[3],
        H2I1_4: row.H2I1?.[4],
        H2I1_5: row.H2I1?.[5],
        H2I1_6: row.H2I1?.[6],
        H2I1_7: row.H2I1?.[7],
        H2I1_8: row.H2I1?.[8] != null ? "other" : "",
        H2I1_9: row.H2I1?.[8],
        H2I2_0: row.H2I2?.[0],
        H2I2_1: row.H2I2?.[1],
        H2I2_2: row.H2I2?.[2],
        H2I2_3: row.H2I2?.[3],
        H2I2_4: row.H2I2?.[4],
        table4_0_SOP: row.table4?.[0].SOP,
        table4_0_FollowsSOP: row.table4?.[0].FollowsSOP,
        table4_1_SOP: row.table4?.[1].SOP,
        table4_1_FollowsSOP: row.table4?.[1].FollowsSOP,
        table4_2_SOP: row.table4?.[2].SOP,
        table4_2_FollowsSOP: row.table4?.[2].FollowsSOP,
        table4_3_SOP: row.table4?.[3].SOP,
        table4_3_FollowsSOP: row.table4?.[3].FollowsSOP,
        table4_4_SOP: row.table4?.[4].SOP,
        table4_4_FollowsSOP: row.table4?.[4].FollowsSOP,
        table4_5_SOP: row.table4?.[5].SOP,
        table4_5_FollowsSOP: row.table4?.[5].FollowsSOP,
        table4_6_SOP: row.table4?.[6].SOP,
        table4_6_FollowsSOP: row.table4?.[6].FollowsSOP,
        table4_7_SOP: row.table4?.[7].SOP,
        table4_7_FollowsSOP: row.table4?.[7].FollowsSOP,
        table4_8_SOP: row.table4?.[8].SOP,
        table4_8_FollowsSOP: row.table4?.[8].FollowsSOP,
        H2I4: row.H2I4,
        H2J1: row.H2J1,
        H2J2: row.H2J2,
      }));
    };

    const transformedData = transformDataForCSV(data);

    const csvStringifier = createObjectCsvStringifier({
      header: [
        {
          id: "id",
          title: "Record ID",
        },
        { id: "H2A1", title: "2A.1 : Assessor's Name:" },
        { id: "date", title: "Date:" },
        { id: "H2A2", title: "2A.2 : State:" },
        { id: "H2A3", title: "2A.3 : Block Name:" },
        { id: "H2A4", title: "2A.4 : Healthcare Facility Name" },
        { id: "H2A5", title: "2A.5 : Healthcare Facility Address" },
        { id: "H2A6", title: "2A.6 : Name of the MOIC" },
        { id: "H2A7", title: "2A.7 : Contact Number of MOIC" },
        { id: "H2A8", title: "2A.8 : Email ID:" },
        { id: "H2A9_0", title: "2A.9 : GPS_1" },
        { id: "H2A9_1", title: "2A.9 : GPS_2" },
        { id: "H2A10", title: "2A.10 : What type of CHC is this?" },
        { id: "H2A11", title: "2A.11 : Type of locality" },
        { id: "H2B1", title: "2B.1 Is the CHC 24/7?" },
        {
          id: "H2B2",
          title:
            "2B.2 How many beds are available for the in-patient department (IPD)?",
        },
        {
          id: "H2B3",
          title: "2B.3 Is there any dedicated bed present for emergency care?",
        },
        {
          id: "H2B4",
          title: "2B.4 How many beds are available for emergency care?",
        },
        {
          id: "H2B5",
          title:
            "2B.5 What is the average number of patients presenting to OPD per month?",
        },
        {
          id: "H2B6",
          title:
            "2B.6 What is the average daily number of patients presenting with emergency conditions daily? (Chest pain, stroke, acute weakness, acute blindness, Shortness of breath, altered mentation, snake bite, bites, road traffic accident, injuries ,poisoning, deliberate self-harm, infectious diseases, fever, pregnancy related, seizure, acute abdomen, anaphylaxis, cerebro-meningeal infections, foreign body, acute pulmonary disease, Shock, accidental injuries, infections)",
        },
        {
          id: "H2B7_0",
          title:
            "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Emergency Registration Counter)",
        },
        {
          id: "H2B7_1",
          title:
            "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Computerized Registration)",
        },
        {
          id: "H2B7_2",
          title:
            "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Triage Area)",
        },
        {
          id: "H2B7_3",
          title:
            "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Resuscitation Area)",
        },
        {
          id: "H2B7_4",
          title:
            "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Decontamination Facility)",
        },
        {
          id: "H2B7_5",
          title:
            "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Security Services)",
        },
        {
          id: "H2B7_6",
          title:
            "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Designated Parking Area for Ambulance)",
        },
        {
          id: "H2B7_7",
          title:
            "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Smooth Entry for Wheelchair Trolley and Stretcher Bay)",
        },
        {
          id: "H2B7_8",
          title:
            "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Waiting Area for patients & Attendants.)",
        },
        {
          id: "H2B7_9",
          title:
            "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Plaster Room/Suturing Room/Minor OT)",
        },
        {
          id: "H2B7_10",
          title:
            "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Emergency OT)",
        },
        {
          id: "H2B7_11",
          title:
            "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Dedicated Isolation rooms)",
        },
        {
          id: "H2B7_12",
          title:
            "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Point of Care Lab)",
        },
        {
          id: "H2B7_13",
          title:
            "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Blood storage unit)",
        },
        {
          id: "H2B7_14",
          title:
            "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice= Point of care ultrasound)",
        },
        {
          id: "H2B7_15",
          title:
            "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Radiology service-X ray , Ultrasound.)",
        },
        {
          id: "H2B7_16",
          title:
            "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Demarcated Duty Rooms for Doctors and Nurses)",
        },
        {
          id: "H2B7_17",
          title:
            "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Area to Keep Dead Bodies)",
        },
        {
          id: "H2B7_18",
          title:
            "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible)(Tele-Medicine Facility)",
        },
        {
          id: "H2B8_0",
          title:
            "2B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments? (choice=Services Provided to the patients are clearly defined, displayed prominrntly.)",
        },
        {
          id: "H2B8_1",
          title:
            "2B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments? (choice=Name of doctor and nursing staff on duty are displayed and updates.)",
        },
        {
          id: "H2B8_2",
          title:
            "2B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments? (choice=List of available drugs are displayed.)",
        },
        {
          id: "H2B8_3",
          title:
            "2B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments? (choice=All the relevant information is displayed for the patients and visitors including user charges wherever applicable at the time of procedure/ investigation/admission.)",
        },
        {
          id: "H2B8_4",
          title:
            "2B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments? (choice=Important contact numbers including ambulance, blood bank, police and referral centers displayed..)",
        },
        {
          id: "H2B8_5",
          title:
            "2B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments? (choice=Display of citizen's charter.)",
        },
        {
          id: "H2B8_6",
          title:
            "2B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments? (choice=other)",
        },
        {
          id: "H2B8_7",
          title:
            "2B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments? (Other Specify)",
        },
        {
          id: "H2B9",
          title: "2B.9 Does the hospital provide ambulance services?",
        },
        {
          id: "H2B10",
          title:
            "2B.10 : If ambulances are not there, how are patients transferred?",
        },
        {
          id: "table1_0_Manpower",
          title:
            "2C.1 : Which of the following manpower is available at the CHC? (Physician/Family Medicine Specialist)(Manpower)",
        },
        {
          id: "table1_0_Number",
          title:
            "2C.1 : Which of the following manpower is available at the CHC? (Physician/Family Medicine Specialist) (Number)",
        },
        {
          id: "table1_0_availability247",
          title:
            "2C.1 : Which of the following manpower is available at the CHC? (Physician/Family Medicine Specialist) (availability24 X 7)",
        },
        {
          id: "table1_0_onSiteAvailability",
          title:
            "2C.1 : Which of the following manpower is available at the CHC? (Physician/Family Medicine Specialist) (onSiteAvailability)",
        },
        {
          id: "table1_0_onCallAvailability",
          title:
            "2C.1 : Which of the following manpower is available at the CHC? (Physician/Family Medicine Specialist) (onCallAvailability)",
        },
        {
          id: "table1_1_Manpower",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Surgeon) (Manpower)",
        },
        {
          id: "table1_1_Number",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Surgeon) (Number)",
        },
        {
          id: "table1_1_availability247",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Surgeon) (availability24 X 7)",
        },
        {
          id: "table1_1_onSiteAvailability",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Surgeon) (onSiteAvailability)",
        },
        {
          id: "table1_1_onCallAvailability",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Surgeon) (onCallAvailability)",
        },
        {
          id: "table1_2_Manpower",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Obsterician & Gynecologist) (Manpower)",
        },
        {
          id: "table1_2_Number",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Obsterician & Gynecologist) (Number)",
        },
        {
          id: "table1_2_availability247",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Obsterician & Gynecologist) (availability24 X 7)",
        },
        {
          id: "table1_2_onSiteAvailability",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Obsterician & Gynecologist) (onSiteAvailability)",
        },
        {
          id: "table1_2_onCallAvailability",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Obsterician & Gynecologist) (onCallAvailability)",
        },
        {
          id: "table1_3_Manpower",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Pediatrician) (Manpower)",
        },
        {
          id: "table1_3_Number",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Pediatrician) (Number)",
        },
        {
          id: "table1_3_availability247",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Pediatrician) (availability24 X 7)",
        },
        {
          id: "table1_3_onSiteAvailability",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Pediatrician) (onSiteAvailability)",
        },
        {
          id: "table1_3_onCallAvailability",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Pediatrician) (onCallAvailability)",
        },
        {
          id: "table1_4_Manpower",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Anesthesiologist) (Manpower)",
        },
        {
          id: "table1_4_Number",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Anesthesiologist) (Number)",
        },
        {
          id: "table1_4_availability247",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Anesthesiologist) (availability24 X 7)",
        },
        {
          id: "table1_4_onSiteAvailability",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Anesthesiologist) (onSiteAvailability)",
        },
        {
          id: "table1_4_onCallAvailability",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Anesthesiologist) (onCallAvailability)",
        },
        {
          id: "table1_5_Manpower",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Ophthalmologist) (Manpower)",
        },
        {
          id: "table1_5_Number",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Ophthalmologist) (Number)",
        },
        {
          id: "table1_5_availability247",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Ophthalmologist) (availability24 X 7)",
        },
        {
          id: "table1_5_onSiteAvailability",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Ophthalmologist) (onSiteAvailability)",
        },
        {
          id: "table1_5_onCallAvailability",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Ophthalmologist) (onCallAvailability)",
        },
        {
          id: "table1_6_Manpower",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Orthopaedician) (Manpower)",
        },
        {
          id: "table1_6_Number",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Orthopaedician) (Number)",
        },
        {
          id: "table1_6_availability247",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Orthopaedician) (availability24 X 7)",
        },
        {
          id: "table1_6_onSiteAvailability",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Orthopaedician) (onSiteAvailability)",
        },
        {
          id: "table1_6_onCallAvailability",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Orthopaedician) (onCallAvailability)",
        },
        {
          id: "table1_7_Manpower",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (ENT) (Manpower)",
        },
        {
          id: "table1_7_Number",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (ENT) (Number)",
        },
        {
          id: "table1_7_availability247",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (ENT) (availability24 X 7)",
        },
        {
          id: "table1_7_onSiteAvailability",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (ENT) (onSiteAvailability)",
        },
        {
          id: "table1_7_onCallAvailability",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (ENT) (onCallAvailability)",
        },
        {
          id: "table1_8_Manpower",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Microbiologist/Pathologist/Biochemist) (Manpower)",
        },
        {
          id: "table1_8_Number",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Microbiologist/Pathologist/Biochemist) (Number)",
        },
        {
          id: "table1_8_availability247",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Microbiologist/Pathologist/Biochemist) (availability24 X 7)",
        },
        {
          id: "table1_8_onSiteAvailability",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Microbiologist/Pathologist/Biochemist) (onSiteAvailability)",
        },
        {
          id: "table1_8_onCallAvailability",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Microbiologist/Pathologist/Biochemist) (onCallAvailability)",
        },
        {
          id: "table1_9_Manpower",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (GDMO) (Manpower)",
        },
        {
          id: "table1_9_Number",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (GDMO) (Number)",
        },
        {
          id: "table1_9_availability247",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (GDMO) (availability24 X 7)",
        },
        {
          id: "table1_9_onSiteAvailability",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (GDMO) (onSiteAvailability)",
        },
        {
          id: "table1_9_onCallAvailability",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (GDMO) (onCallAvailability)",
        },
        {
          id: "table1_10_Manpower",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Nurses) (Manpower)",
        },
        {
          id: "table1_10_Number",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Nurses) (Number)",
        },
        {
          id: "table1_10_availability247",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Nurses) (availability24 X 7)",
        },
        {
          id: "table1_10_onSiteAvailability",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Nurses) (onSiteAvailability)",
        },
        {
          id: "table1_10_onCallAvailability",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Nurses) (onCallAvailability)",
        },
        {
          id: "table1_11_Manpower",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Data entry operator) (Manpower)",
        },
        {
          id: "table1_11_Number",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Data entry operator) (Number)",
        },
        {
          id: "table1_11_availability247",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Data entry operator) (availability24 X 7)",
        },
        {
          id: "table1_11_onSiteAvailability",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Data entry operator) (onSiteAvailability)",
        },
        {
          id: "table1_11_onCallAvailability",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Data entry operator) (onCallAvailability)",
        },
        {
          id: "table1_12_Manpower",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (ECG technician) (Manpower)",
        },
        {
          id: "table1_12_Number",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (ECG technician) (Number)",
        },
        {
          id: "table1_12_availability247",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (ECG technician) (availability24 X 7)",
        },
        {
          id: "table1_12_onSiteAvailability",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (ECG technician) (onSiteAvailability)",
        },
        {
          id: "table1_12_onCallAvailability",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (ECG technivian) (onCallAvailability)",
        },
        {
          id: "table1_13_Manpower",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (MLT) (Manpower)",
        },
        {
          id: "table1_13_Number",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (MLT) (Number)",
        },
        {
          id: "table1_13_availability247",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (MLT) (availability24 X 7)",
        },
        {
          id: "table1_13_onSiteAvailability",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (MLT) (onSiteAvailability)",
        },
        {
          id: "table1_13_onCallAvailability",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (MLT) (onCallAvailability)",
        },
        {
          id: "table1_14_Manpower",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Pharmacist) (Manpower)",
        },
        {
          id: "table1_14_Number",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Pharmacist) (Number)",
        },
        {
          id: "table1_14_availability247",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Pharmacist) (availability24 X 7)",
        },
        {
          id: "table1_14_onSiteAvailability",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Pharmacist) (onSiteAvailability)",
        },
        {
          id: "table1_14_onCallAvailability",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Pharmacist) (onCallAvailability)",
        },
        {
          id: "table1_15_Manpower",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Radiology technician) (Manpower)",
        },
        {
          id: "table1_15_Number",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Radiology technician) (Number)",
        },
        {
          id: "table1_15_availability247",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Radiology technician) (availability24 X 7)",
        },
        {
          id: "table1_15_onSiteAvailability",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Radiology technician) (onSiteAvailability)",
        },
        {
          id: "table1_15_onCallAvailability",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Radiology technician) (onCallAvailability)",
        },
        {
          id: "table1_16_Manpower",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Others) (Manpower)",
        },
        {
          id: "table1_16_Manpower(other specify)",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Others Specify) (Manpower)",
        },
        {
          id: "table1_16_availability247",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Others) (Number)",
        },
        {
          id: "table1_16_onSiteAvailability",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Others) (availability24 X 7)",
        },
        {
          id: "table1_16_onCallAvailability",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Others) (onSiteAvailability)",
        },
        {
          id: "H2C2",
          title:
            "2C.1 Tick the manpower available in your emergency department and provide (Others) (onCallAvailability)",
        },
        {
          id: "H2C2",
          title:
            "2C.2 Whether training for emergency care management is being conducted for the staff in the institution?",
        },
        {
          id: "H2C3_0",
          title:
            "2C.3 Which of the following emergency care trainings you have undergone? (choice = Trauma & Accidental Injuries)",
        },
        {
          id: "H2C3_1",
          title:
            "2C.3 Which of the following emergency care trainings you have undergone? (choice = Burns)",
        },
        {
          id: "H2C3_2",
          title:
            "2C.3 Which of the following emergency care trainings you have undergone? (choice = Cardiac emergencies: acute chest pain, acute coronary syndrome (ACS)/ STEMI, Heart failure, Cardiac Arrest)",
        },
        {
          id: "H2C3_3",
          title:
            "2C.3 Which of the following emergency care trainings you have undergone? (choice = Stroke)",
        },
        {
          id: "H2C3_4",
          title:
            "2C.3 Which of the following emergency care trainings you have undergone? (choice = Acute Breathlessness)",
        },
        {
          id: "H2C3_5",
          title:
            "2C.3 Which of the following emergency care trainings you have undergone? (choice = Seizures)",
        },
        {
          id: "H2C3_6",
          title:
            "2C.3 Which of the following emergency care trainings you have undergone? (choice = Bites (Animal bite/snake bite/scorpion sting))",
        },
        {
          id: "H2C3_7",
          title:
            "2C.3 Which of the following emergency care trainings you have undergone? (choice = Choking/foreign body ingestion)",
        },
        {
          id: "H2C3_8",
          title:
            "2C.3 Which of the following emergency care trainings you have undergone? (choice = Poisoning)",
        },
        {
          id: "H2C3_9",
          title:
            "2C.3 Which of the following emergency care trainings you have undergone? (choice = PPH)",
        },
        {
          id: "H2C3_10",
          title:
            "2C.3 Which of the following emergency care trainings you have undergone? (choice = Pre-Eclampsia)",
        },
        {
          id: "H2C3_11",
          title:
            "2C.3 Which of the following emergency care trainings you have undergone? (choice = Neonatal emergencies)",
        },
        {
          id: "H2C3_12",
          title:
            "2C.3 Which of the following emergency care trainings you have undergone? (choice = Other)",
        },
        {
          id: "H2C3_13",
          title:
            "2C.3 Which of the following emergency care trainings you have undergone? (Other Specify)",
        },
        {
          id: "H2C4_0",
          title: "2C.4  Frequency of training on emergency care in a year?",
        },
        {
          id: "H2C4_1",
          title:
            "2C.4  Frequency of training on emergency care in a year? (other specify)",
        },
        { id: "H2C5", title: "2C.5 When was the last training conducted?" },
        {
          id: "H2D1_0",
          title:
            "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Oxygen medicinal gas)",
        },
        {
          id: "H2D1_1",
          title:
            "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Atropine)",
        },
        {
          id: "H2D1_2",
          title:
            "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Diazepam/Lorazepam)",
        },
        {
          id: "H2D1_3",
          title:
            "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Adrenaline)",
        },
        {
          id: "H2D1_4",
          title:
            "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Charcoal activated)",
        },
        {
          id: "H2D1_5",
          title:
            "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Antisnake venom)",
        },
        {
          id: "H2D1_6",
          title:
            "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Pralidoxime (PAM))",
        },
        {
          id: "H2D1_7",
          title:
            "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Magnesium sulphate)",
        },
        {
          id: "H2D1_8",
          title:
            "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Tetanus immunoglobulin)",
        },
        {
          id: "H2D1_9",
          title:
            "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Neostigmine)",
        },
        {
          id: "H2D1_10",
          title:
            "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Aspirin)",
        },
        {
          id: "H2D1_11",
          title:
            "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Clopidogrel)",
        },
        {
          id: "H2D1_12",
          title:
            "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Atorvastatin)",
        },
        {
          id: "H2D1_13",
          title:
            "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Misoprostol)",
        },
        {
          id: "H2D1_14",
          title:
            "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Labetalol IV)",
        },
        {
          id: "H2D1_15",
          title:
            "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Phenobarbitone)",
        },
        {
          id: "H2D1_16",
          title:
            "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Phenytoin (inj))",
        },
        {
          id: "H2D1_17",
          title:
            "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Plasma volume expander)",
        },
        {
          id: "H2D1_18",
          title:
            "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = 3% Saline)",
        },
        {
          id: "H2D1_19",
          title:
            "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Dobutamine)",
        },
        {
          id: "H2D1_20",
          title:
            "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Streptokinase)",
        },
        {
          id: "H2D1_21",
          title:
            "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Tenecteplase)",
        },
        {
          id: "H2D1_22",
          title:
            "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Oxytocin)",
        },
        {
          id: "H2D1_23",
          title:
            "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Salbutamol sulphate)",
        },
        {
          id: "H2D1_24",
          title:
            "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Glucose/ 25 % dextrose)",
        },
        {
          id: "H2D1_25",
          title:
            "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Tranexamic acid)",
        },
        {
          id: "H2D1_26",
          title:
            "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = tPA IV)",
        },
        {
          id: "H2D1_27",
          title:
            "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Methergine)",
        },
        {
          id: "H2D1_28",
          title:
            "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Carboprost)",
        },
        {
          id: "H2D2_0",
          title:
            "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Mobile bed for Resuscitation)",
        },
        {
          id: "H2D2_1",
          title:
            "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Crash Cart (specialized cart for resuscitation))",
        },
        {
          id: "H2D2_2",
          title:
            "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Hard Cervical Collar)",
        },
        {
          id: "H2D2_3",
          title:
            "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Oxygen Cylinder/Central Oxygen Supply)",
        },
        {
          id: "H2D2_4",
          title:
            "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Suction Machine)",
        },
        {
          id: "H2D2_5",
          title:
            "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Multipara Monitor (To monitor Heart rate, BP, SPO2[Essential] ECG, Respiration Rate [Desirable] etc))",
        },
        {
          id: "H2D2_6",
          title:
            "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Defibrillator with or without external pacer)",
        },
        {
          id: "H2D2_7",
          title:
            "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Toothed Forceps, Kocher Forceps, Magill's forceps, Artery forceps)",
        },
        {
          id: "H2D2_8",
          title:
            "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = AMBU Bag for adult and Paediatric)",
        },
        {
          id: "H2D2_9",
          title:
            "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Basic airway equipment like oropharyngeal nasopharyngeal airway, LMA for adult and pediatric)",
        },
        {
          id: "H2D2_10",
          title:
            "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Advanced laryngoscope and endotracheal tube or other similar device)",
        },
        {
          id: "H2D2_11",
          title:
            "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Tourniquet)",
        },
        {
          id: "H2D2_12",
          title:
            "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Pelvic binder or bed sheets with clips)",
        },
        {
          id: "H2D2_13",
          title:
            "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Laryngoscope with all sized blades)",
        },
        {
          id: "H2D2_14",
          title:
            "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Endotracheal Tubes of all sizes)",
        },
        {
          id: "H2D2_15",
          title:
            "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Laryngeal Mask Airway (LMA))",
        },
        {
          id: "H2D2_16",
          title:
            "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Chest Tubes with Water seal drain)",
        },
        {
          id: "H2D2_17",
          title:
            "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = ECG Machine)",
        },
        {
          id: "H2D2_18",
          title:
            "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Nebulizer)",
        },
        {
          id: "H2D2_19",
          title:
            "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Fluid Warmer)",
        },
        {
          id: "H2D2_20",
          title:
            "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Infusion pump and Syringe Drivers)",
        },
        {
          id: "H2D2_21",
          title:
            "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Spine board with sling and scotch tapes)",
        },
        {
          id: "H2D2_22",
          title:
            "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Splints for all types of fracture)",
        },
        {
          id: "H2D2_23",
          title:
            "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Non-invasive Ventilators)",
        },
        {
          id: "H2D2_24",
          title:
            "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Invasive Ventilators)",
        },
        {
          id: "H2D2_25",
          title:
            "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Incubators)",
        },
        {
          id: "table2_Adult",
          title:
            "2E.1 : Numbers of Patients who Visited ED in Last One Month (Adult (> 18Years))",
        },
        {
          id: "table2_Pediatric",
          title:
            "2E.1 : Numbers of Patients who Visited ED in Last One Month (Pediatric)",
        },
        {
          id: "table2_Broughtdead",
          title:
            "2E.1 : Numbers of Patients who Visited ED in Last One Month (Brought dead)",
        },
        {
          id: "table2_Deathafterarrival",
          title:
            "2E.1 : Numbers of Patients who Visited ED in Last One Month (Death after arrival)",
        },
        {
          id: "table2_MLC",
          title:
            "2E.1 : Numbers of Patients who Visited ED in Last One Month (MLC)",
        },
        {
          id: "table3_0_Attended",
          title:
            "2E.2 : Numbers of Patients who Visited ED in Last One Month (MI - Attended)",
        },
        {
          id: "table3_0_Death",
          title:
            "2E.2 : Numbers of Patients who Visited ED in Last One Month (MI - Death)",
        },
        {
          id: "table3_1_Attended",
          title:
            "2E.2 : Numbers of Patients who Visited ED in Last One Month (Stroke - Attended)",
        },
        {
          id: "table3_1_Death",
          title:
            "2E.2 : Numbers of Patients who Visited ED in Last One Month (Strok - Death)",
        },
        {
          id: "table3_2_Attended",
          title:
            "2E.2 : Numbers of Patients who Visited ED in Last One Month (Trauma & Burns - Attended)",
        },
        {
          id: "table3_2_Death",
          title:
            "2E.2 : Numbers of Patients who Visited ED in Last One Month (Trauma & Burn - Death)",
        },
        {
          id: "table3_3_Attended",
          title:
            "2E.2 : Numbers of Patients who Visited ED in Last One Month (Poisoning - Attended)",
        },
        {
          id: "table3_3_Death",
          title:
            "2E.2 : Numbers of Patients who Visited ED in Last One Month (Poisoning - Death)",
        },
        {
          id: "table3_4_Attended",
          title:
            "2E.2 : Numbers of Patients who Visited ED in Last One Month (Snake Bite - Attended)",
        },
        {
          id: "table3_4_Death",
          title:
            "2E.2 : Numbers of Patients who Visited ED in Last One Month (Snake Bit - Death)",
        },
        {
          id: "table3_5_Attended",
          title:
            "2E.2 : Numbers of Patients who Visited ED in Last One Month (Maternal Emergencies-PPH - Attended)",
        },
        {
          id: "table3_5_Death",
          title:
            "2E.2 : Numbers of Patients who Visited ED in Last One Month (Maternal Emergencies-PPH - Death)",
        },
        {
          id: "table3_6_Attended",
          title:
            "2E.2 : Numbers of Patients who Visited ED in Last One Month (Maternal Emergencies-Eclampsia - Attended)",
        },
        {
          id: "table3_6_Death",
          title:
            "2E.2 : Numbers of Patients who Visited ED in Last One Month (Maternal Emergencies-Eclampsia - Death)",
        },
        {
          id: "table3_7_Attended",
          title:
            "2E.2 : Numbers of Patients who Visited ED in Last One Month (Neontal Emergencies - Attended)",
        },
        {
          id: "table3_7_Death",
          title:
            "2E.2 : Numbers of Patients who Visited ED in Last One Month (Neontal Emergencies - Death)",
        },
        {
          id: "table3_8_Attended",
          title:
            "2E.2 : Numbers of Patients who Visited ED in Last One Month (Acute Respiratory Illness - Attended)",
        },
        {
          id: "table3_8_Death",
          title:
            "2E.2 : Numbers of Patients who Visited ED in Last One Month (Acute Respiratory Illnes - Death)",
        },
        {
          id: "H2E3_0",
          title:
            "2E.3 Which of the following emergency services are delivered at the CHC? (Multiple answers possible) (choice=Triage)",
        },
        {
          id: "H2E3_1",
          title:
            "2E.3 Which of the following emergency services are delivered at the CHC? (Multiple answers possible) (choice=Resuscitation)",
        },
        {
          id: "H2E3_2",
          title:
            "2E.3 Which of the following emergency services are delivered at the CHC? (Multiple answers possible) (choice=Medico-legal Reporting)",
        },
        {
          id: "H2F1",
          title:
            "2F.1 Does the facility have a Hospital Management Information System (HMIS)",
        },
        {
          id: "H2F2",
          title:
            "2F.2 Does this facility do complete reporting of indicators on emergency care in HMIS?",
        },
        {
          id: "H2F3",
          title:
            "2F.3 How many personnel available for managing information system?",
        },
        {
          id: "H2F4_0",
          title:
            "2F.4 What key indicators are generated from the emergency management information system? (choice=Numbers by type of emergencies)",
        },
        {
          id: "H2F4_1",
          title:
            "2F.4 What key indicators are generated from the emergency management information system? (choice=Length of hospital stay)",
        },
        {
          id: "H2F4_2",
          title:
            "2F.4 What key indicators are generated from the emergency management information system? (choice=Turn around time)",
        },
        {
          id: "H2F4_3",
          title:
            "2F.4 What key indicators are generated from the emergency management information system? (choice=Disposal time)",
        },
        {
          id: "H2F4_4",
          title:
            "2F.4 What key indicators are generated from the emergency management information system? (choice=Number of deaths)",
        },
        {
          id: "H2F4_5",
          title:
            "2F.4 What key indicators are generated from the emergency management information system? (choice=Number of Referrals)",
        },
        {
          id: "H2F5",
          title:
            "2F.5 Whether time bound management of common emergencies is captured in MIS.",
        },
        {
          id: "H2F6_0",
          title:
            "2F.6 Which of the following alet systems does your facility have? (choice = Code blue alert system)",
        },
        {
          id: "H2F6_1",
          title:
            "2F.6 Which of the following alet systems does your facility have? (choice = STEMI alert system)",
        },
        {
          id: "H2F6_2",
          title:
            "2F.6 Which of the following alet systems does your facility have? (choice = Stroke alert system)",
        },
        {
          id: "H2F6_3",
          title:
            "2F.6 Which of the following alet systems does your facility have? (choice = Trauma alert system)",
        },
        {
          id: "H2F7",
          title:
            "2F.7 Whether Medical Officer In charge (MO/IC) uses or reviews the data for quality improvement",
        },
        {
          id: "H2F8_0",
          title:
            "2F.8 Do you get Pre-Hospital Notification during an emergency?",
        },
        {
          id: "H2F8_1",
          title:
            "2F.8 Do you get Pre-Hospital Notification during an emergency?(if yes, How often per week)",
        },
        {
          id: "H2F9",
          title: "2F.9 Infrastructure for receiving external communication?",
        },
        {
          id: "H2G1",
          title: "2G.1 Whether any untied fund is available at your hospital?",
        },
        {
          id: "H2G2",
          title:
            "2G.2 If Yes, whether this fund is utilized for providing emergency care services?",
        },
        {
          id: "H2G3",
          title: "2G.3 Whether any fund is available for emergency care?",
        },
        {
          id: "H2G4_0",
          title:
            "2G.4 If funds are available, which health protection schemes are covering your emergency care system? (choice = PMJAY)",
        },
        {
          id: "H2G4_1",
          title:
            "2G.4 If funds are available, which health protection schemes are covering your emergency care system? (choice = RKS)",
        },
        {
          id: "H2G4_2",
          title:
            "2G.4 If funds are available, which health protection schemes are covering your emergency care system? (choice = other)",
        },
        {
          id: "H2G4_3",
          title:
            "2G.4 If funds are available, which health protection schemes are covering your emergency care system? (Other specify)",
        },
        {
          id: "H2G5",
          title:
            "2G.5 Out of total patients being provided emergency care, how many were provided services under PMJAY scheme/ any other insurance scheme.",
        },
        {
          id: "H2G6",
          title:
            "2G.6 Is the facility providing free emergency services to pregnant women, mothers, and neonates as per prevalent government schemes?",
        },
        {
          id: "H2H1",
          title: "2H.1.1 Do you have any disaster management plans?",
        },
        { id: "H2H2", title: "2H.1.2 Do you have a redistribution plan?" },
        { id: "H2H3", title: "2H.1.3 Do you have any evacuation plan?" },
        {
          id: "H2H4_0",
          title: "2H.2.1 Do you have a Quality Improvement Committee?",
        },
        {
          id: "H2H4_1",
          title:
            "2H.2.1 Do you have a Quality Improvement Committee?( if yes, collect detail of Committee)",
        },
        {
          id: "H2H5",
          title: "2H.2.2 How frequently does this committee meet in a year?",
        },
        {
          id: "H2H6",
          title:
            "2H.2.3 Do you have regular audits related to emergency care in this facility?",
        },
        {
          id: "H2H7",
          title:
            "2H.2.4 How frequently emergency care audits are conducted in a year?",
        },
        {
          id: "H2H8_0",
          title: "2H.2.5 Types of audits conducted? (choice = Mortality Audit)",
        },
        {
          id: "H2H8_1",
          title: "2H.2.5 Types of audits conducted? (choice = Morbidity Audit)",
        },
        {
          id: "H2H8_2",
          title: "2H.2.5 Types of audits conducted? (choice = other)",
        },
        {
          id: "H2H8_3",
          title: "2H.2.5 Types of audits conducted? (Other Specify)",
        },
        {
          id: "H2H9",
          title:
            "2H.2.6 Any action being taken on Audit report in the last one year?",
        },
        {
          id: "H2I1_0",
          title:
            "2I.1 What types of registers are maintained at the CHC? (Multiple answers possible) (choice=OPD/Treatment Register)",
        },
        {
          id: "H2I1_1",
          title:
            "2I.1 What types of registers are maintained at the CHC? (Multiple answers possible) (choice=Inventory Register)",
        },
        {
          id: "H2I1_2",
          title:
            "2I.1 What types of registers are maintained at the CHC? (Multiple answers possible) (choice=Procedure Register)",
        },
        {
          id: "H2I1_3",
          title:
            "2I.1 What types of registers are maintained at the CHC? (Multiple answers possible) (choice=Referral Register)",
        },
        {
          id: "H2I1_4",
          title:
            "2I.1 What types of registers are maintained at the CHC? (Multiple answers possible) (choice=Record for handing over and taking over of critical care equipment.)",
        },
        {
          id: "H2I1_5",
          title:
            "2I.1 What types of registers are maintained at the CHC? (Multiple answers possible) (choice=Medico-legal register)",
        },
        {
          id: "H2I1_6",
          title:
            "2I.1 What types of registers are maintained at the CHC? (Multiple answers possible) (choice=Death Register)",
        },
        {
          id: "H2I1_7",
          title:
            "2I.1 What types of registers are maintained at the CHC? (Multiple answers possible) (choice=Patient/Community feedback register)",
        },
        {
          id: "H2I1_8",
          title:
            "2I.1 What types of registers are maintained at the CHC? (Multiple answers possible) (choice=other)",
        },
        {
          id: "H2I1_9",
          title:
            "2I.1 What types of registers are maintained at the CHC? (Other specify)",
        },
        {
          id: "H2I2_0",
          title:
            "2I.2 Which of the following SOPs for the management of common medical emergencies are followed at your CHC? (Select all that apply) (choice=Documents triage guidelines and protocols)",
        },
        {
          id: "H2I2_1",
          title:
            "2I.2 Which of the following SOPs for the management of common medical emergencies are followed at your CHC? (Select all that apply) (choice=Standard treatment protocols for emergencies.)",
        },
        {
          id: "H2I2_2",
          title:
            "2I.2 Which of the following SOPs for the management of common medical emergencies are followed at your CHC? (Select all that apply) (choice=Transfer policies and procedures.)",
        },
        {
          id: "H2I2_3",
          title:
            "2I.2 Which of the following SOPs for the management of common medical emergencies are followed at your CHC? (Select all that apply) (choice=Disaster Management Plan.)",
        },
        {
          id: "H2I2_4",
          title:
            "2I.2 Which of the following SOPs for the management of common medical emergencies are followed at your CHC? (Select all that apply) (choice=Policies for handling cases opf death)",
        },
        {
          id: "table4_0_SOP",
          title:
            "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (MI - SOP/STW)",
        },
        {
          id: "table4_0_FollowsSOP",
          title:
            "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (MI - Follows SOP)",
        },
        {
          id: "table4_1_SOP",
          title:
            "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Stroke - SOP/STW)",
        },
        {
          id: "table4_1_FollowsSOP",
          title:
            "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Stroke - Follows SOP)",
        },
        {
          id: "table4_2_SOP",
          title:
            "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Trauma & Burns - SOP/STW)",
        },
        {
          id: "table4_2_FollowsSOP",
          title:
            "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Trauma & Burns - Follows SOP)",
        },
        {
          id: "table4_3_SOP",
          title:
            "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Poisoning - SOP/STW)",
        },
        {
          id: "table4_3_FollowsSOP",
          title:
            "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Poisoning - Follows SOP)",
        },
        {
          id: "table4_4_SOP",
          title:
            "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Snake Bites - SOP/STW)",
        },
        {
          id: "table4_4_FollowsSOP",
          title:
            "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Snake Bites - Follows SOP)",
        },
        {
          id: "table4_5_SOP",
          title:
            "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Maternal Emergencies-PPH - SOP/STW)",
        },
        {
          id: "table4_5_FollowsSOP",
          title:
            "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Maternal Emergencies-PPH - Follows SOP)",
        },
        {
          id: "table4_6_SOP",
          title:
            "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Maternal Emergencies-Eclampsia - SOP/STW)",
        },
        {
          id: "table4_6_FollowsSOP",
          title:
            "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Maternal Emergencies-Eclampsia - Follows SOP)",
        },
        {
          id: "table4_7_SOP",
          title:
            "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Neonatal Emergencies - SOP/STW)",
        },
        {
          id: "table4_7_FollowsSOP",
          title:
            "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Neonatal Emergencies - Follows SOP)",
        },
        {
          id: "table4_8_SOP",
          title:
            "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Acute Respiratory Illness - SOP/STW)",
        },
        {
          id: "table4_8_FollowsSOP",
          title:
            "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Acute Respiratory Illness - Follows SOP)",
        },
        {
          id: "H2I4",
          title:
            "2I.4 Does the facility have defined and established procedure for informing patients about their medical condition, involving them in treatment planning and facilitating informed decision making?",
        },
        {
          id: "H2J1",
          title:
            "2J.1 Does this facility have any policies and procedures which guide the transfer- out/referral of stable and unstable patients after stabilization to another facility with documentation?",
        },
        {
          id: "H2J2",
          title:
            "2J.2 Dose this facility have any policies and procedures which guide the transferout/referral of stable and unstable with documentation?",
        },
      ],
    });

    const csv =
      csvStringifier.getHeaderString() +
      csvStringifier.stringifyRecords(transformedData);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment;filename=HFAT-1.csv");
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating CSV file");
  }
};

export const HFAT2DownloadExcel = async (req, res) => {
  try {
    const data = await HFAT1.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("My Sheet");

    // Column Definitions: Defines the columns to be displayed.
    worksheet.columns = [
      {
        key: "id",
        header: "Record ID",
      },
      { key: "H2A1", header: "2A.1 : Assessor's Name:" },
      { key: "date", header: "Date:" },
      { key: "H2A2", header: "2A.2 : State:" },
      { key: "H2A3", header: "2A.3 : Block Name:" },
      { key: "H2A4", header: "2A.4 : Healthcare Facility Name" },
      { key: "H2A5", header: "2A.5 : Healthcare Facility Address" },
      { key: "H2A6", header: "2A.6 : Name of the MOIC" },
      { key: "H2A7", header: "2A.7 : Contact Number of MOIC" },
      { key: "H2A8", header: "2A.8 : Email key:" },
      { key: "H2A9_0", header: "2A.9 : GPS_1" },
      { key: "H2A9_1", header: "2A.9 : GPS_2" },
      { key: "H2A10", header: "2A.10 : What type of CHC is this?" },
      { key: "H2A11", header: "2A.11 : Type of locality" },
      { key: "H2B1", header: "2B.1 Is the CHC 24/7?" },
      {
        key: "H2B2",
        header:
          "2B.2 How many beds are available for the in-patient department (IPD)?",
      },
      {
        key: "H2B3",
        header: "2B.3 Is there any dedicated bed present for emergency care?",
      },
      {
        key: "H2B4",
        header: "2B.4 How many beds are available for emergency care?",
      },
      {
        key: "H2B5",
        header:
          "2B.5 What is the average number of patients presenting to OPD per month?",
      },
      {
        key: "H2B6",
        header:
          "2B.6 What is the average daily number of patients presenting with emergency conditions daily? (Chest pain, stroke, acute weakness, acute blindness, Shortness of breath, altered mentation, snake bite, bites, road traffic accident, injuries ,poisoning, deliberate self-harm, infectious diseases, fever, pregnancy related, seizure, acute abdomen, anaphylaxis, cerebro-meningeal infections, foreign body, acute pulmonary disease, Shock, accidental injuries, infections)",
      },
      {
        key: "H2B7_0",
        header:
          "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Emergency Registration Counter)",
      },
      {
        key: "H2B7_1",
        header:
          "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Computerized Registration)",
      },
      {
        key: "H2B7_2",
        header:
          "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Triage Area)",
      },
      {
        key: "H2B7_3",
        header:
          "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Resuscitation Area)",
      },
      {
        key: "H2B7_4",
        header:
          "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Decontamination Facility)",
      },
      {
        key: "H2B7_5",
        header:
          "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Security Services)",
      },
      {
        key: "H2B7_6",
        header:
          "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Designated Parking Area for Ambulance)",
      },
      {
        key: "H2B7_7",
        header:
          "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Smooth Entry for Wheelchair Trolley and Stretcher Bay)",
      },
      {
        key: "H2B7_8",
        header:
          "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Waiting Area for patients & Attendants.)",
      },
      {
        key: "H2B7_9",
        header:
          "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Plaster Room/Suturing Room/Minor OT)",
      },
      {
        key: "H2B7_10",
        header:
          "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Emergency OT)",
      },
      {
        key: "H2B7_11",
        header:
          "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Dedicated Isolation rooms)",
      },
      {
        key: "H2B7_12",
        header:
          "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Point of Care Lab)",
      },
      {
        key: "H2B7_13",
        header:
          "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Blood storage unit)",
      },
      {
        key: "H2B7_14",
        header:
          "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice= Point of care ultrasound)",
      },
      {
        key: "H2B7_15",
        header:
          "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Radiology service-X ray , Ultrasound.)",
      },
      {
        key: "H2B7_16",
        header:
          "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Demarcated Duty Rooms for Doctors and Nurses)",
      },
      {
        key: "H2B7_17",
        header:
          "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible) (choice=Area to Keep Dead Bodies)",
      },
      {
        key: "H2B7_18",
        header:
          "2B.7 Which of the following infrastructure requirements for emergency are available at the CHC? (Multiple answers possible)(Tele-Medicine Facility)",
      },
      {
        key: "H2B8_0",
        header:
          "2B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments? (choice=Services Provided to the patients are clearly defined, displayed prominrntly.)",
      },
      {
        key: "H2B8_1",
        header:
          "2B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments? (choice=Name of doctor and nursing staff on duty are displayed and updates.)",
      },
      {
        key: "H2B8_2",
        header:
          "2B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments? (choice=List of available drugs are displayed.)",
      },
      {
        key: "H2B8_3",
        header:
          "2B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments? (choice=All the relevant information is displayed for the patients and visitors including user charges wherever applicable at the time of procedure/ investigation/admission.)",
      },
      {
        key: "H2B8_4",
        header:
          "2B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments? (choice=Important contact numbers including ambulance, blood bank, police and referral centers displayed..)",
      },
      {
        key: "H2B8_5",
        header:
          "2B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments? (choice=Display of citizen's charter.)",
      },
      {
        key: "H2B8_6",
        header:
          "2B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments? (choice=other)",
      },
      {
        key: "H2B8_7",
        header:
          "2B.8 Which of these signage or display boards of the emergency services and entitlements available in its departments? (Other Specify)",
      },
      {
        key: "H2B9",
        header: "2B.9 Does the hospital provide ambulance services?",
      },
      {
        key: "H2B10",
        header:
          "2B.10 : If ambulances are not there, how are patients transferred?",
      },
      {
        key: "table1_0_Manpower",
        header:
          "2C.1 : Which of the following manpower is available at the CHC? (Physician/Family Medicine Specialist)(Manpower)",
      },
      {
        key: "table1_0_Number",
        header:
          "2C.1 : Which of the following manpower is available at the CHC? (Physician/Family Medicine Specialist) (Number)",
      },
      {
        key: "table1_0_availability247",
        header:
          "2C.1 : Which of the following manpower is available at the CHC? (Physician/Family Medicine Specialist) (availability24 X 7)",
      },
      {
        key: "table1_0_onSiteAvailability",
        header:
          "2C.1 : Which of the following manpower is available at the CHC? (Physician/Family Medicine Specialist) (onSiteAvailability)",
      },
      {
        key: "table1_0_onCallAvailability",
        header:
          "2C.1 : Which of the following manpower is available at the CHC? (Physician/Family Medicine Specialist) (onCallAvailability)",
      },
      {
        key: "table1_1_Manpower",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Surgeon) (Manpower)",
      },
      {
        key: "table1_1_Number",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Surgeon) (Number)",
      },
      {
        key: "table1_1_availability247",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Surgeon) (availability24 X 7)",
      },
      {
        key: "table1_1_onSiteAvailability",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Surgeon) (onSiteAvailability)",
      },
      {
        key: "table1_1_onCallAvailability",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Surgeon) (onCallAvailability)",
      },
      {
        key: "table1_2_Manpower",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Obsterician & Gynecologist) (Manpower)",
      },
      {
        key: "table1_2_Number",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Obsterician & Gynecologist) (Number)",
      },
      {
        key: "table1_2_availability247",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Obsterician & Gynecologist) (availability24 X 7)",
      },
      {
        key: "table1_2_onSiteAvailability",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Obsterician & Gynecologist) (onSiteAvailability)",
      },
      {
        key: "table1_2_onCallAvailability",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Obsterician & Gynecologist) (onCallAvailability)",
      },
      {
        key: "table1_3_Manpower",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Pediatrician) (Manpower)",
      },
      {
        key: "table1_3_Number",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Pediatrician) (Number)",
      },
      {
        key: "table1_3_availability247",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Pediatrician) (availability24 X 7)",
      },
      {
        key: "table1_3_onSiteAvailability",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Pediatrician) (onSiteAvailability)",
      },
      {
        key: "table1_3_onCallAvailability",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Pediatrician) (onCallAvailability)",
      },
      {
        key: "table1_4_Manpower",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Anesthesiologist) (Manpower)",
      },
      {
        key: "table1_4_Number",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Anesthesiologist) (Number)",
      },
      {
        key: "table1_4_availability247",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Anesthesiologist) (availability24 X 7)",
      },
      {
        key: "table1_4_onSiteAvailability",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Anesthesiologist) (onSiteAvailability)",
      },
      {
        key: "table1_4_onCallAvailability",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Anesthesiologist) (onCallAvailability)",
      },
      {
        key: "table1_5_Manpower",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Ophthalmologist) (Manpower)",
      },
      {
        key: "table1_5_Number",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Ophthalmologist) (Number)",
      },
      {
        key: "table1_5_availability247",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Ophthalmologist) (availability24 X 7)",
      },
      {
        key: "table1_5_onSiteAvailability",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Ophthalmologist) (onSiteAvailability)",
      },
      {
        key: "table1_5_onCallAvailability",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Ophthalmologist) (onCallAvailability)",
      },
      {
        key: "table1_6_Manpower",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Orthopaedician) (Manpower)",
      },
      {
        key: "table1_6_Number",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Orthopaedician) (Number)",
      },
      {
        key: "table1_6_availability247",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Orthopaedician) (availability24 X 7)",
      },
      {
        key: "table1_6_onSiteAvailability",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Orthopaedician) (onSiteAvailability)",
      },
      {
        key: "table1_6_onCallAvailability",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Orthopaedician) (onCallAvailability)",
      },
      {
        key: "table1_7_Manpower",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (ENT) (Manpower)",
      },
      {
        key: "table1_7_Number",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (ENT) (Number)",
      },
      {
        key: "table1_7_availability247",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (ENT) (availability24 X 7)",
      },
      {
        key: "table1_7_onSiteAvailability",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (ENT) (onSiteAvailability)",
      },
      {
        key: "table1_7_onCallAvailability",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (ENT) (onCallAvailability)",
      },
      {
        key: "table1_8_Manpower",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Microbiologist/Pathologist/Biochemist) (Manpower)",
      },
      {
        key: "table1_8_Number",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Microbiologist/Pathologist/Biochemist) (Number)",
      },
      {
        key: "table1_8_availability247",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Microbiologist/Pathologist/Biochemist) (availability24 X 7)",
      },
      {
        key: "table1_8_onSiteAvailability",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Microbiologist/Pathologist/Biochemist) (onSiteAvailability)",
      },
      {
        key: "table1_8_onCallAvailability",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Microbiologist/Pathologist/Biochemist) (onCallAvailability)",
      },
      {
        key: "table1_9_Manpower",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (GDMO) (Manpower)",
      },
      {
        key: "table1_9_Number",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (GDMO) (Number)",
      },
      {
        key: "table1_9_availability247",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (GDMO) (availability24 X 7)",
      },
      {
        key: "table1_9_onSiteAvailability",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (GDMO) (onSiteAvailability)",
      },
      {
        key: "table1_9_onCallAvailability",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (GDMO) (onCallAvailability)",
      },
      {
        key: "table1_10_Manpower",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Nurses) (Manpower)",
      },
      {
        key: "table1_10_Number",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Nurses) (Number)",
      },
      {
        key: "table1_10_availability247",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Nurses) (availability24 X 7)",
      },
      {
        key: "table1_10_onSiteAvailability",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Nurses) (onSiteAvailability)",
      },
      {
        key: "table1_10_onCallAvailability",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Nurses) (onCallAvailability)",
      },
      {
        key: "table1_11_Manpower",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Data entry operator) (Manpower)",
      },
      {
        key: "table1_11_Number",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Data entry operator) (Number)",
      },
      {
        key: "table1_11_availability247",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Data entry operator) (availability24 X 7)",
      },
      {
        key: "table1_11_onSiteAvailability",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Data entry operator) (onSiteAvailability)",
      },
      {
        key: "table1_11_onCallAvailability",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Data entry operator) (onCallAvailability)",
      },
      {
        key: "table1_12_Manpower",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (ECG technician) (Manpower)",
      },
      {
        key: "table1_12_Number",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (ECG technician) (Number)",
      },
      {
        key: "table1_12_availability247",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (ECG technician) (availability24 X 7)",
      },
      {
        key: "table1_12_onSiteAvailability",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (ECG technician) (onSiteAvailability)",
      },
      {
        key: "table1_12_onCallAvailability",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (ECG technivian) (onCallAvailability)",
      },
      {
        key: "table1_13_Manpower",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (MLT) (Manpower)",
      },
      {
        key: "table1_13_Number",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (MLT) (Number)",
      },
      {
        key: "table1_13_availability247",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (MLT) (availability24 X 7)",
      },
      {
        key: "table1_13_onSiteAvailability",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (MLT) (onSiteAvailability)",
      },
      {
        key: "table1_13_onCallAvailability",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (MLT) (onCallAvailability)",
      },
      {
        key: "table1_14_Manpower",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Pharmacist) (Manpower)",
      },
      {
        key: "table1_14_Number",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Pharmacist) (Number)",
      },
      {
        key: "table1_14_availability247",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Pharmacist) (availability24 X 7)",
      },
      {
        key: "table1_14_onSiteAvailability",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Pharmacist) (onSiteAvailability)",
      },
      {
        key: "table1_14_onCallAvailability",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Pharmacist) (onCallAvailability)",
      },
      {
        key: "table1_15_Manpower",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Radiology technician) (Manpower)",
      },
      {
        key: "table1_15_Number",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Radiology technician) (Number)",
      },
      {
        key: "table1_15_availability247",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Radiology technician) (availability24 X 7)",
      },
      {
        key: "table1_15_onSiteAvailability",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Radiology technician) (onSiteAvailability)",
      },
      {
        key: "table1_15_onCallAvailability",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Radiology technician) (onCallAvailability)",
      },
      {
        key: "table1_16_Manpower",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Others) (Manpower)",
      },
      {
        key: "table1_16_Manpower(other specify)",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Others Specify) (Manpower)",
      },
      {
        key: "table1_16_availability247",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Others) (Number)",
      },
      {
        key: "table1_16_onSiteAvailability",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Others) (availability24 X 7)",
      },
      {
        key: "table1_16_onCallAvailability",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Others) (onSiteAvailability)",
      },
      {
        key: "H2C2",
        header:
          "2C.1 Tick the manpower available in your emergency department and provide (Others) (onCallAvailability)",
      },
      {
        key: "H2C2",
        header:
          "2C.2 Whether training for emergency care management is being conducted for the staff in the institution?",
      },
      {
        key: "H2C3_0",
        header:
          "2C.3 Which of the following emergency care trainings you have undergone? (choice = Trauma & Accidental Injuries)",
      },
      {
        key: "H2C3_1",
        header:
          "2C.3 Which of the following emergency care trainings you have undergone? (choice = Burns)",
      },
      {
        key: "H2C3_2",
        header:
          "2C.3 Which of the following emergency care trainings you have undergone? (choice = Cardiac emergencies: acute chest pain, acute coronary syndrome (ACS)/ STEMI, Heart failure, Cardiac Arrest)",
      },
      {
        key: "H2C3_3",
        header:
          "2C.3 Which of the following emergency care trainings you have undergone? (choice = Stroke)",
      },
      {
        key: "H2C3_4",
        header:
          "2C.3 Which of the following emergency care trainings you have undergone? (choice = Acute Breathlessness)",
      },
      {
        key: "H2C3_5",
        header:
          "2C.3 Which of the following emergency care trainings you have undergone? (choice = Seizures)",
      },
      {
        key: "H2C3_6",
        header:
          "2C.3 Which of the following emergency care trainings you have undergone? (choice = Bites (Animal bite/snake bite/scorpion sting))",
      },
      {
        key: "H2C3_7",
        header:
          "2C.3 Which of the following emergency care trainings you have undergone? (choice = Choking/foreign body ingestion)",
      },
      {
        key: "H2C3_8",
        header:
          "2C.3 Which of the following emergency care trainings you have undergone? (choice = Poisoning)",
      },
      {
        key: "H2C3_9",
        header:
          "2C.3 Which of the following emergency care trainings you have undergone? (choice = PPH)",
      },
      {
        key: "H2C3_10",
        header:
          "2C.3 Which of the following emergency care trainings you have undergone? (choice = Pre-Eclampsia)",
      },
      {
        key: "H2C3_11",
        header:
          "2C.3 Which of the following emergency care trainings you have undergone? (choice = Neonatal emergencies)",
      },
      {
        key: "H2C3_12",
        header:
          "2C.3 Which of the following emergency care trainings you have undergone? (choice = Other)",
      },
      {
        key: "H2C3_13",
        header:
          "2C.3 Which of the following emergency care trainings you have undergone? (Other Specify)",
      },
      {
        key: "H2C4_0",
        header: "2C.4  Frequency of training on emergency care in a year?",
      },
      {
        key: "H2C4_1",
        header:
          "2C.4  Frequency of training on emergency care in a year? (other specify)",
      },
      { key: "H2C5", header: "2C.5 When was the last training conducted?" },
      {
        key: "H2D1_0",
        header:
          "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Oxygen medicinal gas)",
      },
      {
        key: "H2D1_1",
        header:
          "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Atropine)",
      },
      {
        key: "H2D1_2",
        header:
          "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Diazepam/Lorazepam)",
      },
      {
        key: "H2D1_3",
        header:
          "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Adrenaline)",
      },
      {
        key: "H2D1_4",
        header:
          "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Charcoal activated)",
      },
      {
        key: "H2D1_5",
        header:
          "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Antisnake venom)",
      },
      {
        key: "H2D1_6",
        header:
          "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Pralidoxime (PAM))",
      },
      {
        key: "H2D1_7",
        header:
          "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Magnesium sulphate)",
      },
      {
        key: "H2D1_8",
        header:
          "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Tetanus immunoglobulin)",
      },
      {
        key: "H2D1_9",
        header:
          "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Neostigmine)",
      },
      {
        key: "H2D1_10",
        header:
          "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Aspirin)",
      },
      {
        key: "H2D1_11",
        header:
          "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Clopidogrel)",
      },
      {
        key: "H2D1_12",
        header:
          "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Atorvastatin)",
      },
      {
        key: "H2D1_13",
        header:
          "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Misoprostol)",
      },
      {
        key: "H2D1_14",
        header:
          "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Labetalol IV)",
      },
      {
        key: "H2D1_15",
        header:
          "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Phenobarbitone)",
      },
      {
        key: "H2D1_16",
        header:
          "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Phenytoin (inj))",
      },
      {
        key: "H2D1_17",
        header:
          "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Plasma volume expander)",
      },
      {
        key: "H2D1_18",
        header:
          "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = 3% Saline)",
      },
      {
        key: "H2D1_19",
        header:
          "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Dobutamine)",
      },
      {
        key: "H2D1_20",
        header:
          "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Streptokinase)",
      },
      {
        key: "H2D1_21",
        header:
          "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Tenecteplase)",
      },
      {
        key: "H2D1_22",
        header:
          "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Oxytocin)",
      },
      {
        key: "H2D1_23",
        header:
          "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Salbutamol sulphate)",
      },
      {
        key: "H2D1_24",
        header:
          "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Glucose/ 25 % dextrose)",
      },
      {
        key: "H2D1_25",
        header:
          "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Tranexamic acid)",
      },
      {
        key: "H2D1_26",
        header:
          "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = tPA IV)",
      },
      {
        key: "H2D1_27",
        header:
          "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Methergine)",
      },
      {
        key: "H2D1_28",
        header:
          "2D.1 : Which of the following emergency drugs are available at the CHC? (choice = Carboprost)",
      },
      {
        key: "H2D2_0",
        header:
          "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Mobile bed for Resuscitation)",
      },
      {
        key: "H2D2_1",
        header:
          "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Crash Cart (specialized cart for resuscitation))",
      },
      {
        key: "H2D2_2",
        header:
          "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Hard Cervical Collar)",
      },
      {
        key: "H2D2_3",
        header:
          "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Oxygen Cylinder/Central Oxygen Supply)",
      },
      {
        key: "H2D2_4",
        header:
          "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Suction Machine)",
      },
      {
        key: "H2D2_5",
        header:
          "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Multipara Monitor (To monitor Heart rate, BP, SPO2[Essential] ECG, Respiration Rate [Desirable] etc))",
      },
      {
        key: "H2D2_6",
        header:
          "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Defibrillator with or without external pacer)",
      },
      {
        key: "H2D2_7",
        header:
          "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Toothed Forceps, Kocher Forceps, Magill's forceps, Artery forceps)",
      },
      {
        key: "H2D2_8",
        header:
          "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = AMBU Bag for adult and Paediatric)",
      },
      {
        key: "H2D2_9",
        header:
          "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Basic airway equipment like oropharyngeal nasopharyngeal airway, LMA for adult and pediatric)",
      },
      {
        key: "H2D2_10",
        header:
          "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Advanced laryngoscope and endotracheal tube or other similar device)",
      },
      {
        key: "H2D2_11",
        header:
          "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Tourniquet)",
      },
      {
        key: "H2D2_12",
        header:
          "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Pelvic binder or bed sheets with clips)",
      },
      {
        key: "H2D2_13",
        header:
          "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Laryngoscope with all sized blades)",
      },
      {
        key: "H2D2_14",
        header:
          "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Endotracheal Tubes of all sizes)",
      },
      {
        key: "H2D2_15",
        header:
          "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Laryngeal Mask Airway (LMA))",
      },
      {
        key: "H2D2_16",
        header:
          "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Chest Tubes with Water seal drain)",
      },
      {
        key: "H2D2_17",
        header:
          "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = ECG Machine)",
      },
      {
        key: "H2D2_18",
        header:
          "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Nebulizer)",
      },
      {
        key: "H2D2_19",
        header:
          "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Fluid Warmer)",
      },
      {
        key: "H2D2_20",
        header:
          "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Infusion pump and Syringe Drivers)",
      },
      {
        key: "H2D2_21",
        header:
          "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Spine board with sling and scotch tapes)",
      },
      {
        key: "H2D2_22",
        header:
          "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Splints for all types of fracture)",
      },
      {
        key: "H2D2_23",
        header:
          "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Non-invasive Ventilators)",
      },
      {
        key: "H2D2_24",
        header:
          "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Invasive Ventilators)",
      },
      {
        key: "H2D2_25",
        header:
          "2D.2 : Which of the following emergency equipment is available at the CHC? (choice = Incubators)",
      },
      {
        key: "table2_Adult",
        header:
          "2E.1 : Numbers of Patients who Visited ED in Last One Month (Adult (> 18Years))",
      },
      {
        key: "table2_Pediatric",
        header:
          "2E.1 : Numbers of Patients who Visited ED in Last One Month (Pediatric)",
      },
      {
        key: "table2_Broughtdead",
        header:
          "2E.1 : Numbers of Patients who Visited ED in Last One Month (Brought dead)",
      },
      {
        key: "table2_Deathafterarrival",
        header:
          "2E.1 : Numbers of Patients who Visited ED in Last One Month (Death after arrival)",
      },
      {
        key: "table2_MLC",
        header:
          "2E.1 : Numbers of Patients who Visited ED in Last One Month (MLC)",
      },
      {
        key: "table3_0_Attended",
        header:
          "2E.2 : Numbers of Patients who Visited ED in Last One Month (MI - Attended)",
      },
      {
        key: "table3_0_Death",
        header:
          "2E.2 : Numbers of Patients who Visited ED in Last One Month (MI - Death)",
      },
      {
        key: "table3_1_Attended",
        header:
          "2E.2 : Numbers of Patients who Visited ED in Last One Month (Stroke - Attended)",
      },
      {
        key: "table3_1_Death",
        header:
          "2E.2 : Numbers of Patients who Visited ED in Last One Month (Strok - Death)",
      },
      {
        key: "table3_2_Attended",
        header:
          "2E.2 : Numbers of Patients who Visited ED in Last One Month (Trauma & Burns - Attended)",
      },
      {
        key: "table3_2_Death",
        header:
          "2E.2 : Numbers of Patients who Visited ED in Last One Month (Trauma & Burn - Death)",
      },
      {
        key: "table3_3_Attended",
        header:
          "2E.2 : Numbers of Patients who Visited ED in Last One Month (Poisoning - Attended)",
      },
      {
        key: "table3_3_Death",
        header:
          "2E.2 : Numbers of Patients who Visited ED in Last One Month (Poisoning - Death)",
      },
      {
        key: "table3_4_Attended",
        header:
          "2E.2 : Numbers of Patients who Visited ED in Last One Month (Snake Bite - Attended)",
      },
      {
        key: "table3_4_Death",
        header:
          "2E.2 : Numbers of Patients who Visited ED in Last One Month (Snake Bit - Death)",
      },
      {
        key: "table3_5_Attended",
        header:
          "2E.2 : Numbers of Patients who Visited ED in Last One Month (Maternal Emergencies-PPH - Attended)",
      },
      {
        key: "table3_5_Death",
        header:
          "2E.2 : Numbers of Patients who Visited ED in Last One Month (Maternal Emergencies-PPH - Death)",
      },
      {
        key: "table3_6_Attended",
        header:
          "2E.2 : Numbers of Patients who Visited ED in Last One Month (Maternal Emergencies-Eclampsia - Attended)",
      },
      {
        key: "table3_6_Death",
        header:
          "2E.2 : Numbers of Patients who Visited ED in Last One Month (Maternal Emergencies-Eclampsia - Death)",
      },
      {
        key: "table3_7_Attended",
        header:
          "2E.2 : Numbers of Patients who Visited ED in Last One Month (Neontal Emergencies - Attended)",
      },
      {
        key: "table3_7_Death",
        header:
          "2E.2 : Numbers of Patients who Visited ED in Last One Month (Neontal Emergencies - Death)",
      },
      {
        key: "table3_8_Attended",
        header:
          "2E.2 : Numbers of Patients who Visited ED in Last One Month (Acute Respiratory Illness - Attended)",
      },
      {
        key: "table3_8_Death",
        header:
          "2E.2 : Numbers of Patients who Visited ED in Last One Month (Acute Respiratory Illnes - Death)",
      },
      {
        key: "H2E3_0",
        header:
          "2E.3 Which of the following emergency services are delivered at the CHC? (Multiple answers possible) (choice=Triage)",
      },
      {
        key: "H2E3_1",
        header:
          "2E.3 Which of the following emergency services are delivered at the CHC? (Multiple answers possible) (choice=Resuscitation)",
      },
      {
        key: "H2E3_2",
        header:
          "2E.3 Which of the following emergency services are delivered at the CHC? (Multiple answers possible) (choice=Medico-legal Reporting)",
      },
      {
        key: "H2F1",
        header:
          "2F.1 Does the facility have a Hospital Management Information System (HMIS)",
      },
      {
        key: "H2F2",
        header:
          "2F.2 Does this facility do complete reporting of indicators on emergency care in HMIS?",
      },
      {
        key: "H2F3",
        header:
          "2F.3 How many personnel available for managing information system?",
      },
      {
        key: "H2F4_0",
        header:
          "2F.4 What key indicators are generated from the emergency management information system? (choice=Numbers by type of emergencies)",
      },
      {
        key: "H2F4_1",
        header:
          "2F.4 What key indicators are generated from the emergency management information system? (choice=Length of hospital stay)",
      },
      {
        key: "H2F4_2",
        header:
          "2F.4 What key indicators are generated from the emergency management information system? (choice=Turn around time)",
      },
      {
        key: "H2F4_3",
        header:
          "2F.4 What key indicators are generated from the emergency management information system? (choice=Disposal time)",
      },
      {
        key: "H2F4_4",
        header:
          "2F.4 What key indicators are generated from the emergency management information system? (choice=Number of deaths)",
      },
      {
        key: "H2F4_5",
        header:
          "2F.4 What key indicators are generated from the emergency management information system? (choice=Number of Referrals)",
      },
      {
        key: "H2F5",
        header:
          "2F.5 Whether time bound management of common emergencies is captured in MIS.",
      },
      {
        key: "H2F6_0",
        header:
          "2F.6 Which of the following alet systems does your facility have? (choice = Code blue alert system)",
      },
      {
        key: "H2F6_1",
        header:
          "2F.6 Which of the following alet systems does your facility have? (choice = STEMI alert system)",
      },
      {
        key: "H2F6_2",
        header:
          "2F.6 Which of the following alet systems does your facility have? (choice = Stroke alert system)",
      },
      {
        key: "H2F6_3",
        header:
          "2F.6 Which of the following alet systems does your facility have? (choice = Trauma alert system)",
      },
      {
        key: "H2F7",
        header:
          "2F.7 Whether Medical Officer In charge (MO/IC) uses or reviews the data for quality improvement",
      },
      {
        key: "H2F8_0",
        header:
          "2F.8 Do you get Pre-Hospital Notification during an emergency?",
      },
      {
        key: "H2F8_1",
        header:
          "2F.8 Do you get Pre-Hospital Notification during an emergency?(if yes, How often per week)",
      },
      {
        key: "H2F9",
        header: "2F.9 Infrastructure for receiving external communication?",
      },
      {
        key: "H2G1",
        header: "2G.1 Whether any untied fund is available at your hospital?",
      },
      {
        key: "H2G2",
        header:
          "2G.2 If Yes, whether this fund is utilized for providing emergency care services?",
      },
      {
        key: "H2G3",
        header: "2G.3 Whether any fund is available for emergency care?",
      },
      {
        key: "H2G4_0",
        header:
          "2G.4 If funds are available, which health protection schemes are covering your emergency care system? (choice = PMJAY)",
      },
      {
        key: "H2G4_1",
        header:
          "2G.4 If funds are available, which health protection schemes are covering your emergency care system? (choice = RKS)",
      },
      {
        key: "H2G4_2",
        header:
          "2G.4 If funds are available, which health protection schemes are covering your emergency care system? (choice = other)",
      },
      {
        key: "H2G4_3",
        header:
          "2G.4 If funds are available, which health protection schemes are covering your emergency care system? (Other specify)",
      },
      {
        key: "H2G5",
        header:
          "2G.5 Out of total patients being provided emergency care, how many were provided services under PMJAY scheme/ any other insurance scheme.",
      },
      {
        key: "H2G6",
        header:
          "2G.6 Is the facility providing free emergency services to pregnant women, mothers, and neonates as per prevalent government schemes?",
      },
      {
        key: "H2H1",
        header: "2H.1.1 Do you have any disaster management plans?",
      },
      { key: "H2H2", header: "2H.1.2 Do you have a redistribution plan?" },
      { key: "H2H3", header: "2H.1.3 Do you have any evacuation plan?" },
      {
        key: "H2H4_0",
        header: "2H.2.1 Do you have a Quality Improvement Committee?",
      },
      {
        key: "H2H4_1",
        header:
          "2H.2.1 Do you have a Quality Improvement Committee?( if yes, collect detail of Committee)",
      },
      {
        key: "H2H5",
        header: "2H.2.2 How frequently does this committee meet in a year?",
      },
      {
        key: "H2H6",
        header:
          "2H.2.3 Do you have regular audits related to emergency care in this facility?",
      },
      {
        key: "H2H7",
        header:
          "2H.2.4 How frequently emergency care audits are conducted in a year?",
      },
      {
        key: "H2H8_0",
        header: "2H.2.5 Types of audits conducted? (choice = Mortality Audit)",
      },
      {
        key: "H2H8_1",
        header: "2H.2.5 Types of audits conducted? (choice = Morbidity Audit)",
      },
      {
        key: "H2H8_2",
        header: "2H.2.5 Types of audits conducted? (choice = other)",
      },
      {
        key: "H2H8_3",
        header: "2H.2.5 Types of audits conducted? (Other Specify)",
      },
      {
        key: "H2H9",
        header:
          "2H.2.6 Any action being taken on Audit report in the last one year?",
      },
      {
        key: "H2I1_0",
        header:
          "2I.1 What types of registers are maintained at the CHC? (Multiple answers possible) (choice=OPD/Treatment Register)",
      },
      {
        key: "H2I1_1",
        header:
          "2I.1 What types of registers are maintained at the CHC? (Multiple answers possible) (choice=Inventory Register)",
      },
      {
        key: "H2I1_2",
        header:
          "2I.1 What types of registers are maintained at the CHC? (Multiple answers possible) (choice=Procedure Register)",
      },
      {
        key: "H2I1_3",
        header:
          "2I.1 What types of registers are maintained at the CHC? (Multiple answers possible) (choice=Referral Register)",
      },
      {
        key: "H2I1_4",
        header:
          "2I.1 What types of registers are maintained at the CHC? (Multiple answers possible) (choice=Record for handing over and taking over of critical care equipment.)",
      },
      {
        key: "H2I1_5",
        header:
          "2I.1 What types of registers are maintained at the CHC? (Multiple answers possible) (choice=Medico-legal register)",
      },
      {
        key: "H2I1_6",
        header:
          "2I.1 What types of registers are maintained at the CHC? (Multiple answers possible) (choice=Death Register)",
      },
      {
        key: "H2I1_7",
        header:
          "2I.1 What types of registers are maintained at the CHC? (Multiple answers possible) (choice=Patient/Community feedback register)",
      },
      {
        key: "H2I1_8",
        header:
          "2I.1 What types of registers are maintained at the CHC? (Multiple answers possible) (choice=other)",
      },
      {
        key: "H2I1_9",
        header:
          "2I.1 What types of registers are maintained at the CHC? (Other specify)",
      },
      {
        key: "H2I2_0",
        header:
          "2I.2 Which of the following SOPs for the management of common medical emergencies are followed at your CHC? (Select all that apply) (choice=Documents triage guidelines and protocols)",
      },
      {
        key: "H2I2_1",
        header:
          "2I.2 Which of the following SOPs for the management of common medical emergencies are followed at your CHC? (Select all that apply) (choice=Standard treatment protocols for emergencies.)",
      },
      {
        key: "H2I2_2",
        header:
          "2I.2 Which of the following SOPs for the management of common medical emergencies are followed at your CHC? (Select all that apply) (choice=Transfer policies and procedures.)",
      },
      {
        key: "H2I2_3",
        header:
          "2I.2 Which of the following SOPs for the management of common medical emergencies are followed at your CHC? (Select all that apply) (choice=Disaster Management Plan.)",
      },
      {
        key: "H2I2_4",
        header:
          "2I.2 Which of the following SOPs for the management of common medical emergencies are followed at your CHC? (Select all that apply) (choice=Policies for handling cases opf death)",
      },
      {
        key: "table4_0_SOP",
        header:
          "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (MI - SOP/STW)",
      },
      {
        key: "table4_0_FollowsSOP",
        header:
          "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (MI - Follows SOP)",
      },
      {
        key: "table4_1_SOP",
        header:
          "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Stroke - SOP/STW)",
      },
      {
        key: "table4_1_FollowsSOP",
        header:
          "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Stroke - Follows SOP)",
      },
      {
        key: "table4_2_SOP",
        header:
          "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Trauma & Burns - SOP/STW)",
      },
      {
        key: "table4_2_FollowsSOP",
        header:
          "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Trauma & Burns - Follows SOP)",
      },
      {
        key: "table4_3_SOP",
        header:
          "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Poisoning - SOP/STW)",
      },
      {
        key: "table4_3_FollowsSOP",
        header:
          "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Poisoning - Follows SOP)",
      },
      {
        key: "table4_4_SOP",
        header:
          "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Snake Bites - SOP/STW)",
      },
      {
        key: "table4_4_FollowsSOP",
        header:
          "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Snake Bites - Follows SOP)",
      },
      {
        key: "table4_5_SOP",
        header:
          "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Maternal Emergencies-PPH - SOP/STW)",
      },
      {
        key: "table4_5_FollowsSOP",
        header:
          "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Maternal Emergencies-PPH - Follows SOP)",
      },
      {
        key: "table4_6_SOP",
        header:
          "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Maternal Emergencies-Eclampsia - SOP/STW)",
      },
      {
        key: "table4_6_FollowsSOP",
        header:
          "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Maternal Emergencies-Eclampsia - Follows SOP)",
      },
      {
        key: "table4_7_SOP",
        header:
          "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Neonatal Emergencies - SOP/STW)",
      },
      {
        key: "table4_7_FollowsSOP",
        header:
          "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Neonatal Emergencies - Follows SOP)",
      },
      {
        key: "table4_8_SOP",
        header:
          "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Acute Respiratory Illness - SOP/STW)",
      },
      {
        key: "table4_8_FollowsSOP",
        header:
          "2I.3 Whether having Emergency condition specific SOP/STW for emergency care? (Acute Respiratory Illness - Follows SOP)",
      },
      {
        key: "H2I4",
        header:
          "2I.4 Does the facility have defined and established procedure for informing patients about their medical condition, involving them in treatment planning and facilitating informed decision making?",
      },
      {
        key: "H2J1",
        header:
          "2J.1 Does this facility have any policies and procedures which guide the transfer- out/referral of stable and unstable patients after stabilization to another facility with documentation?",
      },
      {
        key: "H2J2",
        header:
          "2J.2 Dose this facility have any policies and procedures which guide the transferout/referral of stable and unstable with documentation?",
      },
    ];

    worksheet.addRows(
      data.map((row) => ({
        id: row._id,
        H2A1: row.H2A1,
        date: row.date,
        H2A2: row.uniqueCode,
        H2A3: row.H2A3,
        H2A4: row.H2A4,
        H2A5: row.H2A5,
        H2A6: row.H2A6,
        H2A7: row.H2A7,
        H2A8: row.H2A8,
        H2A9_0: row.H2A9?.latitude,
        H2A9_1: row.H2A9?.longitude,
        H2A10: row.H2A10,
        H2A11: row.H2A11,
        H2B1: row.H2B1,
        H2B2: row.H2B2,
        H2B3: row.H2B3,
        H2B4: row.H2B4,
        H2B5: row.H2B5,
        H2B6: row.H2B6,
        H2B7_0: row.H2B7?.[0],
        H2B7_1: row.H2B7?.[1],
        H2B7_2: row.H2B7?.[2],
        H2B7_3: row.H2B7?.[3],
        H2B7_4: row.H2B7?.[4],
        H2B7_5: row.H2B7?.[5],
        H2B7_6: row.H2B7?.[6],
        H2B7_7: row.H2B7?.[7],
        H2B7_8: row.H2B7?.[8],
        H2B7_9: row.H2B7?.[9],
        H2B7_10: row.H2B7?.[10],
        H2B7_11: row.H2B7?.[11],
        H2B7_12: row.H2B7?.[12],
        H2B7_13: row.H2B7?.[13],
        H2B7_14: row.H2B7?.[14],
        H2B7_15: row.H2B7?.[15],
        H2B7_16: row.H2B7?.[16],
        H2B7_17: row.H2B7?.[17],
        H2B7_18: row.H2B7?.[18],
        H2B8_0: row.H2B8?.[0],
        H2B8_1: row.H2B8?.[1],
        H2B8_2: row.H2B8?.[2],
        H2B8_3: row.H2B8?.[3],
        H2B8_4: row.H2B8?.[4],
        H2B8_5: row.H2B8?.[5],
        H2B8_6: row.H2B8?.[6] != null ? "other" : "",
        H2B8_7: row.H2B8?.[6],
        H2B9: row.H2B9,
        H2B10: row.H2B10,
        table1_0_Manpower: row.table1?.[0]?.Manpower,
        table1_0_Number: row.table1?.[0]?.Number,
        table1_0_availability247: row.table1?.[0]?.Availability247,
        table1_0_onSiteAvailability: row.table1?.[0]?.onSiteAvailability,
        table1_0_onCallAvailability: row.table1?.[0]?.onCallAvailability,
        table1_1_Manpower: row.table1?.[1]?.Manpower,
        table1_1_Number: row.table1?.[1]?.Number,
        table1_1_availability247: row.table1?.[1]?.Availability247,
        table1_1_onSiteAvailability: row.table1?.[1]?.onSiteAvailability,
        table1_1_onCallAvailability: row.table1?.[1]?.onCallAvailability,
        table1_2_Manpower: row.table1?.[2]?.Manpower,
        table1_2_Number: row.table1?.[2]?.Number,
        table1_2_availability247: row.table1?.[2]?.Availability247,
        table1_2_onSiteAvailability: row.table1?.[2]?.onSiteAvailability,
        table1_2_onCallAvailability: row.table1?.[2]?.onCallAvailability,
        table1_3_Manpower: row.table1?.[3]?.Manpower,
        table1_3_Number: row.table1?.[3]?.Number,
        table1_3_availability247: row.table1?.[3]?.Availability247,
        table1_3_onSiteAvailability: row.table1?.[3]?.onSiteAvailability,
        table1_3_onCallAvailability: row.table1?.[3]?.onCallAvailability,
        table1_4_Manpower: row.table1?.[4]?.Manpower,
        table1_4_Number: row.table1?.[4]?.Number,
        table1_4_availability247: row.table1?.[4]?.Availability247,
        table1_4_onSiteAvailability: row.table1?.[4]?.onSiteAvailability,
        table1_4_onCallAvailability: row.table1?.[4]?.onCallAvailability,
        table1_5_Manpower: row.table1?.[5]?.Manpower,
        table1_5_Number: row.table1?.[5]?.Number,
        table1_5_availability247: row.table1?.[5]?.Availability247,
        table1_5_onSiteAvailability: row.table1?.[5]?.onSiteAvailability,
        table1_5_onCallAvailability: row.table1?.[5]?.onCallAvailability,
        table1_6_Manpower: row.table1?.[6]?.Manpower,
        table1_6_Number: row.table1?.[6]?.Number,
        table1_6_availability247: row.table1?.[6]?.Availability247,
        table1_6_onSiteAvailability: row.table1?.[6]?.onSiteAvailability,
        table1_6_onCallAvailability: row.table1?.[6]?.onCallAvailability,
        table1_7_Manpower: row.table1?.[7]?.Manpower,
        table1_7_Number: row.table1?.[7]?.Number,
        table1_7_availability247: row.table1?.[7]?.Availability247,
        table1_7_onSiteAvailability: row.table1?.[7]?.onSiteAvailability,
        table1_7_onCallAvailability: row.table1?.[7]?.onCallAvailability,
        table1_8_Manpower: row.table1?.[8]?.Manpower,
        table1_8_Number: row.table1?.[8]?.Number,
        table1_8_availability247: row.table1?.[8]?.Availability247,
        table1_8_onSiteAvailability: row.table1?.[8]?.onSiteAvailability,
        table1_8_onCallAvailability: row.table1?.[8]?.onCallAvailability,
        table1_9_Manpower: row.table1?.[9]?.Manpower,
        table1_9_Number: row.table1?.[9]?.Number,
        table1_9_availability247: row.table1?.[9]?.Availability247,
        table1_9_onSiteAvailability: row.table1?.[9]?.onSiteAvailability,
        table1_9_onCallAvailability: row.table1?.[9]?.onCallAvailability,
        table1_10_Manpower: row.table1?.[10]?.Manpower,
        table1_10_Number: row.table1?.[10]?.Number,
        table1_10_availability247: row.table1?.[10]?.availability247,
        table1_10_onSiteAvailability: row.table1?.[10]?.onSiteAvailability,
        table1_10_onCallAvailability: row.table1?.[10]?.onCallAvailability,
        table1_11_Manpower: row.table1?.[11]?.Manpower,
        table1_11_Number: row.table1?.[11]?.Number,
        table1_11_availability247: row.table1?.[11]?.availability247,
        table1_11_onSiteAvailability: row.table1?.[11]?.onSiteAvailability,
        table1_11_onCallAvailability: row.table1?.[11]?.onCallAvailability,
        table1_12_Manpower: row.table1?.[12]?.Manpower,
        table1_12_Number: row.table1?.[12]?.Number,
        table1_12_availability247: row.table1?.[12]?.availability247,
        table1_12_onSiteAvailability: row.table1?.[12]?.onSiteAvailability,
        table1_12_onCallAvailability: row.table1?.[12]?.onCallAvailability,
        table1_13_Manpower: row.table1?.[13]?.Manpower,
        table1_13_Number: row.table1?.[13]?.Number,
        table1_13_availability247: row.table1?.[13]?.availability247,
        table1_13_onSiteAvailability: row.table1?.[13]?.onSiteAvailability,
        table1_13_onCallAvailability: row.table1?.[13]?.onCallAvailability,
        table1_14_Manpower: row.table1?.[14]?.Manpower,
        table1_14_Number: row.table1?.[14]?.Number,
        table1_14_availability247: row.table1?.[14]?.availability247,
        table1_14_onSiteAvailability: row.table1?.[14]?.onSiteAvailability,
        table1_14_onCallAvailability: row.table1?.[14]?.onCallAvailability,
        table1_15_Manpower: row.table1?.[15]?.Manpower,
        table1_15_Number: row.table1?.[15]?.Number,
        table1_15_availability247: row.table1?.[15]?.availability247,
        table1_15_onSiteAvailability: row.table1?.[15]?.onSiteAvailability,
        table1_15_onCallAvailability: row.table1?.[15]?.onCallAvailability,
        table1_16_Manpower: row.table1?.[16]?.Manpower != null ? "other" : "",
        table1_16_Manpower_other_specify: row.table1?.[16]?.Manpower,
        table1_16_Number: row.table1?.[16]?.Number,
        table1_16_availability247: row.table1?.[16]?.availability247,
        table1_16_onSiteAvailability: row.table1?.[16]?.onSiteAvailability,
        table1_16_onCallAvailability: row.table1?.[16]?.onCallAvailability,
        H2C2: row.H2C2,
        H2C3_0: row.H2C3?.[0],
        H2C3_1: row.H2C3?.[1],
        H2C3_2: row.H2C3?.[2],
        H2C3_3: row.H2C3?.[3],
        H2C3_4: row.H2C3?.[4],
        H2C3_5: row.H2C3?.[5],
        H2C3_6: row.H2C3?.[6],
        H2C3_7: row.H2C3?.[7],
        H2C3_8: row.H2C3?.[8],
        H2C3_9: row.H2C3?.[9],
        H2C3_10: row.H2C3?.[10],
        H2C3_11: row.H2C3?.[11],
        H2C3_12: row.H2C3?.[12] != null ? "other" : "",
        H2C3_13: row.H2C3?.[12],
        H2C4_0: row.H2C4?.split(":")?.[0],
        H2C4_1: row.H2C4?.split(":")?.[1],
        H2C5: row.H2C5,
        H2D1_0: row.H2D1?.[0],
        H2D1_1: row.H2D1?.[1],
        H2D1_2: row.H2D1?.[2],
        H2D1_3: row.H2D1?.[3],
        H2D1_4: row.H2D1?.[4],
        H2D1_5: row.H2D1?.[5],
        H2D1_6: row.H2D1?.[6],
        H2D1_7: row.H2D1?.[7],
        H2D1_8: row.H2D1?.[8],
        H2D1_9: row.H2D1?.[9],
        H2D1_10: row.H2D1?.[10],
        H2D1_11: row.H2D1?.[11],
        H2D1_12: row.H2D1?.[12],
        H2D1_13: row.H2D1?.[13],
        H2D1_14: row.H2D1?.[14],
        H2D1_15: row.H2D1?.[15],
        H2D1_16: row.H2D1?.[16],
        H2D1_17: row.H2D1?.[17],
        H2D1_18: row.H2D1?.[18],
        H2D1_19: row.H2D1?.[19],
        H2D1_20: row.H2D1?.[20],
        H2D1_21: row.H2D1?.[21],
        H2D1_22: row.H2D1?.[22],
        H2D1_23: row.H2D1?.[23],
        H2D1_24: row.H2D1?.[24],
        H2D1_25: row.H2D1?.[25],
        H2D1_26: row.H2D1?.[26],
        H2D1_27: row.H2D1?.[27],
        H2D1_28: row.H2D1?.[28],
        H2D2_0: row.H2D2?.[0],
        H2D2_1: row.H2D2?.[1],
        H2D2_2: row.H2D2?.[2],
        H2D2_3: row.H2D2?.[3],
        H2D2_4: row.H2D2?.[4],
        H2D2_5: row.H2D2?.[5],
        H2D2_6: row.H2D2?.[6],
        H2D2_7: row.H2D2?.[7],
        H2D2_8: row.H2D2?.[8],
        H2D2_9: row.H2D2?.[9],
        H2D2_10: row.H2D2?.[10],
        H2D2_11: row.H2D2?.[11],
        H2D2_12: row.H2D2?.[12],
        H2D2_13: row.H2D2?.[13],
        H2D2_14: row.H2D2?.[14],
        H2D2_15: row.H2D2?.[15],
        H2D2_16: row.H2D2?.[16],
        H2D2_17: row.H2D2?.[17],
        H2D2_18: row.H2D2?.[18],
        H2D2_19: row.H2D2?.[19],
        H2D2_20: row.H2D2?.[20],
        H2D2_21: row.H2D2?.[21],
        H2D2_22: row.H2D2?.[22],
        H2D2_23: row.H2D2?.[23],
        H2D2_24: row.H2D2?.[24],
        H2D2_25: row.H2D2?.[25],
        table2_Adult: row.table2?.[0]?.Adult,
        table2_Pediatric: row.table2?.[0]?.Pediatric,
        table2_Broughtdead: row.table2?.[0]?.Broughtdead,
        table2_Deathafterarrival: row.table2?.[0]?.Deathafterarrival,
        table2_MLC: row.table2?.[0]?.MLC,
        table3_0_Attended: row.table3?.[0].Attended,
        table3_0_Death: row.table3?.[0].Death,
        table3_1_Attended: row.table3?.[1].Attended,
        table3_1_Death: row.table3?.[1].Death,
        table3_2_Attended: row.table3?.[2].Attended,
        table3_2_Death: row.table3?.[2].Death,
        table3_3_Attended: row.table3?.[3].Attended,
        table3_3_Death: row.table3?.[3].Death,
        table3_4_Attended: row.table3?.[4].Attended,
        table3_4_Death: row.table3?.[4].Death,
        table3_5_Attended: row.table3?.[5].Attended,
        table3_5_Death: row.table3?.[5].Death,
        table3_6_Attended: row.table3?.[6].Attended,
        table3_6_Death: row.table3?.[6].Death,
        table3_7_Attended: row.table3?.[7].Attended,
        table3_7_Death: row.table3?.[7].Death,
        table3_8_Attended: row.table3?.[8].Attended,
        table3_8_Death: row.table3?.[8].Death,
        H2E3_0: row.H2E3?.[0],
        H2E3_1: row.H2E3?.[1],
        H2E3_2: row.H2E3?.[2],
        H2F1: row.H2F1,
        H2F2: row.H2F2,
        H2F3: row.H2F3,
        H2F4_0: row.H2F4?.[0],
        H2F4_1: row.H2F4?.[1],
        H2F4_2: row.H2F4?.[2],
        H2F4_3: row.H2F4?.[3],
        H2F4_4: row.H2F4?.[4],
        H2F4_5: row.H2F4?.[5],
        H2F5: row.H2F5,
        H2F6_0: row.H2F6?.[0],
        H2F6_1: row.H2F6?.[1],
        H2F6_2: row.H2F6?.[2],
        H2F6_3: row.H2F6?.[3],
        H2F7: row.H2F7,
        H2F8_0: row.H2F8?.split(":")?.[0],
        H2F8_1: row.H2F8?.split(":")?.[1],
        H2F9: row.H2F9,
        H2G1: row.H2G1,
        H2G2: row.H2G2,
        H2G3: row.H2G3,
        H2G4_0: row.H2G4?.[0],
        H2G4_1: row.H2G4?.[1],
        H2G4_2: row.H2G4?.[2] != null ? "other" : "",
        H2G4_3: row.H2G4?.[2],
        H2G5: row.H2G5,
        H2G6: row.H2G6,
        H2H1: row.H2H1,
        H2H2: row.H2H2,
        H2H3: row.H2H3,
        H2H4_0: row.H2H4?.split(":")?.[0],
        H2H4_1: row.H2H4?.split(":")?.[1],
        H2H5: row.H2H5,
        H2H6: row.H2H6,
        H2H7: row.H2H7,
        H2H8_0: row.H2H8?.[0],
        H2H8_1: row.H2H8?.[1],
        H2H8_2: row.H2H8?.[2] != null ? "other" : "",
        H2H8_3: row.H2H8?.[2],
        H2H9: row.H2H9,
        H2I1_0: row.H2I1?.[0],
        H2I1_1: row.H2I1?.[1],
        H2I1_2: row.H2I1?.[2],
        H2I1_3: row.H2I1?.[3],
        H2I1_4: row.H2I1?.[4],
        H2I1_5: row.H2I1?.[5],
        H2I1_6: row.H2I1?.[6],
        H2I1_7: row.H2I1?.[7],
        H2I1_8: row.H2I1?.[8] != null ? "other" : "",
        H2I1_9: row.H2I1?.[8],
        H2I2_0: row.H2I2?.[0],
        H2I2_1: row.H2I2?.[1],
        H2I2_2: row.H2I2?.[2],
        H2I2_3: row.H2I2?.[3],
        H2I2_4: row.H2I2?.[4],
        table4_0_SOP: row.table4?.[0].SOP,
        table4_0_FollowsSOP: row.table4?.[0].FollowsSOP,
        table4_1_SOP: row.table4?.[1].SOP,
        table4_1_FollowsSOP: row.table4?.[1].FollowsSOP,
        table4_2_SOP: row.table4?.[2].SOP,
        table4_2_FollowsSOP: row.table4?.[2].FollowsSOP,
        table4_3_SOP: row.table4?.[3].SOP,
        table4_3_FollowsSOP: row.table4?.[3].FollowsSOP,
        table4_4_SOP: row.table4?.[4].SOP,
        table4_4_FollowsSOP: row.table4?.[4].FollowsSOP,
        table4_5_SOP: row.table4?.[5].SOP,
        table4_5_FollowsSOP: row.table4?.[5].FollowsSOP,
        table4_6_SOP: row.table4?.[6].SOP,
        table4_6_FollowsSOP: row.table4?.[6].FollowsSOP,
        table4_7_SOP: row.table4?.[7].SOP,
        table4_7_FollowsSOP: row.table4?.[7].FollowsSOP,
        table4_8_SOP: row.table4?.[8].SOP,
        table4_8_FollowsSOP: row.table4?.[8].FollowsSOP,
        H2I4: row.H2I4,
        H2J1: row.H2J1,
        H2J2: row.H2J2,
      }))
    );

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", 'attachment; filename="hfat-1.xlsx"');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating CSV file");
  }
};
