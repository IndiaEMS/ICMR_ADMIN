import mongoose from "mongoose";

var HFATSchema = new mongoose.Schema({}, { strict: false });

export const HFAT3 = new mongoose.model("HFAT3",HFATSchema);