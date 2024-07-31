import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email : {
        type : String
    },
    otp : {
        type : String
    }
    ,
    expireAt : {
        type : Date ,
        default : Date.now,
        index : {expires : "3m"}
    }
})

export const Otp = new mongoose.model("otp",otpSchema);