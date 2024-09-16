import express from "express";
import bodyParser from "body-parser";
import { DashboardCounter, HFATCounter } from "../controller/fetch.js";
import { AuthenciatedUser } from "../Middleware/auth.js";

const router = express.Router();
const jsonparser = bodyParser.json();
router.get("/count", jsonparser, HFATCounter);
router.get("/adminCount", jsonparser, AuthenciatedUser, DashboardCounter);

export default router;
