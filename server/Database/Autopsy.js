import mongoose from "mongoose";

var AutopsySchema = new mongoose.Schema({}, { strict: false });

export const Autopsy = new mongoose.model("Autopsy", AutopsySchema);
