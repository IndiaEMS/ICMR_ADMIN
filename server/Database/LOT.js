import mongoose from "mongoose";

var LOTSchema = new mongoose.Schema({}, { strict: false });

export const LOT = new mongoose.model("LOT", LOTSchema);
