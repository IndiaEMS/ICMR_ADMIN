import express from "express";
import bodyParser from "body-parser";
import {
  HFAT2Controller,
  HFAT2Get,
  HFAT2DownloadExcel,
  HFAT2DownloadCsv,
  HFAT2Delete,
  HFAT2AndAMBULANCEGet,
} from "../controller/HFAT-2.js";

const router = express.Router();
const jsonparser = bodyParser.json();
router.post("/HFAT-2", jsonparser, HFAT2Controller);
router.get("/HFAT-2", jsonparser, HFAT2Get);
router.get("/HFAT-2WithAMB", jsonparser, HFAT2AndAMBULANCEGet);
router.get("/HFAT-2/Download", jsonparser, HFAT2DownloadCsv);
router.get("/HFAT-2/Excel", jsonparser, HFAT2DownloadExcel);
router.delete("/HFAT-3", jsonparser, HFAT2Delete);

export default router;
