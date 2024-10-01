import express from "express";
import bodyParser from "body-parser";
import { AMBULANCEController,AMBULANCEGet } from "../controller/Ambulance.js";
import { AuthenciatedUser } from "../Middleware/auth.js";
import { ambulance_delete } from "../controller/delete/Ambulance_delete.js";

const router = express.Router();
const jsonparser = bodyParser.json();
router.post("/AMBULANCE", jsonparser, AMBULANCEController);
router.get("/AMBULANCE", jsonparser,AuthenciatedUser, AMBULANCEGet);

router.delete("/AMBULANCE/delete", ambulance_delete);

export default router;
