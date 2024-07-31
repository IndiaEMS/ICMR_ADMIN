import { Router } from "express";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  },
  sitename: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
});

export const User = new mongoose.model("User", userSchema);
