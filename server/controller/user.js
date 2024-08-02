import express, { response } from "express";
import mongoose from "mongoose";
import { AMBULANCE } from "../Database/Ambulance.js";
import { User } from "../Database/user.js";
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken";
import "dotenv/config";
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
    const jwt_secret = process.env.JWT_SECRET;
    console.log("create user");

    // console.log(req.headers);
    console.log(req.body);

    const { username, email, password, sitename, role } = req.body;

    User.findOne({ username: email })
      .then((result) => {
        if (result) {
          res.json({
            error: "This username / email already exists.",
          });
        } else {
          const token = jwt.sign(
            {
              username: email,
            },
            jwt_secret,
            { expiresIn: "1h" }
          );

          const user = new User({
            name: username,
            password: password,
            username: email,
            sitename: sitename,
            role: role,
          });

          user
            .save()
            .then(() => {
              res.status(200).json({
                success: "User Added!",
                user: user,
                token: token,
              });
            })
            .catch((err) => {
              res.status(401).json({
                error: "Error occured in User Adding. try again! " + err,
              });
            });
        }
      })
      .catch((err) => {
        res.status(401).json({
          error: "Error occured in sign up. try again!",
        });
      });

    // const user = await User.create(req.body);
    // res.status(201).json({
    //   success: true,
    //   data: user,
    // });
  } catch (error) {
    next(error);
  }
};
// export const CreateUser = async (req, res, next) => {
//   try {
//     const user = await User.create(req.body);
//     res.status(201).json({
//       success: true,
//       data: user,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
