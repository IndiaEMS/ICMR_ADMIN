import express from "express"
const router = express.Router();
import { Otp } from "../Database/otp.js"


router.post("/submitotp",(req,res)=>{

    const email = req.query.email;
    const otp = req.query.otp;

    Otp.findOne({email : email}).then((response)=>{
        if(response){
            if(response.otp === otp){
                res.status(200).json({
                    success : "Email has been verified successfully"
                })
            }else{
                res.json({
                    error : "OTP did not match"
                })
            }
        }else{
            res.json({
                error : "OTP has been expired"
            })
        }
    })
})


export default router;