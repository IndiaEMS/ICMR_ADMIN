import express from "express";
import bodyParser from "body-parser";
import {
  HFAT3Controller,
  HFAT3Get,
  HFAT3Delete,
  HFAT3AndAMBULANCEGet,
} from "../controller/HFAT-3.js";
import { AuthenciatedUser } from "../Middleware/auth.js";

const router = express.Router();
const jsonparser = bodyParser.json();
router.post("/HFAT-3", jsonparser, HFAT3Controller);
router.get("/HFAT-3", jsonparser,AuthenciatedUser, HFAT3Get);
router.get("/HFAT-3WithAMB", jsonparser, HFAT3AndAMBULANCEGet);
router.delete("/HFAT-3", jsonparser, HFAT3Delete);
// router.get("/HFAT-3/id/:id", jsonparser, HFAT3Get);
// router.get("/HFAT-3/Csv", jsonparser, HFAT3DownloadCsv);
// router.get("/HFAT-3/Excel", jsonparser, HFAT3DownloadExcel);

export default router;
