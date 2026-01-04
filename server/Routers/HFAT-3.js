import express from "express";
import bodyParser from "body-parser";
import {
  HFAT3Controller,
  HFAT3Get,
  HFAT3Delete,
  HFAT3AndAMBULANCEGet,
  HFAT3UpdateController,
  HFAT3FINALGet,
  HFAT3AndAMBULANCEFINALGet,
  HFAT3UploadController,
  HFAT3GetFinalRows,
  HFAT3FinalUpdateController
} from "../controller/HFAT-3.js";
import { AuthenciatedUser } from "../Middleware/auth.js";
import { deleteHfat3,deleteHfat3Final } from "../controller/delete/Hfat_3_delete.js";

import multer from "multer";

const upload = multer();

const router = express.Router();
const jsonparser = bodyParser.json();
router.post("/HFAT-3", jsonparser, HFAT3Controller);
router.get("/HFAT-3", jsonparser, AuthenciatedUser, HFAT3Get);
router.get("/HFAT-3-FINAL", jsonparser, AuthenciatedUser, HFAT3FINALGet);
router.get(
  "/HFAT-3WithAMB",
  jsonparser,
  AuthenciatedUser,
  HFAT3AndAMBULANCEGet
);
router.get(
  "/HFAT-3WithAMB-FINAL",
  jsonparser,
  AuthenciatedUser,
  HFAT3AndAMBULANCEFINALGet
);
router.delete("/HFAT-3", jsonparser, HFAT3Delete);
router.put("/HFAT-3/update", jsonparser, AuthenciatedUser, HFAT3UpdateController);
router.put("/HFAT-3-FINAL/update", jsonparser, AuthenciatedUser, HFAT3FinalUpdateController);
// router.get("/HFAT-3/id/:id", jsonparser, HFAT3Get);
// router.get("/HFAT-3/Csv", jsonparser, HFAT3DownloadCsv);
// router.get("/HFAT-3/Excel", jsonparser, HFAT3DownloadExcel);

router.delete("/HFAT-3/delete", AuthenciatedUser, deleteHfat3);
router.delete("/HFAT-3-FINAL/delete", AuthenciatedUser, deleteHfat3Final);
router.post("/HFAT-3-FINAL/upload", AuthenciatedUser, upload.single('file'), HFAT3UploadController);
router.get("/HFAT-3-FINAL-Rows", AuthenciatedUser, HFAT3GetFinalRows);

export default router;
