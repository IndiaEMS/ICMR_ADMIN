import mongoose from "mongoose";

var AMBULANCESchema = new mongoose.Schema({}, { strict: false });

export const AMBULANCE = new mongoose.model("AMBULANCE", AMBULANCESchema);
export const AMBULANCE_FINAL = new mongoose.model("AMBULANCE_FINAL", AMBULANCESchema);
export const AMB_Mapping = mongoose.model("ambulance_mapping",AMBULANCESchema);
