import bodyParser from "body-parser";
import express from "express";
import { CSTConroller, CSTFinalUpdateController, CSTGetController,CSTDownloadCsv ,CSTUpdateController, CSTUploadController,CSTGetFinalRows, CSTFinalGetController} from "../controller/CST.js";
const router = express.Router();
const jsonparser = bodyParser.json();
import { AuthenciatedUser } from "../Middleware/auth.js";
import { deleteCst } from "../controller/delete/Cst_delete.js";
import multer from "multer";
import fs from "fs";
import path from "path";

// const uploadDir = path.join(process.cwd(), "uploads");

// // Ensure folder exists
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   }
// });

// const upload = multer({ 
//     storage: multer.memoryStorage(), 
//     limits: { fileSize: 200 * 1024 * 1024 } // 200MB limit
// });

const upload = multer();

router.post("/cstdata", jsonparser, CSTConroller);
router.get("/CST", jsonparser,AuthenciatedUser, CSTGetController);
// router.get("/HFAT-1/:state", jsonparser, CSTGetController);

router.delete("/CST/delete",AuthenciatedUser, deleteCst);
router.put("/CST/update", jsonparser, AuthenciatedUser, CSTUpdateController);
router.put("/CST-FINAl/update", jsonparser, AuthenciatedUser, CSTFinalUpdateController);

router.get("/CST-csv", CSTDownloadCsv);

router.get("/download-csv" ,AuthenciatedUser , CSTDownloadCsv);

router.get("/CST-FINAL", jsonparser,AuthenciatedUser, CSTFinalGetController);
router.post("/CST-FINAL/upload", AuthenciatedUser, upload.single('file'), CSTUploadController);
router.get("/CST-FINAL-Rows", AuthenciatedUser, CSTGetFinalRows);

export default router;
