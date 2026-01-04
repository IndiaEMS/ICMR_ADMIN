import express from "express";
import bodyParser from "body-parser";
import {AuthenciatedUser} from "../Middleware/auth.js"
import  { SampleFormatDownloadController } from "../controller/CommonApis.js";
import multer from "multer";

const upload = multer();

const router = express.Router();
const jsonparser = bodyParser.json();
router.get("/common/download-sample/:formName", SampleFormatDownloadController);

export default router;
