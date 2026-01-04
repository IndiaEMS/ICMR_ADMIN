import express from "express";
import bodyParser from "body-parser";
import {
  HFAT2Controller,
  HFAT2Get,
  HFAT2DownloadExcel,
  HFAT2DownloadCsv,
  HFAT2Delete,
  HFAT2AndAMBULANCEGet,
  HFAT2UpdateController,
  HFAT2FINALGet,
  HFAT2AndAMBULANCEFINALGet,
  HFAT2UploadController,
  HFAT2GetFinalRows,HFAT2FinalUpdateController
} from "../controller/HFAT-2.js";
import { AuthenciatedUser } from "../Middleware/auth.js";
import { deleteHfat2,deleteHfat2Final } from "../controller/delete/Haft_2_delete.js";

import multer from "multer";

const upload = multer();

const router = express.Router();
const jsonparser = bodyParser.json();
router.post("/HFAT-2", jsonparser, HFAT2Controller);
router.get("/HFAT-2", jsonparser, AuthenciatedUser, HFAT2Get);
router.get("/HFAT-2-FINAL", jsonparser, AuthenciatedUser, HFAT2FINALGet);
router.get("/HFAT-2WithAMB", jsonparser,AuthenciatedUser, HFAT2AndAMBULANCEGet);
router.get("/HFAT-2WithAMB-FINAL", jsonparser,AuthenciatedUser, HFAT2AndAMBULANCEFINALGet);
router.get("/HFAT-2/Download", jsonparser, HFAT2DownloadCsv);
router.get("/HFAT-2/Excel", jsonparser, HFAT2DownloadExcel);
router.delete("/HFAT-2", jsonparser, HFAT2Delete);
router.put("/HFAT-2/update", jsonparser, AuthenciatedUser, HFAT2UpdateController);
router.put("/HFAT-2-FINAL/update", jsonparser, AuthenciatedUser, HFAT2FinalUpdateController);


router.delete("/HFAT-2/delete",AuthenciatedUser, deleteHfat2);
router.delete("/HFAT-2-FINAL/delete",AuthenciatedUser, deleteHfat2Final);
router.post("/HFAT-2-FINAL/upload", AuthenciatedUser, upload.single('file'), HFAT2UploadController);
router.get("/HFAT-2-FINAL-Rows", AuthenciatedUser, HFAT2GetFinalRows);

export default router;
