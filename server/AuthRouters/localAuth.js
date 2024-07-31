import express, { response } from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken"
import 'dotenv/config'
import { User } from "../Database/user.js";


const jwt_secret = process.env.JWT_SECRET;





router.post("/register", (req, res) => {
    // console.log(req.headers);
    const username = req.headers.username;
    const name = req.headers.name;
    const password = req.headers.password;
    const sitename = req.headers.sitename;
    // console.log(sitename);

    User.findOne({ username: username }).then((result) => {
        if (result) {
            res.json({
                error: "This username / email already exists."
            })
        } else {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    res.status(401).json({
                        error: "Error occured in sign up. try again!"
                    })
                }

                const token = jwt.sign({
                    username: username
                }, jwt_secret ,{expiresIn: '1h'});

                const user = new User({
                    name: name,
                    password: hash,
                    username: username,
                    sitename : sitename
                });

                user.save().then(() => {
                    res.status(200).json({
                        success: "Registration completed!",
                        user: user,
                        token: token
                    })
                }).catch((err) => {
                    res.status(401).json({
                        error: "Error occured in sign up. try again!"
                    })
                })
            })
        }
    }).catch((err) => {
        res.status(401).json({
            error: "Error occured in sign up. try again!"
        })
    })
})



router.get("/localauth", (req, res) => {
    const token = req.query.token;
    try {
        const a = jwt.verify(token, jwt_secret);
        User.findOne({ username: a.username }).then((result) => {
            if (result) {
                res.status(200).json({
                    user: result,
                    success: "you are authorised!"
                })
            }
        })
    } catch (err) {
        res.status(401).json({
            error: "you are not authorised"
        })
    }
})


router.get("/signin", (req, res) => {
    const password = req.headers.password;
    const username = req.headers.username;

    User.findOne({ username: username }).then((result) => {
        console.log(result);
        if (result) {
            bcrypt.compare(password, result.password, (err, response) => {
                if (err) {
                    res.status(401).json({
                        error: "Error occurred in sign in!"
                    })
                    return ;
                }

                if (response) {
                    const token = jwt.sign({
                        username: username
                    }, jwt_secret ,{expiresIn: '1h'});

                    res.status(200).json({
                        success: "You are signed in!",
                        user: result,
                        token: token
                    })
                } else {
                    res.status(401).json({
                        error: "Password is wrong"
                    })
                }
            })
        } else {
            res.status(401).json({
                error: "This user does not exist"
            })
        }
    })
})




export default router;