import mongoose from "mongoose";

var HFATSchema = new mongoose.Schema({}, { strict: false });


export const HFAT2 = new mongoose.model("HFAT2",HFATSchema);
export const HFAT2_FINAL = new mongoose.model("HFAT2_FINAL",HFATSchema);
export const HFAT2_Mapping = mongoose.model("hfat2_mapping",HFATSchema);