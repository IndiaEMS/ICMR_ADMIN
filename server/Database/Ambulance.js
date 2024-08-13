import mongoose from "mongoose";

var AMBULANCESchema = new mongoose.Schema({}, { strict: false });

export const AMBULANCE = new mongoose.model("AMBULANCE", AMBULANCESchema);
