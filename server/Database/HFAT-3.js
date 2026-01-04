import mongoose, { mongo } from "mongoose";

var HFATSchema = new mongoose.Schema({}, { strict: false });

export const HFAT3 = new mongoose.model("HFAT3",HFATSchema);
export const HFAT3_FINAL = new mongoose.model("HFAT3_FINAL",HFATSchema);
export const HFAT3_Mapping = mongoose.model("hfat3_mapping",HFATSchema);