import mongoose from "mongoose";

var AutopsySchema = new mongoose.Schema({}, { strict: false });

export const Autopsy = new mongoose.model("Autopsy", AutopsySchema);
export const Autopsy_FINAL = new mongoose.model("Autopsy_FINAL", AutopsySchema);
export const Autopsy_Mapping = mongoose.model("Autopsy_mapping", AutopsySchema);
