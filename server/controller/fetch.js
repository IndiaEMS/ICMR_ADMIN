import express, { response } from "express";
import mongoose from "mongoose";
import { User } from "../Database/user.js";
import { HFAT1 } from "../Database/HFAT-1.js";
import { HFAT2 } from "../Database/HFAT-2.js";
import { HFAT3 } from "../Database/HFAT-3.js";
import { AMBULANCE } from "../Database/Ambulance.js";
import { CSTFORM } from "../Database/CST.js";
import { Autopsy } from "../Database/Autopsy.js";
const app = express();

// for HFAT1, HFAT2,HFAT3 And AMBULANCE
export const HFATCounter = async (req, res) => {
  try {
    const HFAT1Count = await HFAT1.countDocuments();
    const HFAT2Count = await HFAT2.countDocuments();
    const HFAT3Count = await HFAT3.countDocuments();
    const AMBULANCECount = await AMBULANCE.countDocuments();
    const CSTCount = await CSTFORM.countDocuments();
    const AutopsyCount = await Autopsy.countDocuments();
    res.status(200).json({
      HFAT1Count,
      HFAT2Count,
      HFAT3Count,
      AMBULANCECount,
      CSTCount,
      AutopsyCount,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const DashboardCounter = async (req, res) => {
  try {
    const adminId = req.user.id;
    const state = req.user.sitename;
    const role = req.user.role;

    if (!adminId || !state) {
      return res.status(400).json({
        success: false,
        message: "Please provide adminId and state",
      });
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

    var HFAT1Count;
    var HFAT2Count;
    var HFAT3Count;
    var AMBULANCECount;
    var CSTCount;
    var AutopsyCount;

    if (role === "superadmin" || role === "analytics") {
      HFAT1Count = await HFAT1.countDocuments();
      HFAT2Count = await HFAT2.countDocuments();
      HFAT3Count = await HFAT3.countDocuments();
      AMBULANCECount = await AMBULANCE.countDocuments();
      CSTCount = await CSTFORM.countDocuments();
      AutopsyCount = await Autopsy.countDocuments();
    } else {
      HFAT1Count = await HFAT1.countDocuments({
        uniqueCode: { $regex: regex },
      });
      HFAT2Count = await HFAT2.countDocuments({
        uniqueCode: { $regex: regex },
      });
      HFAT3Count = await HFAT3.countDocuments({
        uniqueCode: { $regex: regex },
      });
      AMBULANCECount = await AMBULANCE.countDocuments({
        uniqueCode: { $regex: regex },
      });
      CSTCount = await CSTFORM.countDocuments({ AA2: { $regex: regex } });
      AutopsyCount = await Autopsy.countDocuments({
        FA2: { $regex: regex },
      });
    }

    return res.status(200).json({
      success: true,
      HFAT1Count,
      HFAT2Count,
      HFAT3Count,
      AMBULANCECount,
      CSTCount,
      AutopsyCount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const changeSuperadminState = async (req, res) => {
  try {
    const superadminId = req.user.id;
    const role = req.user.role;
    const { newState } = req.query;

    if (role != "superadmin" && role != "analytics") {
      return res.status(403).json({
        success: false,
        message: "Only Authorized user can change the state",
      });
    }

    if (newState === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please provide a new state",
      });
    }

    const states = [
      { value: "", label: "All" },
      { value: "GJBRC", label: "Gujarat" },
      { value: "ORPUR", label: "Odisha" },
      { value: "MPBHS", label: "Bhopal" },
      { value: "PBLDH", label: "Ludhiana" },
      { value: "PYPDY", label: "Pondicherry" },
    ];

    const matchedState = states.find((s) => s.value === newState);

    // console.log("matchedState", matchedState);

    if (!matchedState) {
      return res.status(400).json({
        success: false,
        message: "State code not found",
      });
    }

    // await User.findByIdAndUpdate(superadminId, { sitename: newState });

    const regex = new RegExp(`^${matchedState.value}`);
    const HFAT1Count = await HFAT1.countDocuments({
      uniqueCode: { $regex: regex },
    });
    const HFAT2Count = await HFAT2.countDocuments({
      uniqueCode: { $regex: regex },
    });
    const HFAT3Count = await HFAT3.countDocuments({
      uniqueCode: { $regex: regex },
    });
    const AMBULANCECount = await AMBULANCE.countDocuments({
      uniqueCode: { $regex: regex },
    });
    const CSTCount = await CSTFORM.countDocuments({ AA2: { $regex: regex } });
    const AutopsyCount = await Autopsy.countDocuments({
      FA2: { $regex: regex },
    });

    // Respond with success and the counts
    return res.status(200).json({
      success: true,
      message: `State changed to ${newState}`,
      HFAT1Count,
      HFAT2Count,
      HFAT3Count,
      AMBULANCECount,
      CSTCount,
      AutopsyCount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const adminDashboardCounter = async (req, res) => {
  try {
    const adminId = req.user.id;
    const state = req.user.sitename;
    const role = req.user.role;

    if (role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can access this data",
      });
    }

    if (!adminId || !state) {
      return res.status(400).json({
        success: false,
        message: "Please provide adminId and state",
      });
    }

    const stateCode = state.trim();

    const states = [
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

    const HFAT1Count = await HFAT1.countDocuments({
      uniqueCode: { $regex: regex },
    });
    const HFAT2Count = await HFAT2.countDocuments({
      uniqueCode: { $regex: regex },
    });
    const HFAT3Count = await HFAT3.countDocuments({
      uniqueCode: { $regex: regex },
    });
    const AMBULANCECount = await AMBULANCE.countDocuments({
      uniqueCode: { $regex: regex },
    });
    const CSTCount = await CSTFORM.countDocuments({
      AA2: { $regex: regex },
    });
    const AutopsyCount = await Autopsy.countDocuments({
      FA2: { $regex: regex },
    });

    return res.status(200).json({
      success: true,
      HFAT1Count,
      HFAT2Count,
      HFAT3Count,
      AMBULANCECount,
      CSTCount,
      AutopsyCount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
