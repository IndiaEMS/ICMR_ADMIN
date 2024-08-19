import mongoose from "mongoose";

var CSTSchema = new mongoose.Schema({}, { strict: false });

export const CSTFORM = new mongoose.model("CSTFORM", CSTSchema);
