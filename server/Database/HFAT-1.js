import mongoose from "mongoose";

var HFATSchema = new mongoose.Schema({}, { strict: false });


export const HFAT1 = new mongoose.model("HFAT1",HFATSchema);