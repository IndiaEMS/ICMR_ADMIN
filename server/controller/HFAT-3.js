import express from "express";
import { HFAT3 } from "../Database/HFAT-3.js";
const app = express();
import { User } from "../Database/user.js";

export const HFAT3Controller = (req, res) => {
  var { completeform, table1, table2, table3, table4 } = req.body;
  // console.log(completeform, table1, table2, table3, table4);
  completeform = JSON.parse(completeform);
  table1 = JSON.parse(table1);
  table2 = JSON.parse(table2);
  table3 = JSON.parse(table3);
  table4 = JSON.parse(table4);

  HFAT3.find({ H3A2: completeform?.H3A2 }).then((response) => {
    console.log(response);
    const combinedData = {
      uniqueCode: `${completeform.H3A2}_${response.length + 1}`,
      ...completeform,
      table1,
      table2,
      table3,
      table4,
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

export const HFAT3AndAMBULANCEGet = async (req, res, next) => {
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

    let HEAT3Data;
    if (role === "superadmin") {
      HEAT3Data = await HFAT3.find();
    } else {
      HEAT3Data = await HFAT3.find({ uniqueCode: { $regex: regex } });
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
