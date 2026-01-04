import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import router from "./AuthRouters/auth.js";
import emailRouter from "./Routers/sendEmail.js";
import verifyEmailRouter from "./Routers/verifyEmail.js";
import "./AuthRouters/passport.js";
import localAuthRouter from "./AuthRouters/localAuth.js";
import HFAT1ROUTER from "./Routers/HFAT-1.js";
import HFAT2ROUTER from "./Routers/HFAT-2.js";
import HFAT3ROUTER from "./Routers/HFAT-3.js";
import AMBULANCEROUTER from "./Routers/Ambulance.js";
import CSTROUTER from "./Routers/CST.js";
import FETCHROUTER from "./Routers/fetch.js";
import USERROUTER from "./Routers/user.js";
import AUTOPSYROUTER from "./Routers/Autopsy.js";
import COMMONAPISROUTER from "./Routers/CommonApis.js";
import LOTROUTER from "./Routers/LOT.js";
import multer from 'multer';
import path from 'path';

import './DB/primaryDb.js';         // connects default DB
// import './DB/secondaryDb.js';       // connects secondary DB

import cookieParser from "cookie-parser";

const client = process.env.CLIENT_URL;

const app = express();
// app.use(express.json());
app.use(express.json({ limit: "300mb" }));
// app.use(express.urlencoded({ extended: true, limit: "300mb" }));
app.enable("trust proxy");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 2,
      sameSite: "none",
      secure: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

console.log("client", client);

app.use(cors({
   // origin: [`${client}`, `${client}/sign-up`, `${client}/sign-in`],
  origin: "*",
  credentials: true, // ✅ if you use cookies or JWT tokens
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Disposition"], // ✅ required for blob downloads
}));

// Set storage engine for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));  // make sure this matches your folder!
  },
  filename: function (req, file, cb) {
    // You can customize the file name here, for now, keep original name
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage,limits: { fileSize: 200 * 1024 * 1024 } });


app.use(cookieParser());
app.use(router);
app.use(emailRouter);
app.use(verifyEmailRouter);
app.use(localAuthRouter);
app.use(HFAT1ROUTER);
app.use(HFAT2ROUTER);
app.use(HFAT3ROUTER);
app.use(AMBULANCEROUTER);
app.use(CSTROUTER);
app.use(AUTOPSYROUTER);
app.use(LOTROUTER);
app.use(FETCHROUTER);
app.use(USERROUTER);
app.use(COMMONAPISROUTER);

app.get("/", (req, res) => {
  res.json({
    message: "this site has been deployed!",
  });
});

app.listen(9000, () => {
  console.log("server is running on port 9000");
});
