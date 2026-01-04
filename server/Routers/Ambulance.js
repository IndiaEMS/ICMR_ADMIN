import express from "express";
import bodyParser from "body-parser";
import { AMBULANCEController,AMBULANCEGet,AMBULANCEUpdateController,AMBULANCEFINALGet,AMBUploadController,AMBGetFinalRows, AMBULANCEFinalUpdateController } from "../controller/Ambulance.js";
import { AuthenciatedUser } from "../Middleware/auth.js";
import { ambulance_delete,ambulance_delete_Final } from "../controller/delete/Ambulance_delete.js";

import multer from "multer";

const upload = multer();

const router = express.Router();
const jsonparser = bodyParser.json();
router.post("/AMBULANCE", jsonparser, AMBULANCEController);
router.get("/AMBULANCE", jsonparser,AuthenciatedUser, AMBULANCEGet);
router.get("/AMBULANCE-FINAL", jsonparser,AuthenciatedUser, AMBULANCEFINALGet);
router.put("/AMBULANCE/update", jsonparser, AuthenciatedUser, AMBULANCEUpdateController);
router.put("/AMBULANCE-FINAL/update", jsonparser, AuthenciatedUser, AMBULANCEFinalUpdateController);

router.delete("/AMBULANCE/delete",AuthenciatedUser, ambulance_delete);
router.delete("/AMBULANCE-FINAL/delete",AuthenciatedUser, ambulance_delete_Final);
router.post("/AMBULANCE-FINAL/upload", AuthenciatedUser, upload.single('file'), AMBUploadController);
router.get("/AMBULANCE-FINAL-Rows", AuthenciatedUser, AMBGetFinalRows);

export default router;
