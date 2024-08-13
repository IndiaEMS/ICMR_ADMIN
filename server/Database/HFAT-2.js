import mongoose from "mongoose";

var HFATSchema = new mongoose.Schema({}, { strict: false });


export const HFAT2 = new mongoose.model("HFAT2",HFATSchema);