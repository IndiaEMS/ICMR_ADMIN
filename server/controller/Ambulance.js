import express, { response } from "express";
import mongoose from "mongoose";
import { AMBULANCE } from "../Database/Ambulance.js";
const app = express();
import { User } from "../Database/user.js";

export const AMBULANCEController = async (req, res) => {
  console.log("Comming");
  var { completeform, table1, table2, uniqueCode } = req.body;
  completeform = JSON.parse(completeform);
  table1 = JSON.parse(table1);
  table2 = JSON.parse(table2);
  uniqueCode = JSON.parse(uniqueCode);

  AMBULANCE.find({ AMB1: completeform?.AMB1 }).then((response) => {
    console.log(response);
    const combinedData = {
      ...completeform,
      table1,
      table2,
      formUniqueCode: uniqueCode,
      uniqueCode: `${completeform.AMB1}_${response.length + 1}`,
    };
    AMBULANCE.create(combinedData)
      .then((result) => {
        res.status(200).json({ success: "data saved", result });
      })
      .catch((err) => {
        res.status(400).json({ error: "error for data save" });
      });
  });
  // const hfat1 = req.body;
  // try {
  //   HFAT1.find({ A3: hfat1?.A3 }).then((response) => {
  //     const newHFAT1 = new HFAT1({
  //       uniqueCode: `${hfat1.A3}_${response.length + 1}`,
  //       ...hfat1,
  //     });
  //     // const newHFAT1 = new HFAT1(hfat);
  //     newHFAT1.save();
  //     res.status(201).json(newHFAT1);
  //   });
  // } catch (error) {
  //   res.status(409).json({ message: error.message });
  // }
};

// export const AMBULANCEGet = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     // const HEAT1Data = await HFAT1.find({ _id: "668b69b81f251d985457e463" });
//     var AMBULANCEData;
//     if (id) {
//       AMBULANCEData = await AMBULANCE.findById({ _id: id });
//     } else {
//       AMBULANCEData = await AMBULANCE.find();
//     }
//     if (!AMBULANCEData) {
//       res.status(404).json({ error: "Data not found" });
//     }

//     res.status(200).json({
//       success: true,
//       data: AMBULANCEData,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const AMBULANCEGet = async (req, res, next) => {
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

    var AmbulanceData;
    if (role === "superadmin") {
      AmbulanceData = await AMBULANCE.find();
    } else {
      AmbulanceData = await AMBULANCE.find({
        uniqueCode: { $regex: regex },
      });
    }

    if (!AmbulanceData) {
      return next(new ErrorHandler("data not found"));
    }

    res.status(200).json({
      success: true,
      data: AmbulanceData,
    });
  } catch (error) {
    next(error);
  }
};
