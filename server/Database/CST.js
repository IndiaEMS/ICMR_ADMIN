import mongoose from "mongoose";

var CSTSchema = new mongoose.Schema({}, { strict: false });

export const CSTFORM = new mongoose.model("CSTFORM", CSTSchema);
export const CST_FINAL = new mongoose.model("CST_FINAL",CSTSchema);
export const CST_Mapping = mongoose.model("CST_mapping",CSTSchema);
