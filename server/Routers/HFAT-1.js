import express from "express";
import bodyParser from "body-parser";
import {
  HFAT1Controller,
  HFAT1DownloadCsv,
  HFAT1DownloadExcel,
  HFAT1Get,
  HFAT1Delete,
  HFAT1AndAMBULANCEGet,
  HFAT1UpdateController,
  HFAT1FINALGet,
  HFAT1AndAMBULANCEFINALGet,
  HFAT1UploadController,
  HFAT1GetFinalRows,
  HFAT1FinalUpdateController
} from "../controller/HFAT-1.js";
import {AuthenciatedUser} from "../Middleware/auth.js"
import { deleteHfat1,deleteHfat1Final } from "../controller/delete/Hfat_1_delete.js";
import multer from "multer";

const upload = multer();

const router = express.Router();
const jsonparser = bodyParser.json();
router.post("/HFAT-1", jsonparser, HFAT1Controller);
router.get("/HFAT-1", jsonparser, AuthenciatedUser, HFAT1Get);
router.get("/HFAT-1-FINAL", jsonparser, AuthenciatedUser, HFAT1FINALGet);
router.get("/HFAT-1/:state", jsonparser, HFAT1Get);
router.get("/HFAT-1WithAMB", jsonparser,AuthenciatedUser, HFAT1AndAMBULANCEGet);
router.get("/HFAT-1WithAMB-FINAL", jsonparser,AuthenciatedUser, HFAT1AndAMBULANCEFINALGet);
router.get("/HFAT-1/id/:id", jsonparser, HFAT1Get);
router.get("/HFAT-1/Download", jsonparser, HFAT1DownloadCsv);
router.get("/HFAT-1/Excel", jsonparser, HFAT1DownloadExcel);
router.delete("/HFAT-1", jsonparser, HFAT1Delete);
router.put("/HFAT-1/update", jsonparser, AuthenciatedUser, HFAT1UpdateController);
router.put("/HFAT-1-FINAL/update", jsonparser, AuthenciatedUser, HFAT1FinalUpdateController);
router.delete("HFAT-1/delete",AuthenciatedUser, deleteHfat1);
router.delete("HFAT-1-FINAL/delete",AuthenciatedUser, deleteHfat1Final);

router.post("/HFAT-1-FINAL/upload", AuthenciatedUser, upload.single('file'), HFAT1UploadController);
router.get("/HFAT-1-FINAL-Rows", AuthenciatedUser, HFAT1GetFinalRows);

export default router;
