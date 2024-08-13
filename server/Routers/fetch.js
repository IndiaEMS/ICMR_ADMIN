import express from "express";
import bodyParser from "body-parser";
import { HFATCounter } from "../controller/fetch.js";

const router = express.Router();
const jsonparser = bodyParser.json();
router.get("/count", jsonparser, HFATCounter);

export default router;
