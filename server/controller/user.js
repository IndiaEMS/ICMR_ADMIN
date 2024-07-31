import express, { response } from "express";
import mongoose from "mongoose";
import { AMBULANCE } from "../Database/Ambulance.js";
import { User } from "../Database/user.js";
const app = express();

export const GetUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    // const HEAT1Data = await HFAT1.find({ _id: "668b69b81f251d985457e463" });
    var user;
    if (id) {
      user = await User.findById({ _id: id });
    } else {
      user = await User.find();
    }
    if (!User) {
      res.status(404).json({ error: "Data not found" });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const CreateUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
