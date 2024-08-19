import bodyParser from "body-parser";
import express from "express";
import { CSTConroller, CSTGetController } from "../controller/CST.js";
const router = express.Router();
const jsonparser = bodyParser.json();

router.post("/cstdata", jsonparser, CSTConroller);
router.get("/CST", jsonparser, CSTGetController);
// router.get("/HFAT-1/:state", jsonparser, CSTGetController);

export default router;
