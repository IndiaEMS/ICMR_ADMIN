import bodyParser from "body-parser";
import express from "express";
import {
  AutopsyController,
  AutopsyGetController,
  AutopsyUpdateController,
  AutopsyFinalGetController,
  AutopsyUploadController,
  AutopsyGetFinalRows
} from "../controller/Autopsy.js";
import { AuthenciatedUser } from "../Middleware/auth.js";
import { autopsy_delete } from "../controller/delete/Autopsy_delete.js";
import multer from "multer";
const router = express.Router();
const jsonparser = bodyParser.json();


const upload = multer();

router.post("/Autopsy", jsonparser, AutopsyController);
router.get("/Autopsy", jsonparser,AuthenciatedUser ,AutopsyGetController);
router.put("/Autopsy/update", jsonparser, AuthenciatedUser, AutopsyUpdateController);

router.delete('/Autopsy/delete',AuthenciatedUser , autopsy_delete);
router.get("/Autopsy-FINAL", jsonparser,AuthenciatedUser, AutopsyFinalGetController);
router.post("/Autopsy-FINAL/upload", AuthenciatedUser, upload.single('file'), AutopsyUploadController);
router.get("/Autopsy-FINAL-Rows", AuthenciatedUser, AutopsyGetFinalRows);

export default router;
