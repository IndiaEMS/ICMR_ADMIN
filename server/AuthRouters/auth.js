import express from "express";
import passport from "passport";

const router=express.Router();
const CLIENT_URL=process.env.CLIENT_URL;

router.get("/google",passport.authenticate("google" , ["profile","email"]));


router.get("/login/success", (req, res) => {
    console.log(req.user);
    if (req.user) {
        res.status(200).json({
            user: req.user
        })
    } else {
        res.status(403).json({
            error: "You are not Autherized to access this resource"
        })
    }
})

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        error: "Login failed!"
    })
})

router.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed"
}))



router.get("/logout",(req,res)=>{
    console.log(req.logOut);
    console.log(req.user);
    req.logout(req.user,(err)=>{
        if(err){
            console.log(err);
        }
        console.log(req.user)
        res.redirect(`${CLIENT_URL}`)
    });
})


export default router;