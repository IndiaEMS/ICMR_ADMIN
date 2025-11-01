import mongoose from "mongoose";

const hfat1MappingSchema = new mongoose.Schema(
  {},
  {
    collection: "hfat1_mapping",
  }
);

// Using _id as the key
export const HFAT1_Mapping = mongoose.model(
  "hfat1_mapping",
  hfat1MappingSchema
);
