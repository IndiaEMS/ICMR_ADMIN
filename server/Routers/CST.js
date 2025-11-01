import bodyParser from "body-parser";
import express from "express";
import { CSTConroller, CSTGetController,CSTDownloadCsv ,CSTUpdateController} from "../controller/CST.js";
const router = express.Router();
const jsonparser = bodyParser.json();
import { AuthenciatedUser } from "../Middleware/auth.js";
import { deleteCst } from "../controller/delete/Cst_delete.js";

router.post("/cstdata", jsonparser, CSTConroller);
router.get("/CST", jsonparser,AuthenciatedUser, CSTGetController);
// router.get("/HFAT-1/:state", jsonparser, CSTGetController);

router.delete("/CST/delete",AuthenciatedUser, deleteCst);
router.put("/CST/update", jsonparser, AuthenciatedUser, CSTUpdateController);

router.get("/CST-csv", CSTDownloadCsv);

router.get("/download-csv" ,AuthenciatedUser , CSTDownloadCsv);

export default router;
