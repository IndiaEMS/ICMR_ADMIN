import jwt from 'jsonwebtoken';
import catchAsyncError from './catchAsyncError.js';
import { User } from '../Database/user.js';
import ErrorHandler from '../utils/ErrorHandler.js';

export const AuthenciatedUser = catchAsyncError(async (req, res, next) => {
    let token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
    // console.log("token>>>>>",token)
    token = token.replace(/"/g, "");

    // console.log("TOKEN:", token);
    // console.log(process.env.JWT_SECRET)

    if (!token) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }

    let decodeData;
    try {
        decodeData = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        // console.log("ERROR........", error)
        return next(new ErrorHandler("Invalid or expired token", 401));
    }

    req.user = await User.findById(decodeData.id);
    next();
});

export const authorizerole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403));
        }
        next();
    };
};
