import express from "express";
import bodyParser from "body-parser";
import { adminDashboardCounter, changeSuperadminState, DashboardCounter, HFATCounter } from "../controller/fetch.js";
import { AuthenciatedUser, authorizerole } from "../Middleware/auth.js";

const router = express.Router();
const jsonparser = bodyParser.json();
router.get("/count", jsonparser, HFATCounter);
// router.get("/adminCount", jsonparser, AuthenciatedUser, DashboardCounter);

router.get("/adminCount", jsonparser, AuthenciatedUser, authorizerole("admin"), adminDashboardCounter);
router.get("/superadminCount", jsonparser, AuthenciatedUser, authorizerole("superadmin"), changeSuperadminState);
export default router;
