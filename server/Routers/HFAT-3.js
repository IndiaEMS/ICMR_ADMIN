import express from "express";
import bodyParser from "body-parser";
import {
  HFAT3Controller,
  HFAT3Get,
  HFAT3Delete,
  HFAT3AndAMBULANCEGet,
  HFAT3UpdateController,
} from "../controller/HFAT-3.js";
import { AuthenciatedUser } from "../Middleware/auth.js";
import { deleteHfat3 } from "../controller/delete/Hfat_3_delete.js";

const router = express.Router();
const jsonparser = bodyParser.json();
router.post("/HFAT-3", jsonparser, HFAT3Controller);
router.get("/HFAT-3", jsonparser, AuthenciatedUser, HFAT3Get);
router.get(
  "/HFAT-3WithAMB",
  jsonparser,
  AuthenciatedUser,
  HFAT3AndAMBULANCEGet
);
router.delete("/HFAT-3", jsonparser, HFAT3Delete);
router.put("/HFAT-3/update", jsonparser, AuthenciatedUser, HFAT3UpdateController);
// router.get("/HFAT-3/id/:id", jsonparser, HFAT3Get);
// router.get("/HFAT-3/Csv", jsonparser, HFAT3DownloadCsv);
// router.get("/HFAT-3/Excel", jsonparser, HFAT3DownloadExcel);

router.delete("/HFAT-3/delete", AuthenciatedUser, deleteHfat3);

export default router;
