import express, { response } from "express";
import mongoose from "mongoose";
import { AMBULANCE } from "../Database/Ambulance.js";
import { User } from "../Database/user.js";
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken";
import "dotenv/config";
const app = express();
// import sendToken from '../utils/JWTtoken'
import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncError from "../Middleware/catchAsyncError.js";
import sendToken from "../utils/JWTtoken.js";

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

    // sendToken(user, 200, res)
  } catch (error) {
    next(error);
  }
};

export const CreateUser = async (req, res, next) => {
  try {
    const jwt_secret = process.env.JWT_SECRET;

    const { username, email, password, state, sitename, role } = req.body;

    User.findOne({ username: email })
      .then((result) => {
        if (result) {
          res.json({
            error: "This username / email already exists.",
          });
        } else {
          // const token = jwt.sign(
          //   {
          //     username: email,
          //   },
          //   jwt_secret,
          //   { expiresIn: "1h" }
          // );

          const user = new User({
            name: username,
            password: password,
            username: email,
            sitename: `${sitename}, ${state}`,
            role: role,
          });

          user
            .save()
            .then(() => {
              res.status(200).json({
                message: "User Added!",
                success: true,
                user: user,
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
export const loginUser = catchAsyncError(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new ErrorHandler("Invaild Credentials"));
  }

  const user = await User.findOne({ username }).select("+password").exec();
  if (!user) {
    return next(new ErrorHandler("invalid credentials"));
  }

  // const isPassswordMatched = await user.comparePassword(password);
  // if (!isPassswordMatched) {
  //   return next(new ErrorHandler(" invalid credentials"));
  // }
  // sendToken(user, 200, res);

  if (await bcrypt.compare(password, user.password)) {
    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    user.token = token;
    user.password = undefined;

    const options = {
      // expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user,
      message: "Logged in successfully",
    });
  }
});

export const logout = catchAsyncError(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logout SuccessFully",
  });
});

export const getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});
export const createAdminUserBySuperAdmin = catchAsyncError(
  async (req, res, next) => {
    const { name, email, password, role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return next(new ErrorHandler("Invalid role specified", 400));
    }

    const adminuser = await User.create({
      name,
      email,
      password,
      role,
    });

    res.status(200).json({
      success: true,
      adminuser,
    });
  }
);

export const deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not exists"));
  }

  res.status(200).json({
    success: true,
    user,
  });
});
