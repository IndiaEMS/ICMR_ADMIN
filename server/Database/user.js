import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username : {
        type : String
    },
    password : {
        type : String
    },
    name : {
        type : String
    },
    sitename : {
        type : String
    }
})

export const User = new mongoose.model("User", userSchema);