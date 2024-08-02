import { Router } from "express";
import bcrypt from "bcrypt";
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

// password hash
userSchema.pre("save", function (next) {
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

export const User = new mongoose.model("User", userSchema);
