import express, { response } from "express";
import mongoose from "mongoose";
import { User } from "../Database/user.js";
import { HFAT1 } from "../Database/HFAT-1.js";
import { HFAT2 } from "../Database/HFAT-2.js";
import { HFAT3 } from "../Database/HFAT-3.js";
import { AMBULANCE } from "../Database/Ambulance.js";
const app = express();

// for HFAT1, HFAT2,HFAT3 And AMBULANCE
export const HFATCounter = async (req, res) => {
  try {
    const HFAT1Count = await HFAT1.countDocuments();
    const HFAT2Count = await HFAT2.countDocuments();
    const HFAT3Count = await HFAT3.countDocuments();
    const AMBULANCECount = await AMBULANCE.countDocuments();
    res
      .status(200)
      .json({ HFAT1Count, HFAT2Count, HFAT3Count, AMBULANCECount });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
