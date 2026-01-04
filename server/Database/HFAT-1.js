import mongoose from "mongoose";

var HFATSchema = new mongoose.Schema(
  {}, { strict: false });


export const HFAT1 = new mongoose.model("HFAT1",HFATSchema);
export const HFAT1_FINAL = new mongoose.model("HFAT1_FINAL",HFATSchema);
export const HFAT1_Mapping = mongoose.model("hfat1_mapping",HFATSchema);