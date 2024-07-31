import express from "express";
import bodyParser from "body-parser";
import {
  HFAT1Controller,
  HFAT1DownloadCsv,
  HFAT1DownloadExcel,
  HFAT1Get,
  HFAT1Delete,
  HFAT1AndAMBULANCEGet,
  HFATCounter,
} from "../controller/HFAT-1.js";

const router = express.Router();
const jsonparser = bodyParser.json();
router.post("/HFAT-1", jsonparser, HFAT1Controller);
router.get("/HFAT-1", jsonparser, HFAT1Get);
router.get("/HFAT-1WithAMB", jsonparser, HFAT1AndAMBULANCEGet);
router.get("/HFAT-1/id/:id", jsonparser, HFAT1Get);
router.get("/HFAT-1/Download", jsonparser, HFAT1DownloadCsv);
router.get("/HFAT-1/Excel", jsonparser, HFAT1DownloadExcel);
router.delete("/HFAT-3", jsonparser, HFAT1Delete);
router.get("/count", jsonparser, HFATCounter);

export default router;
